import React, { PropTypes } from 'react';
import  {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAction from '../actions/userActions';
import * as photoAction from '../actions/photoActions';
export class UserLogin extends React.Component{
    constructor(props) {
        super(props)
        this.logOut = this.logOut.bind(this)
    }
    componentWillReceiveProps(nextProps){
        if( nextProps.user.isLogin && nextProps.user.isLogin != this.props.user.isLogin ){
            this.props.photoActions.getPhotosRequest();
            this._getAllPhotos(200, 0)
                .then( result => {
                    this.props.photoActions.getPhotosSuccess(result)
                })
                .catch( (error) => {
                   console.log(error)
                   this.props.photoActions.getPhotoFail(error)
                })
        }
    }
    componentWillMount(){
        setTimeout(() => {
            this._userIsLogin()
                .then( result => {
                    this.props.userActions.login(result.userName, result.userId, result.avatarUrl)
                })
        }, 0)
    }
    _userIsLogin(){
        function getAvatar(id) {
            return new Promise( (resolve, reject) => {
                VK.Api.call('users.get', {user_ids: id, fields: 'photo_50'},(r) => {
                    if(r.response) {
                        resolve(r.response[0].photo_50)
                    }
                })
            })
        }
        return new Promise( (resolve, reject) => {
            VK.Auth.getLoginStatus(result => {
                if(result.status == 'connected'){
                    let userId =result.session.mid;
                    VK.Api.call('users.get', {user_ids: userId, fields: 'photo_50'}, function(r) {
                        if(r.response) {
                            let userName = r.response[0].first_name;
                            getAvatar(userId)
                                .then( result => {
                                    let userInfo = {userName, userId, avatarUrl:result}
                                    resolve(userInfo)
                                })
                        }
                    });
                }
            });
        })
    }
    _getAllPhotos(count, offset){
        let arrayPhotos = []
        function  request(count, offset, resolve, reject) {
            VK.Api.call('photos.getAll', {extended:1, count: count, offset: offset}, function(r) {
                if(r.response){
                    if(offset < r.response[0] - count){
                        offset +=count
                        arrayPhotos = arrayPhotos.concat(r.response)
                        request(count, offset, resolve,reject)
                    }
                    else{
                        arrayPhotos = arrayPhotos.concat(r.response)
                        resolve(arrayPhotos)
                    }
                }
                else{
                    reject(new Error("Error!!!"))
                }
            })
        }
        return new Promise( (resolve, reject) => {
            request(count, offset, resolve, reject)
        })
    }
    logOut(){
        VK.Auth.logout( res => {
            if (res.session == null){
                    this.props.userActions.logOut()
            }
        });
    }
    render(){
        const {name, error, isLogin, avatarUrl} = this.props.user;
        let tmp;
        if(isLogin){
            tmp = <div className="user col-sm-4">
                    <img src={avatarUrl} className="userAvatar" alt=""/>
                    <span className="userHello">Hello, {name}</span>
                    <button className="btnLogout" onClick={this.logOut}>Log out</button>
                  </div>
        }
        return ( <div>{tmp}</div> )
    }
}

function mapStateToProps (state) {
    return {
        user: state.userLogin
    }
}
function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userAction, dispatch),
        photoActions: bindActionCreators(photoAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin)