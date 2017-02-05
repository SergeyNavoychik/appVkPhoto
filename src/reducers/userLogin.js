import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, LOG_OUT, AVATAR_URL} from '../constants/userLogin';

const initialState = {
    name: '',
    avatarUrl: '',
    userId: '',
    error: '',
    isLogin: false
};
export default function userLogin(state = initialState, action) {
    switch (action.type){
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {name: action.payload.userName, userId: action.payload.userId, error:'', isLogin: true});
        case LOGIN_FAILED:
            return Object.assign({}, state, {error: action.payload.message});
        case LOG_OUT:
            return Object.assign({}, state, {name: action.payload, isLogin: false});
        case AVATAR_URL:
            return Object.assign({}, state, {avatarUrl: action.payload});
        default:
            return state;
    }
}