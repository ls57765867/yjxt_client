import React, {Component} from 'react'
import {Switch, Route} from "react-router-dom";

import TopNav from './../../components/top-nav'
import Footer from './../../components/footer'
import VerifyPhone from './pages/verify-phone'
import ResetPassword from './pages/reset-password'


export default class Forget extends Component{
    render() {
        return (
            <div>
                <TopNav />
                <Switch>
                    <Route path={"/forget/reset"} component={ResetPassword}/>
                    <Route path={"/forget"} component={VerifyPhone}/>
                </Switch>
                <Footer />
            </div>
        )
    }
}