import {GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAIL, LOAD_PHOTO_BY_YEAR, LOAD_PHOTO_BY_YEAR_SUCCESS,
        OPEN_IMG, SHOW_MORE_PHOTO} from '../constants/photo'

export function getPhotosRequest() {
    return {
        type: GET_PHOTOS_REQUEST
    }
}
export function getPhotosSuccess(arrayPhotos) {
    return {
        type: GET_PHOTOS_SUCCESS,
        payload: arrayPhotos
    }
}
export function getPhotoFail(error) {
    return {
        type: GET_PHOTOS_FAIL,
        payload: error
    }
}
export function loadPhotoByYear(year) {
    return {
        type: LOAD_PHOTO_BY_YEAR,
        payload: year
    }
}
export function getPhotosByYear(data) {
    let {arrPhotoByYear, arrShowedPhotos,allLikes, countReposts, topPhotos, unPopular} = data
    return {
            type: LOAD_PHOTO_BY_YEAR_SUCCESS,
            payload: {
                arrPhotoByYear,
                arrShowedPhotos,
                allLikes,
                countReposts,
                topPhotos,
                unPopular
            }
        }
}
export function showMorePhotos(arrayShowedPhotos, off ) {
    return {
        type: SHOW_MORE_PHOTO,
        payload: {
            arrayShowedPhotos,
            off
        }
    }
}
export function imgPopupSlider(popup) {
    return{
        type: OPEN_IMG,
        payload: popup
    }
}
