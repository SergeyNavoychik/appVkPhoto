import React, { PropTypes } from 'react';
import  {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as photoActions from '../actions/photoActions';
import PhotoPageItemPhoto from '../components/photoPageItemPhoto'
import {Link} from 'react-router';
export class PhotoPageBlockPhoto extends React.Component {
    constructor(props){
        super(props)
        this.showMorePhotos = this.showMorePhotos.bind(this)
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.year != this.props.year){
            this.props.photoActions.loadPhotoByYear(nextProps.year)
            let data = this._sortPhotoByYear(nextProps.year, this.props.photo.allPhotos)
            this.props.photoActions.getPhotosByYear(data)
        }
    }
    componentWillMount(){
        this.props.photoActions.loadPhotoByYear(this.props.year)
        let data = this._sortPhotoByYear(this.props.year, this.props.photo.allPhotos)
        this.props.photoActions.getPhotosByYear(data)
    }
    _sortPhotoByYear(year,arrayPhoto){
        function arrayShowedPhotos(array) {
            let imgBlockArray = [];
            if (array.length > 0){
                for ( let i = 0; i <15; ++i){
                    if(array[i]) {
                        imgBlockArray.push(array[i]);
                    }
                }
            }
            return imgBlockArray;
        }
        function countAllLike(array) {
            let total = 0;
            array.forEach( item => {
                total += item.likes.count
            });
            return total;
        }
        function countAllReposts(array) {
            let total = 0;
            array.forEach( item => {
                total += item.reposts.count
            });
            return total;
        }

        function topPhoto(array) {
            let arrMostPopularPhotoSrc = [];
            let tmp = [].concat(array);
            tmp.sort((a,b) => { return b.likes.count - a.likes.count});
            if( tmp.length > 0){
                for ( let i= 0; i < 5; ++i) {
                    arrMostPopularPhotoSrc.push(tmp[i]);
                }
            }
            return arrMostPopularPhotoSrc;
        }

        function notPopularPhoto(array) {
            let tmp = [].concat(array);
            tmp.sort((a,b) => { return a.likes.count - b.likes.count});
            let arrNotPopularPhotoSrc = [];
            if ( tmp.length > 0 ){
                for ( let i= 0; i < 5; ++i) {
                    arrNotPopularPhotoSrc.push(tmp[i]);
                }
                return arrNotPopularPhotoSrc;
            }
            return arrNotPopularPhotoSrc;
        }
        let yearCreate,
            arrPhotoByYear = [];
        if( year == 'all_years'){
            arrayPhoto.map( item => {
                if( typeof item == 'object'){
                    arrPhotoByYear.push(item);
                }
            });
        }
        else{
            arrayPhoto.map( item => {
                yearCreate = (new Date(item.created*1000).getFullYear());
                if( yearCreate == +year){
                    arrPhotoByYear.push(item);
                }
            });
        }
        let allLikes = countAllLike(arrPhotoByYear),
            countReposts = countAllReposts(arrPhotoByYear),
            topPhotos = topPhoto(arrPhotoByYear),
            unPopular = notPopularPhoto(arrPhotoByYear),
            arrShowedPhotos = arrayShowedPhotos(arrPhotoByYear)
        return {arrPhotoByYear, arrShowedPhotos,allLikes, countReposts, topPhotos, unPopular}
    }
    showMorePhotos(){
        let arrayShowedPhotos = [];
        let offset = this.props.photo.offset
        let array = this.props.photo.photosByChooseYear
        if (array.length > 0) {
            for (let i = offset; i < offset + 15; ++i) {
                if (array[i]) {
                    arrayShowedPhotos.push(array[i])
                }
            }
        }
        let off = offset + 15
        this.props.photoActions.showMorePhotos(arrayShowedPhotos, off)
    }
    render() {
        let tmp, btn, ifNoPhotos;
        const { photosByChooseYear, fetching, offset, arrayShowedPhotos} = this.props.photo;
        const {showMorePhotos} = this.props.photoActions;
        if (this.props.user.isLogin){
            tmp = arrayShowedPhotos.map( (item, id) => {
                    return < PhotoPageItemPhoto item={item} key={id}/>
                  });
            if( photosByChooseYear.length > arrayShowedPhotos.length && !fetching){
                btn = <button className="btnLoadMore"
                              onClick={this.showMorePhotos}>load more...
                      </button>;
            }
            if ( photosByChooseYear.length == 0){
                ifNoPhotos = <p className="noPhoto"> You haven't photos in this year</p>
            }
        }
        else tmp = <p className="loginError">Please <Link to="/">login</Link>, to use application</p>;

        return (
                <div className="blockPhoto col-sm-9">
                    {ifNoPhotos}
                    {tmp}
                    {btn}
                </div>
        )
    }
}


PhotoPageBlockPhoto.propTypes = {
    year: PropTypes.string.isRequired
}
function mapStateToProps (state) {
    return {
        photo: state.photo,
        user: state.userLogin
    }
}
function mapDispatchToProps(dispatch) {
    return {
        photoActions: bindActionCreators(photoActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoPageBlockPhoto)
