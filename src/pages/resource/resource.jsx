import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import TopNav from "../../components/top-nav";
import Footer from "../../components/footer";
import Share from "../../components/share";
import TopLink from "../../components/top-link";

import ResourceList from './pages/resource-list'
import ResourceDetail from './pages/resource-detail'


export default class Resource extends Component{
   render() {
       return (
           <div>
                <TopNav />
                <TopLink />
                <Switch>
                    <Route path={"/resource/detail"} component={ResourceDetail}/>
                    <Route path={"/resource"} component={ResourceList}/>
                </Switch>
                <Footer />
                <Share />
            </div>
        )
    }
}