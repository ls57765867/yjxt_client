import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {message} from 'antd'
import md5 from 'blueimp-md5'

import TopNav from './../../components/top-nav'
import Footer from './../../components/footer'
import Share from './../../components/share'

//, saveUser, setCookie, getCookie, clearCookie, getUser
import {loginUser, saveUser, getUser, setCookie, getCookie} from '../../api/userApi'
import config from './../../config/config'


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_phone: '', //手机号码
            user_password: '', // 密码
            remember_password: true, // 是否记住密码
        }
    }

    componentDidMount() {
        // 0. 拦截
        if (getUser().token) {
            this.setState = () => false;
            this.props.history.replace("/");
        }

        // 1. 获取cookie
        let data = getCookie();
        if (data) {
            this.setState({
                user_phone: data.user_phone,
                user_password: data.user_password
            })
        }
    }

    // 1. 提交表单
    onFinish = (e) => {
        // 1.0. 阻止默认事件
        e.preventDefault();
        // 1.1 获取数据
        const {user_phone, user_password, remember_password} = this.state;
        // 1.2 验证数据
        if (!user_phone.trim() || !user_password.trim()) {
            message.error('手机号码或密码不能为空!');
            return;
        }

        if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(user_phone)) {
            message.error('输入的手机号不合法!');
            return;
        }
        // 1.3 登录
        loginUser(user_phone, md5(user_password, config.PC_KEY)).then((result) => {
            console.log(result);
            if (result && result.status === 1) {
                message.success(result.msg);
                //1.4 保存用户信息到本地
                saveUser(result.data);
                //  判断是否记住用户名和密码
                if (remember_password === true) {
                    // 传入了手机号,密码, 过期的天数
                    setCookie(user_phone, user_password, 7);
                } else {
                    // 清除cookie
                    setCookie('', '', -1);
                }
                // 1.5 跳转到主面板
                this.props.history.replace('/');
            } else if (result && result.status === 0) {
                message.warning(result.msg);
            } else {
                message.error('服务器内部出现点问题~');
            }
        }).catch((error) => {
            message.error(error.msg)
        });

    };

    // 2. 处理输入框中的值
    getChangeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    // 3. 是否记住密码
    dealRememberPassword = () => {
        this.setState({
            remember_password: !this.state.remember_password
        })
    };

    render() {
        const {user_phone, user_password, remember_password} = this.state;
        return (
            <div>
                {/*头部*/}
                <TopNav/>
                {/*logo*/}
                <div id="headerbar">
                    <div className="clearfix" id="header">
                        <div className="logo">
                            <a className="logo-img" href="/"/>
                        </div>
                        <div className="search">
                        </div>
                        <div className="teltime">
                            <div className="work-tel">400-100-5678</div>
                            <div className="work-time">周一至周日 8:00-18:00</div>
                        </div>
                    </div>
                </div>
                {/*主面板*/}
                <div className="mainwraper">
                    <div className="login_bg">
                        <div className="dl-center">
                            <div className="dlc-right">
                                <ul className="sjyzm" id="pm">
                                    <form onSubmit={this.onFinish}>
                                        <dt id="sm"/>
                                        <li>
                                            欢迎登录
                                            <Link to={"/reg"} className="reds2">立即注册</Link></li>
                                        <dd>
                                            <input
                                                name="user_phone"
                                                type="text"
                                                id="user_phone"
                                                placeholder="手机号码"
                                                className="phone-num"
                                                value={user_phone}
                                                onChange={this.getChangeValue}
                                            />
                                        </dd>
                                        <dd>
                                            <input
                                                type="password"
                                                id="user_password"
                                                name="user_password"
                                                placeholder="登录密码"
                                                className="phone-mima"
                                                value={user_password}
                                                onChange={this.getChangeValue}
                                            />
                                        </dd>
                                        <li>
                                            <input
                                                type="checkbox"
                                                name="cookietime"
                                                value="1"
                                                id="cookietime"
                                                checked={remember_password}
                                                className="zddl2"
                                                onChange={this.dealRememberPassword}
                                            />
                                            <span className="zddl">&nbsp;&nbsp;记住我</span>
                                            <Link to={"/forget"} className="forgetpas">忘记密码?</Link>
                                        </li>
                                        <li>
                                            <button type="submit" name="submit" id="loginsubmit" value="立即登录"
                                                    className="ljdl">立即登录
                                            </button>
                                        </li>
                                    </form>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/*尾部*/}
                <Footer/>
                {/*返回顶部和分享*/}
                <Share/>

            </div>
        )
    }
}