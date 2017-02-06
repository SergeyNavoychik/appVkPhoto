import React from 'react';
import {Link} from 'react-router';
const MainMenu = () => {
    const category = ['photos', 'wall'];
    return(
        <div className="col-sm-8">
            <div className="mainMenu">
                <Link to="/" className="btnCategory"
                      onlyActiveOnIndex={true}
                      activeClassName="btnCurrentCategory">home
                </Link>
                {
                    category.map( (item, i) =>{
                        return (
                            <Link to={`/${item}`}
                                  activeClassName="btnCurrentCategory"
                                  key={i}
                                  className="btnCategory">{item}
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default MainMenu;
