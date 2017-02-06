import React from 'react';
import ReactDOM from 'react-dom';
export default class PopupSlider extends React.Component {
    next(e){
        let currentImg = document.querySelector('.imgPopup');
        let currentSrc = currentImg.getAttribute('src');
        let indexSrc = this.props.arrayTopPhoto.indexOf(currentSrc);
        if(indexSrc == this.props.arrayTopPhoto.length-1){
            currentImg.setAttribute('src', this.props.arrayTopPhoto[0])
        }
        else{
            currentImg.setAttribute('src', this.props.arrayTopPhoto[indexSrc+1])
        }
    }
    prev(e){
        let currentImg = document.querySelector('.imgPopup');
        let currentSrc = currentImg.getAttribute('src');
        let indexSrc = this.props.arrayTopPhoto.indexOf(currentSrc);
        if(indexSrc == 0){
            currentImg.setAttribute('src', this.props.arrayTopPhoto[this.props.arrayTopPhoto.length-1])
        }
        else{
            currentImg.setAttribute('src', this.props.arrayTopPhoto[indexSrc - 1])
        }
    }
    render() {
        return (
            <div id="openTopImg" className="closePopupSlider" onClick={this.props.close}>
                <img src={this.props.src} onClick={this.next.bind(this)} className="imgPopup" alt=""/>
                <div className="next" onClick={this.next.bind(this)}><span>&gt;</span></div>
                <div className="prev" onClick={this.prev.bind(this)}><span>&lt;</span></div>
            </div>
        )
    }
}


