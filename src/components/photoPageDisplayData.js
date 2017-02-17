import React, { PropTypes } from 'react';
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
PhotoPageDisplayData.propTypes = {
    params: PropTypes.object.isRequired
}
export default PhotoPageDisplayData;
