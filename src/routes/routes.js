import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'
import App from '../containers/App'
import HomePage from '../containers/homePage'
import PageNotFound from '../components/pageNotFound'
import PhotoPage from '../components/photoPage'
import PhotoPageDisplayData from '../components/photoPageDisplayData'


export const routes = (
    <div>
        <Route path='/' component={App}>
            <IndexRoute component={HomePage} />
            <Route path='/photos' components={PhotoPage}>
                <Route path='/photos/:year' component={PhotoPageDisplayData}/>
            </Route>
            <Route path='*' component={PageNotFound}/>
        </Route>
    </div>
);

