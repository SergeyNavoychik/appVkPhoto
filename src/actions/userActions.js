import {LOGIN_SUCCESS, LOGIN_FAILED, LOG_OUT} from '../constants/userLogin';

export function login(userName, userId, avatarUrl) {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            userName,
            userId,
            avatarUrl
        }
    }
}
export function loginError(error) {
    return {
        type: LOGIN_FAILED,
        payload: error
    }
}
export function logOut() {
    return {type: LOG_OUT}
}
