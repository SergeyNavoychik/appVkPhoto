import {GET_WALL_REQUEST, GET_WALL_SUCCESS, GET_WALL_FAIL} from '../constants/wall'

const initialState = {
    wallNotes: [],
    fetching: false,
    error: ''
};
export default function wall(state = initialState, action) {
    switch (action.type){
        case GET_WALL_REQUEST:
            return Object.assign({}, state, {fetching: true});
        case GET_WALL_SUCCESS:
            return Object.assign({}, state, {wallNotes:action.payload, fetching: false});

        default:
            return state;
    }
}