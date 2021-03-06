import React from  'react';
import MainMenu from '../components/mainMenu';
import User from './userLogin';
import Footer from '../components/footer';
import 'bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/Styles.sass';
import '../helperFunction/helpFunc';
import  {connect} from 'react-redux';
export class App extends React.Component{
    render(){
        return(
            <div>
                {this.props.popupSlider}
                <div className="header">
                   <div className="container">
                       <div className="row">
                           <MainMenu/>
                           <User/>
                       </div>
                   </div>
                </div>
                <div className=" mainContent container">
                    {this.props.children}
                </div>
                <Footer/>
            </div>

        );
    }
}
function mapStateToProps (state) {
    return {
        popupSlider: state.photo.popupSlider
    }
}
export default connect(mapStateToProps)(App)
