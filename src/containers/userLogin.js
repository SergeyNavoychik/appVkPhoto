import React from 'react';
import  {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAction from '../actions/userActions';
import * as photoAction from '../actions/photoActions';
export class UserLogin extends React.Component{
    componentWillReceiveProps(nextProps){
        if( nextProps.user.isLogin && nextProps.user.isLogin != this.props.user.isLogin ){
            this.props.photoActions.getAllPhotos();
        }
    }
    componentWillMount(){
        setTimeout(()=>{this.props.userActions.userIsLogin()},0);
    }
    render(){
        const {name, error, isLogin, avatarUrl} = this.props.user;
        const {logOut} = this.props.userActions;
        let tmp;
        if(isLogin){
            tmp = <div className="user col-sm-4">
                    <img src={avatarUrl} className="userAvatar" alt=""/>
                    <span className="userHello">Hello, {name}</span>
                    <button className="btnLogout" onClick={logOut}>Log out</button>
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