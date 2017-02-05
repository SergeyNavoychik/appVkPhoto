import React from 'react';
export default class PhotoPageItemPhoto extends React.Component {
    render() {
        return (
                <div className="itemPhoto col-sm-4 col-xs-12" >
                    <img src={this.props.item.src_big} className="image" alt="" />
                    <span className="itemPhotoLike">{this.props.item.likes.count}&#x2764;</span>
                </div>
        )
    }
}
