import {GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAIL, LOAD_PHOTO_BY_YEAR, LOAD_PHOTO_BY_YEAR_SUCCESS,
        CHANGE_OFFSET, SHOW_MORE_PHOTO, OPEN_IMG } from '../constants/photo';
const initialState = {
    year: '',
    allPhotos: [],
    photosByChooseYear: [],
    arrayShowedPhotos: [],
    statistics: {
        totalLike: '',
        totalReposts: '',
        arrMostPopularPhotoSrc: [],
        arrNotPopularPhoto: []
    },
    fetching: false,
    offset: 15,
    error: '',
    popupSlider: null
};
export default function photo(state = initialState, action) {
    switch (action.type){
        case GET_PHOTOS_REQUEST:
            return Object.assign({}, state, {fetching: true} );
        case GET_PHOTOS_SUCCESS:
            return Object.assign({}, state, {allPhotos: action.payload, fetching: false});
        case GET_PHOTOS_FAIL:
            return Object.assign({}, state, {error: action.payload, fetching: false});
        case LOAD_PHOTO_BY_YEAR:
            return Object.assign({}, state, {year: action.payload, fetching: true, arrayShowedPhotos: [], offset: 15});
        case LOAD_PHOTO_BY_YEAR_SUCCESS:
            return Object.assign({}, state, {photosByChooseYear: action.payload.arrPhotoByYear,
                                            fetching: false, arrayShowedPhotos: action.payload.arrShowedPhotos,
                                            statistics: {
                                                totalLike: action.payload.allLikes,
                                                totalReposts: action.payload.countReposts,
                                                arrMostPopularPhotoSrc: action.payload.topPhotos,
                                                arrNotPopularPhoto: action.payload.unPopular
                                            },});
        case SHOW_MORE_PHOTO:
            return Object.assign({}, state, {arrayShowedPhotos: [].concat(state.arrayShowedPhotos, action.payload.arrayShowedPhotos),
                                             offset: action.payload.off});
        case OPEN_IMG:
            return Object.assign({}, state, {popupSlider: action.payload});
        default:
            return state;
    }
}