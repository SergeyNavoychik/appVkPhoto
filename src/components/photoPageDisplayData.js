import React from 'react';
import PhotoPageBlockPhoto from '../containers/photoPageBlockPhoto';
import PhotoPageBlockStatistics from '../containers/photoPageBlockStatistics';

export default class PhotoPageDisplayData extends React.Component {
    render() {
        return (
                <div className="row">
                    <PhotoPageBlockPhoto year={this.props.params.year}/>
                    <PhotoPageBlockStatistics/>
                </div>
        )
    }
}
