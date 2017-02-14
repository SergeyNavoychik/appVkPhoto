import React from 'react';
import PhotoPageMenu from './photoPageMenu';
const PhotoPage = (props) => {
    return (
        <div className="photoPage col-sm-12">
            <PhotoPageMenu/>
            {props.children}
        </div>
    )
}
export default PhotoPage;
