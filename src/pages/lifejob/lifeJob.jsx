import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'

import TopNav from "../../components/top-nav";
import Footer from "../../components/footer";
import Share from "../../components/share";
import TopLink from "../../components/top-link";

import JobList from './pages/lifejob-list'
import JobDetail from './pages/lifejob-detail'


export default class LifeJob extends Component{
    render() {
        return (
            <div>
                <TopNav />
                <TopLink />
                <Switch>
                    <Route path={"/job/detail"} component={JobDetail}/>
                    <Route path={"/job"} component={JobList}/>
                </Switch>
                <Footer />
                <Share />
            </div>
        )
    }
}