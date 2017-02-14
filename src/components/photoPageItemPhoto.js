import React from 'react';
const PhotoPageItemPhoto = (props) => {
    return (
            <div className="itemPhoto col-sm-4 col-xs-12" >
                <img src={props.item.src_big} className="image" alt="" />
                <span className="itemPhotoLike">{props.item.likes.count}&#x2764;</span>
            </div>
    )
}
export default PhotoPageItemPhoto;
