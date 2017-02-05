import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, LOG_OUT, AVATAR_URL} from '../constants/userLogin';
function getAvatar(id,dispatch) {
    VK.Api.call('users.get', {user_ids: id, fields: 'photo_50'}, function(r) {
        if(r.response) {
            dispatch({
                type: AVATAR_URL,
                payload: r.response[0].photo_50
            });
        }
    });
}
export function login() {
    return(dispatch) => {
        dispatch({
            type: LOGIN_REQUEST
        });
        VK.Auth.login( (r) => {
            if (r.session){
                let userName =r.session.user.first_name;
                let userId = r.session.mid;
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        userName,
                        userId
                    }
                });
                getAvatar(r.session.mid, dispatch);
            }
            else {
                dispatch({
                    type: LOGIN_FAILED,
                    payload: new Error ("Error login!")
                })
            }
        }, 20+8192);

    }
}
export function userIsLogin() {
    return(dispatch) =>{
        VK.Auth.getLoginStatus(result => {
            if(result.status == 'connected'){
                let userId =result.session.mid;
                VK.Api.call('users.get', {user_ids: userId, fields: 'photo_50'}, function(r) {
                    if(r.response) {
                        let userName = r.response[0].first_name;
                        dispatch({
                            type: LOGIN_SUCCESS,
                            payload: {
                                userName,
                                userId
                            }
                        });
                    }
                });
                getAvatar(userId, dispatch);
            }
        });
    }
}
export function logOut() {
    return (dispatch) => {
        VK.Auth.logout( res => {
            if (res.session == null){
                dispatch({
                    type: LOG_OUT,
                    payload: ''
                })
            }
        });

    }
}
