import {combineReducers} from 'redux';
import userLogin from './userLogin';
import photo from './photo';
import wall from './wall';
const rootReducer = combineReducers({
    userLogin,
    photo,
    wall
});
export default rootReducer;
