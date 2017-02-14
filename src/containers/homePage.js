import React from 'react';
import  {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAction from '../actions/userActions';
import * as photoAction from '../actions/photoActions';
export class HomePage extends React.Component {
    render() {
        let {name, isLogin} = this.props.user;
        let {login} = this.props.userActions;
        let page;
        if (isLogin){
            page = <div className="col-md-6 col-md-push-3">
                        <p className="greeting">Hello, {name}. Wellcome to application YuorFotoVK. Here you can look your
                        photos, sorted by year, see most popular photos and etc. Enjoy...
                        </p>
                   </div>
        }
        else page = <div className="col-md-6 col-md-push-3">
                        <button className="btnLogin" onClick={login}>Log in</button>
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
        user: state.userLogin,
        photo: state.photo
    }
}
function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userAction, dispatch),
        photoActions: bindActionCreators(photoAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)