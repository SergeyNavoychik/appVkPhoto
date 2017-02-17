import {LOGIN_SUCCESS, LOGIN_FAILED, LOG_OUT} from '../constants/userLogin';

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
            return Object.assign({}, state, {name: action.payload.userName,
                                             userId: action.payload.userId,
                                             error:'',
                                             isLogin: true,
                                             avatarUrl: action.payload.avatarUrl});
        case LOGIN_FAILED:
            return Object.assign({}, state, {error: action.payload});
        case LOG_OUT:
            return Object.assign({}, state, {isLogin: false,name: '', avatarUrl: '', userId: ''});
        default:
            return state;
    }
}