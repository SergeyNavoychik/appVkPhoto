import React from 'react';
import ReactDOM from 'react-dom';
const PopupSlider = (props) => {
    function next(e){
        let currentImg = document.querySelector('.imgPopup');
        let currentSrc = currentImg.getAttribute('src');
        let indexSrc = props.arrayTopPhoto.indexOf(currentSrc);
        if(indexSrc == props.arrayTopPhoto.length-1){
            currentImg.setAttribute('src', props.arrayTopPhoto[0])
        }
        else{
            currentImg.setAttribute('src', props.arrayTopPhoto[indexSrc+1])
        }
    }
    function prev(e){
        let currentImg = document.querySelector('.imgPopup');
        let currentSrc = currentImg.getAttribute('src');
        let indexSrc = props.arrayTopPhoto.indexOf(currentSrc);
        if(indexSrc == 0){
            currentImg.setAttribute('src', props.arrayTopPhoto[props.arrayTopPhoto.length-1])
        }
        else{
            currentImg.setAttribute('src', props.arrayTopPhoto[indexSrc - 1])
        }
    }
    return (
        <div id="openTopImg" className="closePopupSlider" onClick={props.close}>
            <img src={props.src} onClick={next} className="imgPopup" alt=""/>
            <div className="next" onClick={next}><span>&gt;</span></div>
            <div className="prev" onClick={prev}><span>&lt;</span></div>
        </div>
    )
}
export default PopupSlider;

