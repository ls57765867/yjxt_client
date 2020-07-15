import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {message} from "antd";
import md5 from 'blueimp-md5';

import TopNav from './../../components/top-nav'
import Footer from './../../components/footer'
import Share from "../../components/share";

import {getPhoneCode, regNewUser} from '../../api/userApi'
import config from '../../config/config'


export default class Register extends Component {
    constructor(props) {
        super(props);

        this.userNameRef = React.createRef();
        this.userPasswordRef = React.createRef();
        this.userCPasswordRef = React.createRef();
        this.userPhoneRef = React.createRef();
        this.phoneCodeRef = React.createRef();

        this.state = {
            isShowCodeBtn: true,
            countDown: 60, // 倒计时
        }
    }

    getVerifyCode = () => {
        // 1. 过滤
        const user_phone = this.userPhoneRef.current.value;
        if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(user_phone)) {
            // 2. 处理按钮的隐藏
            this.setState({
                isShowCodeBtn: !this.state.isShowCodeBtn
            });
            // 3. 倒计时
            let tempCountDown = this.state.countDown;
            this.intervalId = setInterval(() => {
                tempCountDown--;
                this.setState({
                    countDown: tempCountDown
                });
                // 4. 倒计时结束
                if (tempCountDown === 0) {
                    clearInterval(this.intervalId);
                    this.setState({
                        isShowCodeBtn: true,
                        countDown: 60
                    })
                }
            }, 1000);

            // 4. 获取短信验证码
            getPhoneCode(user_phone).then((result) => {
                // console.log(result);
                if(result && result.status === 1){
                    message.success({
                        content: `暂无经费开通三方短信服务,模拟随机验证码为: ${result.data.code} , 10分钟内有效!`,
                        duration: 10
                    })
                }else {
                    message.error(result.msg)
                }
            }).catch((error)=>{
                message.error(error)
            });

        } else {
            message.error('手机号码不正确!');
            this.userPhoneRef.current.value = '';
        }

    };

    /*

     */
    onFinish = (e)=>{
        // 1. 阻止默认事件
        e.preventDefault();
        // 2. 获取输入框中的内容
        const user_name = this.userNameRef.current.value;
        const user_password = this.userPasswordRef.current.value;
        const c_password = this.userCPasswordRef.current.value;
        const user_phone = this.userPhoneRef.current.value;
        const phone_code = this.phoneCodeRef.current.value.replace(/^\s*|\s*$/g,""); //删除两头的空格 //
        //console.log(user_name, user_password, c_password, user_phone, phone_code);
        // 3. 验证数据
        // 3.1 验证会员名
        if(!/^[A-Za-z0-9]+$/.test(user_name)){
            message.error('输入的会员名不合法!');
            return;
        }
        // 3.2 验证手机号码
        if(!/^1(3|4|5|6|7|8|9)\d{9}$/.test(user_phone)){
            message.error('输入的手机号不合法!');
            return;
        }
        // 3.3 验证手机验证码
        if(!/^\d{6}$/gi.test(phone_code)){
            message.error('输入的验证码不合法!');
            return;
        }
        // 3.4 验证密码
        if(user_password !== c_password){
            message.error('两次输入的密码不一致!');
            return;
        }

        // 4. 发起网络请求
        regNewUser(user_name, md5(user_password, config.PC_KEY), user_phone, phone_code).then((result)=>{
            if(result.status === 1){ // 注册成功
                message.success(result.msg);
                // 清除本地原有的用户登录信息, 更新数据
                // todo

                // 重定向到登录界面
                this.props.history.replace('/login');
            }else {
                message.error(result.msg);
            }
        }).catch((error)=>{
            console.log(error);
            message.error(error.message);
        })

    };

    render() {
        const {isShowCodeBtn, countDown} = this.state;
        return (
            <div>
                <TopNav/>
                {/*主要界面*/}
                <div className="mainwraper">
                    <div id="reg_bg">
                        <div className="zczx">
                            <form onSubmit={this.onFinish}>
                                <ul className="user-zc">
                                    <dt>
                                        欢迎您注册网站会员，如果您已有账户，则直接
                                        <Link to={"/login"} className="bluefont">登录</Link>
                                    </dt>
                                    <li>
                                        <span className="zc-hm">会 员 名</span>
                                        <span className="SignFlow-accountSeperator">&nbsp;</span>
                                        <input name="user_name" id="user_name" type="text"
                                               placeholder="会员名应为小写字母(a-z)、数字(0-9)组合" className="zc-qsr" required
                                               ref={this.userNameRef}/>
                                    </li>
                                    <li>
                                        <span className="zc-hm">登录密码</span>
                                        <span className="SignFlow-accountSeperator">&nbsp;</span>
                                        <input name="user_password" id="user_password" type="password"
                                               placeholder="请输入您的密码" className="zc-qsr2" required
                                               ref={this.userPasswordRef}/>
                                    </li>
                                    <li>
                                        <span className="zc-hm">确认密码</span>
                                        <span className="SignFlow-accountSeperator">&nbsp;</span>
                                        <input type="password" name="c_password" id="c_password" placeholder="请重复输入您的密码"
                                               className="zc-qsr2" required ref={this.userCPasswordRef}/>
                                    </li>
                                    <li>
                                        <span className="zc-hm">手机号码</span>
                                        <span className="SignFlow-accountSeperator">&nbsp;</span>
                                        <input name="user_phone" id="user_phone" type="text" placeholder="请输入手机号码"
                                               className="zc-qsr" required ref={this.userPhoneRef}/>
                                    </li>
                                    <li>
                                        <span className="zc-hm">验 证 码</span>
                                        <span className="SignFlow-accountSeperator">&nbsp;</span>
                                        <input name="phone_code" id="phone_code" type="text" placeholder="请输入 6 位短信验证码"
                                               className="zc-qsr2 m-code" required ref={this.phoneCodeRef}/>
                                        <span className="SignFlow-accountSeperator">&nbsp;</span>
                                        <button
                                            type="button"
                                            id="send_scode"
                                            className="zphone"
                                            onClick={this.getVerifyCode}
                                            style={{display: isShowCodeBtn ? '' : 'none'}}
                                        >
                                            获取短信验证码
                                        </button>
                                        <button
                                            type="button"
                                            id="send_scode"
                                            className="zphone"
                                            disabled
                                            style={{color: 'gray', display: isShowCodeBtn ? 'none' : ''}}
                                        >
                                            剩余{countDown}S
                                        </button>
                                    </li>
                                    <dd style={{textAlign: 'center'}}>
                                        <button type="submit"
                                                className="zc-rw"
                                                id="btn_submit"
                                                name="submit"
                                                value="立即注册"
                                                onClick={this.getUser}
                                                disabled="">立即注册
                                        </button>
                                    </dd>
                                </ul>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer/>
                {/*返回顶部和分享*/}
                <Share/>
            </div>
        )
    }
}