import React from 'react';

import {HashRouter, Switch, Route} from 'react-router-dom'

import Login from './pages/login/login'
import Register from './pages/register/register'
import Home from './pages/home/home'
import Resource from './pages/resource/resource'
import Activities from './pages/activities/activities'
import Live from './pages/live/live'
import LifeJob from './pages/lifejob/lifeJob'
import userCenter from './pages/user-center/user-center'
import Forget from './pages/forget/forget'
import NotFound from './pages/not-found/not-found'

class App extends React.Component {
  render() {
    return (
        <HashRouter>
          <Switch>
            <Route path={"/login"} component={Login}/>
            <Route path={"/reg"} component={Register}/>
            <Route path={"/forget"} component={Forget}/>
            <Route path={"/resource"} component={Resource}/>
            <Route path={"/activities"} component={Activities}/>
            <Route path={"/live"} component={Live}/>
            <Route path={"/job"} component={LifeJob}/>
            <Route path={"/user"} component={userCenter}/>
            <Route path={"/"} component={Home}/>
            <Route component={NotFound}/>
          </Switch>
        </HashRouter>
    )
  }
}

export default App;
