import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom'

import TopNav from "../../components/top-nav";
import Footer from "../../components/footer";
import Share from "../../components/share";
import TopLink from "../../components/top-link";

import ActivitiesDetail from './pages/activities-detail'
import ActivitiesList from './pages/activities-list'


export default class Activities extends Component{
    render() {
        return (
            <div>
                <TopNav />
                <TopLink />
                {/*封面*/}
                <Switch>
                    <Route path={'/activities/detail'} component={ActivitiesDetail}/>
                    <Route path={'/activities'} component={ActivitiesList}/>
                </Switch>
                <Footer />
                <Share />
            </div>
        )
    }
}