import React, { PropTypes } from 'react';
import PopupSlider from './popupSlider';
const BlockStatisticsTopPhotos = (props) => {
    function open(e)
    {
        let arrSrc = props.arrayTopPhoto.map(item => {
            return item.src_big;
        });
        props.actionSlider(<PopupSlider src={e.target.getAttribute('src')}
                                             close={close}
                                             arrayTopPhoto={arrSrc}/>);
    }
    function close(e)
    {
        if (e.target.className == 'closePopupSlider') {
            props.actionSlider(null);
        }
    }
    return (
        <div className="row">
            {props.arrayTopPhoto.map((item, i) => {
                return (
                    <div className="col-sm-6 " key={i}>
                        <div className="itemTopImg">
                            <img className="blockStatisticsImg" src={item.src_big} onClick={open}
                                 alt=""/>
                            <span className="blockStatLike"><div></div>
                                { item.likes.count }</span>
                        </div>
                    </div>
                )
            })
            }
        </div>
    )
}

BlockStatisticsTopPhotos.propTypes = {
    arrayTopPhoto: PropTypes.array.isRequired
}

export  default BlockStatisticsTopPhotos