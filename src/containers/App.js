import React from  'react';
import MainMenu from '../components/mainMenu';
import User from './userLogin';
import Footer from '../components/footer';
import 'bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/Styles.sass';
import '../helperFunction/front';
import  {connect} from 'react-redux';
export class App extends React.Component{
    render(){
        return(
            <div>
                {this.props.openImg}
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
        openImg: state.photo.openImg
    }
}
export default connect(mapStateToProps)(App)
