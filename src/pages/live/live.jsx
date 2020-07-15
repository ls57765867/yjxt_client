import React, {Component} from 'react';
import TopNav from "../../components/top-nav";
import Footer from "../../components/footer";
import Share from "../../components/share";
import TopLink from "../../components/top-link";
import LiveList from "./pages/live-list";


export default class Live extends Component{
    render() {
        return (
            <div>
                <TopNav />
                <TopLink />
                <LiveList/>
                <Footer />
                <Share />
            </div>
        )
    }
}