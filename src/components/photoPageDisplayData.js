import React from 'react';
import PhotoPageBlockPhoto from '../containers/photoPageBlockPhoto';
import PhotoPageBlockStatistics from '../containers/photoPageBlockStatistics';

const PhotoPageDisplayData = (props) => {
    return (
            <div className="row">
                <PhotoPageBlockPhoto year={props.params.year}/>
                <PhotoPageBlockStatistics/>
            </div>
    )
}
export default PhotoPageDisplayData;
