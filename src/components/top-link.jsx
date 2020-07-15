import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom'

import new_ico from './../static/images/new_ico.png'

export default class TopLink extends Component{
    render() {
        return (
            <div id="headerbar">
                <div className="clearfix" id="header">
                    <div className="logo">
                        <Link className="logo-img" to={"/"} />
                    </div>
                    <div className="menu_nav">
                        <ul className="navs clearfix">
                            <li><NavLink to={"/"} >首页</NavLink></li>
                            <li><NavLink to={"/resource"} activeClassName="on">幼教资源</NavLink></li>
                            <li><NavLink to={"/job"} activeClassName="on">职场人生</NavLink></li>
                            <li><NavLink to={"/activities"} activeClassName="on">活动专区</NavLink></li>
                            <li>
                                <NavLink to={"/live"} activeClassName="on">直播课堂</NavLink>
                                <img src={new_ico} className="new_nav"/>
                            </li>
                            <li><NavLink to={"/user"} activeClassName="on">个人中心</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}