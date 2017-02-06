import React from 'react';
import  {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as photoActions from '../actions/photoActions';
import PopupSlider from '../components/openPhotoPopupSlider';
export class BlockStatisticsTopPhotos extends React.Component {
    open(e){
        let arrSrc = this.props.arrayTopPhoto.map ( item => {
            return item.src_big;
        });
        this.props.photoActions.imgPopupSlider(<PopupSlider src={e.target.getAttribute('src')}
                                                close={this.close.bind(this)}
                                                arrayTopPhoto={arrSrc}/>);
    }
    close(e){
        if (e.target.className == 'closePopupSlider'){
            this.props.photoActions.imgPopupSlider(null);
        }
    }
    render() {
        return (
            <div className="row">
                {this.props.arrayTopPhoto.map((item, i) => {
                        return (
                            <div className="col-sm-6 " key={i}>
                                <div className="itemTopImg">
                                    <img className="blockStatisticsImg" src={item.src_big} onClick={this.open.bind(this)} alt="" />
                                    <span className="blockStatLike"><div></div>{ item.likes.count }</span>
                                </div>
                            </div>
                        )
                    })
                 }
            </div>
        )
    }
}
function mapStateToProps (state) {
    return {
        photo: state.photo
    }
}
function mapDispatchToProps(dispatch) {
    return {
        photoActions: bindActionCreators(photoActions, dispatch)
    }
}
export default connect( mapStateToProps, mapDispatchToProps)(BlockStatisticsTopPhotos)
