import React from 'react';
import  {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as photoActions from '../actions/photoActions';
import PhotoPageItemPhoto from '../components/photoPageItemPhoto'
import {Link} from 'react-router';
export class PhotoPageBlockPhoto extends React.Component {
    componentWillReceiveProps(nextProps){
        if (nextProps.year != this.props.year){
            this.props.photoActions.getPhotosByYear(nextProps.year, this.props.photo.allPhotos);
        }
    }
    componentWillMount(){
        this.props.photoActions.getPhotosByYear(this.props.year, this.props.photo.allPhotos);
    }
    render() {
        let tmp, btn, ifNoPhotos;
        const { photosByChooseYear, fetching, offset, arrayShowedPhotos} = this.props.photo;
        const {loadMorePhotos} = this.props.photoActions;
        if (this.props.user.isLogin){
            tmp = arrayShowedPhotos.map( (item, id) => {
                    return < PhotoPageItemPhoto item={item} key={id}/>
                  });
            if( photosByChooseYear.length > arrayShowedPhotos.length && !fetching){
                btn = <button className="btnLoadMore"
                              onClick={loadMorePhotos.bind(this,photosByChooseYear, offset)}>load more...
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
