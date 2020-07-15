import React, {Component} from 'react';
import TopNav from './../../components/top-nav'
import Footer from './../../components/footer'
import Share from './../../components/share'
import HomeNav from './components/home-nav'
import HomeSowing from './components/home-sowing'
import HomeCard from './components/home-card'
import HomeResource from './components/home-resource'
import HomeJob from './components/home-job'
import HomeActivities from './components/home-activities'
import HomeLive from './components/home-live'


export default class Home extends Component{
    render() {
        return (
           <div>
               <TopNav />
               <HomeNav />
               <HomeSowing />
               <HomeCard />
               <HomeResource />
               <HomeJob />
               <HomeActivities />
               <HomeLive />
               <Footer />
               <Share />
           </div>
        )
    }
}