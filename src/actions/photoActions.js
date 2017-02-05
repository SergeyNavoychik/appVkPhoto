import {GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAIL, LOAD_PHOTO_BY_YEAR, LOAD_PHOTO_BY_YEAR_SUCCESS,
        CHANGE_OFFSET, LOAD_MORE_PHOTO} from '../constants/photo'
let arrayPhotos = [];

function countAllLike(array) {
    let total = 0;
    array.forEach( item => {
        total += item.likes.count
    });
    return total;
}

function countAllReposts(array) {
    let total = 0;
    array.forEach( item => {
        total += item.reposts.count
    });
    return total;
}

function topPhoto(array) {
    let arrMostPopularPhotoSrc = [];
    let tmp = [].concat(array);
    tmp.sort((a,b) => { return b.likes.count - a.likes.count});
    if( tmp.length > 0){
        for ( let i= 0; i < 5; ++i) {
            arrMostPopularPhotoSrc.push(tmp[i]);
        }
    }
    return arrMostPopularPhotoSrc;
}

function notPopularPhoto(array) {
    let tmp = [].concat(array);
    tmp.sort((a,b) => { return a.likes.count - b.likes.count});
    let arrNotPopularPhotoSrc = [];
    if ( tmp.length > 0 ){
        for ( let i= 0; i < 5; ++i) {
            arrNotPopularPhotoSrc.push(tmp[i]);
        }
        return arrNotPopularPhotoSrc;
    }
    return arrNotPopularPhotoSrc;
}


/*==========================*/
function getPhotos(count, offset, dispatch) {
    VK.Api.call('photos.getAll', {extended:1, count: count, offset: offset}, function(r) {
        if(offset < r.response[0] - count){
            offset +=count;
            arrayPhotos = arrayPhotos.concat(r.response);
            getPhotos(count, offset, dispatch)
        }
        else{
            arrayPhotos = arrayPhotos.concat(r.response);
            }
            dispatch({
                type: GET_PHOTOS_SUCCESS,
                payload: {
                    arrayPhotos
                }
            });
        })
    }

export function getAllPhotos() {
    return (dispatch) => {
        dispatch({
            type: GET_PHOTOS_REQUEST
        });
        arrayPhotos = [];
        getPhotos(200, 0, dispatch);
    }
}
export function loadMorePhotos(array, offset = 0 ){
    return (dispatch) => {
        let arrayShowedPhotos = [];
        if (array.length > 0) {
            for (let i = offset; i < offset + 15; ++i) {
                if (array[i]) {
                    arrayShowedPhotos.push(array[i]);
                }
            }
        }
        let off = offset + 15;
        dispatch({
            type: LOAD_MORE_PHOTO,
            payload: {
                arrayShowedPhotos,
                off
            }
        });
    }

}
export function getPhotosByYear(year, arrayPhoto) {
    return (dispatch) => {
        dispatch({
            type: LOAD_PHOTO_BY_YEAR,
            payload: year
        });
        let yearCreate,
            arrPhotoByYear = [];
        if( year == 'all_years'){
            arrayPhoto.map( item => {
                if( typeof item == 'object'){
                    arrPhotoByYear.push(item);
                }
            });
        }
        else{
            arrayPhoto.map( item => {
                yearCreate = (new Date(item.created*1000).getFullYear());
                if( yearCreate == +year){
                    arrPhotoByYear.push(item);
                }
            });
        }
        let allLikes = countAllLike(arrPhotoByYear);
        let countReposts = countAllReposts(arrPhotoByYear);
        let topPhotos = topPhoto(arrPhotoByYear);
        let unPopular = notPopularPhoto(arrPhotoByYear);
        let arrShowedPhotos = arrayShowedPhotos(arrPhotoByYear);
        dispatch({
            type: LOAD_PHOTO_BY_YEAR_SUCCESS,
            payload: {
                arrPhotoByYear,
                arrShowedPhotos,
                allLikes,
                countReposts,
                topPhotos,
                unPopular
            }
        });
    }
}

function arrayShowedPhotos(array) {
    let imgBlockArray = [];
    if (array.length > 0){
        for ( let i = 0; i <15; ++i){
            if(array[i]) {
                imgBlockArray.push(array[i]);
            }
        }
    }
    return imgBlockArray;
}

export function imgPopup(popup) {
    return{
        type: 'OPEN_IMG',
        payload: popup
    }
}
