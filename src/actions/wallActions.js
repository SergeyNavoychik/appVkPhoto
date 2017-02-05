import {GET_WALL_REQUEST, GET_WALL_SUCCESS, GET_WALL_FAIL} from '../constants/wall'


let arrayWall = [];
function getWallAll(id, count, offset, dispatch) {
    VK.Api.call('wall.get', {owner_id: id, filter: 'owner', v: "5.1"}, function (r) {
        console.log(r.response);
        for ( let key in r.response){
            if ( key == 'items'){
                arrayWall = arrayWall.concat(r.response[key]);
            }
        }
        console.log(arrayWall);
        dispatch({
            type: GET_WALL_SUCCESS,
            payload: arrayWall
        });
    });
}

export function getWall(id) {
    return (dispatch) => {
        dispatch({
            type: GET_WALL_REQUEST
        });
        arrayWall = [];
        getWallAll(id, 100, 0, dispatch);
    }
}


