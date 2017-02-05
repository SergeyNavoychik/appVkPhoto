import React from 'react';
import  {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as photoActions from '../actions/photoActions';
import BlockStatisticsTopPhotos from './blockStatisticsTopPhotos';

export class PhotoPageBlockStatistics extends React.Component {
    render() {
        const { totalReposts, totalLike, arrMostPopularPhotoSrc, arrNotPopularPhoto } = this.props.photo.statistics;
        const { photosByChooseYear } = this.props.photo;
        const { isLogin } = this.props.user;
        let year = this.props.photo.year.replace(/_/g, " ");
        let tmp;
        if (isLogin){
            tmp = <ul className="photoStatisticsList">
                    <li>Total amount of photos for {year}:
                        <p ><span className="statisticsData">{photosByChooseYear.length}</span></p>
                    </li>
                    <li>Total amount of Likes for {year}:
                        <p ><span className="statisticsData">{totalLike}</span></p>
                    </li>
                    <li>Total amount of Reposts for {year}:
                        <p > <span className="statisticsData">{ totalReposts }</span> </p>
                    </li>
                    <li>
                        <p>TOP 5 popular photos in {year}:</p>
                        < BlockStatisticsTopPhotos arrayTopPhoto={arrMostPopularPhotoSrc} />
                    </li>
                    <li>
                        <p>Most not popular photo in {year}:</p>
                        < BlockStatisticsTopPhotos arrayTopPhoto={arrNotPopularPhoto}/>
                    </li>
                </ul>
        }
        return (
            <div className="col-sm-3">
                {tmp}
            </div>
        )
    }
}
function mapStateToProps (state) {
    return {
        photo: state.photo,
        user: state.userLogin
    }
}
function mapDispatchToProps(dispatch) {
    return {
        photoActions: bindActionCreators(photoActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoPageBlockStatistics)
