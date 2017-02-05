import React from 'react';
import {Link} from 'react-router'
export default class PageNotFound extends React.Component {
    render() {
        return (
            <div className="text-center col-sm-12">
                <h1 className="ops"> Oops!!!</h1>
                <div className="numError">
                    <span>404</span>
                    <div>
                        <p className="er">ERROR</p>
                        <p className="notFound">PAGE NOT FOUND</p>
                    </div>
                </div>
                <p className="notFoundSorry"> Sorry, that page doesn’t exist! Return to the <Link to="/">HOMEPAGE</Link></p>
            </div>
        )
    }
}
