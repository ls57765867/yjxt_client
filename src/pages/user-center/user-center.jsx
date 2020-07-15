import React, {Component} from 'react';
import './components/user.css'
import {HashRouter, Switch, Route, NavLink} from 'react-router-dom'
import UpLoadImg from "./components/upLoadImg";


import TopNav from "../../components/top-nav";
import Footer from "../../components/footer";
import Share from "../../components/share";
import TopLink from "../../components/top-link";

import UserAccount from './pages/user-account'
import UserActivities from './pages/user-activities'
import UserFav from './pages/user-fav'
import UserLive from './pages/user-live'
import UserResource from './pages/user-resource'
import NotFound from './../not-found/not-found'


import vip_ico from "../../static/images/vip_ico.png";

import myresource_ico from "../../static/images/myresource_ico.png";
import myresource_ico_ing from "../../static/images/myresource_ico_ing.png";
import myactivity_ico from "../../static/images/myactivity_ico.png";
import myactivity_ico_ing from "../../static/images/myactivity_ico_ing.png";
import mylive_ico from "../../static/images/mylive_ico.png";
import mylive_ico_ing from "../../static/images/mylive_ico_ing.png";
import myfav_ico from "../../static/images/myfav_ico.png";
import myfav_ico_ing from "../../static/images/myfav_ico_ing.png";
import myaccount_ico from "../../static/images/myaccount_ico.png";
import myaccount_ico_ing from "../../static/images/myaccount_ico_ing.png";
import {isLogin, getUserInfo, userUpdateIcon, userUpdateIntro, getUser} from "../../api/userApi";
import {message} from "antd";


export default class UserCenter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // tag
            matchUrl: '/user',
            user_placeholder: 0,
            img_icon: '',
            user_intro: "",
            user_name: '',
            user_count_money: 0,
        }
    }

    componentDidMount() {
        if (!isLogin()) {
            message.success('请先进行登录!')
            this.state = () => false
            this.props.history.replace('/login')
            return
        }
        this.loadNewUserInfo()
    }

    loadNewUserInfo = () => {
        getUserInfo(getUser().id).then((result) => {
            if (result && result.status === 1) {
                message.success(result.msg)
                this.setState({
                    user_name: result.data[0].user_name,
                    user_intro: result.data[0].user_intro,
                    user_count_money: result.data[0].user_count_money,
                    img_icon: result.data[0].user_icon,
                })
            } else {
                message.error(result.msg)
            }
        }).catch((err) => {
            message.error(err.msg)
        })
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        let pathname = nextProps.location.pathname;
        if (pathname !== nextState.matchUrl ) {
            this.setState({
                matchUrl: pathname
            })
        }
    }



    render() {
        const {matchUrl, img_icon, user_intro, user_placeholder, user_name, user_count_money} = this.state;
        return (
            <div>
                <TopNav/>
                <TopLink/>
                {/*个人介绍*/}
                <div className="member_bg">
                    <div className="member_top">
                        <div className="member_avatar">
                            <UpLoadImg
                                upLoadBtnTitle={'上传您的头像'}
                                imgName={'client_img'}
                                upLoadAction={'/web/upload_img'}
                                img_icon={img_icon}
                                upLoadCallBack={(url) => {
                                    userUpdateIcon(getUser().id, url).then((result) => {
                                        if (result && result.status === 1) {
                                            message.success(result.msg)
                                        } else {
                                            message.error(result.msg)
                                        }
                                    }).catch((err) => {
                                        message.error(err.msg)
                                    })
                                }}
                            />


                            <img src={vip_ico} className="vip_ico"/>
                        </div>
                        <div className="member_div_one">
                            <div className="member_name">{user_name}</div>
                            <div className="member_money">学习币：{user_count_money}</div>
                            <div className="member_desc">
                                <input
                                    type="text"
                                    name={"user_intro"}
                                    placeholder={user_placeholder ? '' : '请在此输入您的签名,让大家了解一下你!'}
                                    onFocus={() => {
                                        this.setState({
                                            user_placeholder: 1
                                        })
                                    }}
                                    onBlur={() => {
                                        this.setState({
                                            user_placeholder: 0
                                        })
                                    }}
                                    value={user_intro}
                                    onChange={(e) => {
                                        this.setState({
                                            [e.target.name]: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="member_nav">
                    <div className="member_nav_content"/>
                </div>
                <div className="member_content">
                    <div className="member_menus">
                        <NavLink to={"/user"}>
                            <div className={matchUrl === "/user" ? "member_menu_on" : "member_menu"}>
                                <img src={matchUrl === "/user" ? myresource_ico_ing : myresource_ico}/>
                                <span className="member_menu_name">我的资源</span>
                                <span className="member_menu_ico">></span>
                            </div>
                        </NavLink>
                        <NavLink to={"/user/activities"}>
                            <div className={matchUrl === "/user/activities" ? "member_menu_on" : "member_menu"}>
                                <img src={matchUrl === "/user/activities" ? myactivity_ico_ing : myactivity_ico}/>
                                <span className="member_menu_name">我的活动</span><span
                                className="member_menu_ico">></span>
                            </div>
                        </NavLink>
                        <NavLink to={"/user/fav"}>
                            <div className={matchUrl === "/user/fav" ? "member_menu_on" : "member_menu"}>
                                <img src={matchUrl === "/user/fav" ? myfav_ico_ing : myfav_ico}/>
                                <span className="member_menu_name">我的收藏</span>
                                <span className="member_menu_ico">></span>
                            </div>
                        </NavLink>
                        <NavLink to={"/user/account"}>
                            <div className={matchUrl === "/user/account" ? "member_menu_on" : "member_menu"}>
                                <img src={matchUrl === "/user/account" ? myaccount_ico_ing : myaccount_ico}/>
                                <span className="member_menu_name">我的账户</span>
                                <span className="member_menu_ico">></span>
                            </div>
                        </NavLink>
                    </div>
                    {/*中间的主题内容*/}
                    <HashRouter>
                        <Switch>
                            <Route path={"/user/account"} component={UserAccount}/>
                            <Route path={"/user/activities"} component={UserActivities}/>
                            <Route path={"/user/fav"} component={UserFav}/>
                            <Route path={"/user/live"} component={UserLive}/>
                            <Route path={"/user"} component={UserResource}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </HashRouter>
                </div>
                <Footer/>
                <Share/>
            </div>
        )
    }
}