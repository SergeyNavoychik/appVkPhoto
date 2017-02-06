import React from 'react';
import {Link} from 'react-router';
const PhotoPageMenu = () => {
    const years = ['all_years', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010'];
    return (
            <div className="menuPhoto col-sm-12">
                {
                    years.map((item, i) => {
                        return (
                            <Link to={`photos/${item}`}
                                  key={i}
                                  activeClassName="btnCurrentYear"
                                  className="btnChooseYear"
                            >{ item.replace(/_/g, " ") }
                            </Link>)
                    })
                }
            </div>
     )
}
export default PhotoPageMenu;