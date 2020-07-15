import React, {Component} from 'react';
import {NavLink ,Link} from 'react-router-dom'

import new_ico from './../../../static/images/new_ico.png'

export default class HomeNav extends Component{
    render() {
        return (
            <div>
                <div id="headerbar_index">
                    <div className="clearfix" id="header">
                        <div className="logo">
                            <Link to={"/"} className="logo-img" />
                        </div>
                        <div className="search">
                            <form className="search_box">
                                <div className="fl">
                                    <label>
                                        <input name="kw" id="destoon_kw" type="text" className="search_i" placeholder="请输入关键词" />
                                    </label>
                                </div>
                                <div className="fr">
                                    <button type="submit" value="" className="search_s" />
                                </div>
                            </form>
                        </div>
                        <div className="teltime">
                            <div className="work-tel">400-100-5678</div>
                            <div className="work-time">周一至周日 8:00-18:00</div>
                        </div>
                    </div>
                </div>
                <div className="menubar clearfix">
                    <div className="w1280">
                        <ul className="navs clearfix">
                            <li><NavLink to={"/"} activeClassName="on">首页</NavLink></li>
                            <li><NavLink to={"/resource"} activeClassName="on">幼教资源</NavLink></li>
                            <li><NavLink to={"/job"} activeClassName="on">职场人生</NavLink></li>
                            <li><NavLink to={"/activities"} activeClassName="on">活动专区</NavLink></li>
                            <li>
                                <NavLink to={"/live"} activeClassName="on">直播课堂</NavLink>
                                <img src={new_ico} className="new_nav" alt=""/>
                            </li>
                            <li><NavLink to={"/user"} activeClassName="on">个人中心</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}