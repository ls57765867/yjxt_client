import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'
import {getUser, checkLogout, removeUser} from "../api/userApi";

import {message, Modal} from "antd";
import {ExclamationCircleOutlined} from '@ant-design/icons';

 class TopNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_show_xcx: false, // 小程序显示和隐藏
            is_show_chat: false, // 二维码显示和隐藏

            user_name: getUser().user_name,
        }
    }

    logOut(e) {
        e.preventDefault()
        Modal.confirm({
            title: '确定要退出吗?',
            icon: <ExclamationCircleOutlined/>,
            okText: '退出',
            cancelText: '取消',
            content: '              ',
            onOk: () => {
                checkLogout().then((result) => {
                    if (result && result.status === 1) {
                        this.setState({
                            user_name: ''
                        })
                        removeUser()
                        message.success(result.msg)
                        this.props.history.push('/')

                    } else if (result && result.status === 0) {
                        message.error('退出失败,服务器出了点问题')
                    }
                }).catch((error) => {
                    message.error(error.msg)
                })
            }
        })

    }

    render() {
        const {is_show_xcx, is_show_chat, user_name} = this.state;
        return (
            <div id="web-headbar">
                <div className="web-head">
                    <div className="mobile-app">
                        <div className="app_l">
                            <Link to={"/"} className="app">今日幼教</Link>
                        </div>
                        <div
                            className="app_l"
                            onMouseOver={() => {
                                this.setState({is_show_xcx: true})
                            }}
                            onMouseOut={() => {
                                this.setState({is_show_xcx: false})
                            }}
                        >
                            <a className="app">今日小记者小程序</a>
                            <div className="app-box" style={{display: is_show_xcx ? '' : 'none'}}>
                                <p>扫一扫，关注我吧！</p>
                                <div className="xcx-er"/>
                            </div>
                        </div>
                        <div
                            className="app_r"
                            onMouseOver={() => {
                                this.setState({is_show_chat: true})
                            }}
                            onMouseOut={() => {
                                this.setState({is_show_chat: false})
                            }}
                        >
                            <a className="weixin">幼教三六五微信公众平台</a>
                            <div className="app-box weixin-box" style={{display: is_show_chat ? '' : 'none'}}>
                                <p>扫一扫，关注我吧！</p>
                                <div className="weixin-er"/>
                            </div>
                        </div>
                    </div>
                    {
                        user_name ? (
                            <div className="head-tool">
                                <div className="toolbox">
                                    <div className="toolbox-simple">
                                        <span>您好: <span style={{fontWeight: "bold"}}>{user_name}</span></span>
                                    </div>
                                </div>
                                <div className="line">|</div>
                                <div className="toolbox">
                                    <div className="toolbox-simple ">
                                        <Link onClick={(e) => {
                                            this.logOut(e)
                                        }} className="toolbox-one-link">退出登录</Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="head-tool">
                                <div className="toolbox">
                                    <div className="toolbox-simple">
                                        <Link className="toolbox-one-link" to={"/login"}>登录</Link>
                                    </div>
                                </div>
                                <div className="line">|</div>
                                <div className="toolbox">
                                    <div className="toolbox-simple ">
                                        <Link to={"/reg"} className="toolbox-one-link">免费注册</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        )
    }
}

export default withRouter(TopNav)