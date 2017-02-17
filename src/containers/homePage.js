import React from 'react';
import  {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAction from '../actions/userActions';
export class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.login = this.login.bind(this)
    }

    _loginRequest(){
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
            let userName, userId
            VK.Auth.login( (r) => {
                if (r.session){
                    userName =r.session.user.first_name;
                    userId = r.session.mid;
                    getAvatar(userId)
                        .then( result => {
                            let userInfo = {userName, userId, avatarUrl:result}
                            resolve(userInfo)
                        })
                }
                else {
                    let error = new Error ("Error login!")
                    reject(error)
                }
            }, 4)
        })
    }
    login(){
        this._loginRequest()
            .then( result => {
                this.props.userActions.login(result.userName, result.userId, result.avatarUrl)
            })
            .catch( error => {
                this.props.userActions.loginError(error)
            })
    }
    render() {
        let {name, isLogin} = this.props.user;

        let page;
        if (isLogin){
            page = <div className="col-md-6 col-md-push-3">
                        <p className="greeting">Hello, {name}. Wellcome to application YuorFotoVK. Here you can look your
                        photos, sorted by year, see most popular photos and etc. Enjoy...
                        </p>
                   </div>
        }
        else page = <div className="col-md-6 col-md-push-3">
                        <button className="btnLogin" onClick={this.login}>Log in</button>
                    </div>

        return (
            <div className="homePage col-sm-12 text-center">
                {page}
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        user: state.userLogin
    }
}
function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)