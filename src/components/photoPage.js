import React from 'react';
import PhotoPageMenu from './photoPageMenu';
export default class PhotoPage extends React.Component {
    render() {
        return (
            <div className="photoPage col-sm-12">
                <PhotoPageMenu/>
                {this.props.children}
            </div>
        )
    }
}

