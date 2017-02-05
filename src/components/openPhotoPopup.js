import React from 'react';
import ReactDOM from 'react-dom';
export default class Popup extends React.Component {
    render() {
        return (
            <div className="openTopImg" onClick={this.props.close}>
                <img src={this.props.src} alt=""/>
                <span className="closeImg" >X</span>
            </div>
        )
    }
}


