import React, {Component} from 'react';
import {message} from "antd";


import {regGetPhoneCode, phoneCodeVerify} from '../../../api/userApi'

export default class VerifyPhone extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_phone: '',
            phone_code: '',
            isShowCodeBtn: true,
            countDown: 60, // 倒计时
        }
    }

    getChangeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    /*
      获取手机验证码
    */
    getVerifyCode = () => {
        // 1. 过滤
        const {user_phone} = this.state;
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
            regGetPhoneCode(user_phone).then((result) => {
                if (result && result.status === 1) {
                    message.success({
                        content: `暂无经费开通三方短信服务,模拟随机验证码为: ${result.data.code} , 10分钟内有效!`,
                        duration: 5
                    })
                } else if (result && result.status === 0) {
                    message.error(result.msg)
                }

            });

        } else {
            message.error('手机号码不正确!');
        }

    };

    /*
     提交
    */
    onFinish = (e) => {
        // 1. 阻止默认事件
        e.preventDefault();
        const {user_phone, phone_code} = this.state;
        // 2. 验证手机号码
        if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(user_phone)) {
            message.error('输入的手机号不合法!');
            return;
        }
        // 3. 验证手机验证码
        if (!/^\d{6}$/gi.test(phone_code.trim())) {
            message.error('输入的验证码不合法!');
            return;
        }

        // 4. 调用接口
        phoneCodeVerify(user_phone, phone_code.trim()).then((result) => {
            if (result && result.status === 1) {
                message.success(result.msg);
                // 定向到修改密码页面
                this.props.history.push({
                    pathname: '/forget/reset',
                    state: {user_phone}
                });
            } else {
                message.error(result.msg);
            }
        }).catch((error) => {
            message.error(error.msg)
        });
    };

    render() {
        const {isShowCodeBtn, countDown, user_phone, phone_code} = this.state;
        return (
            <div className="mainwraper">
                <div id="reg_bg">
                    <div className="zczx">
                        <form onSubmit={this.onFinish}>
                            <ul className="user-zc">
                                <dt>
                                    您的账号存在风险,为保障账户安全,修改密码前需要验证身份
                                </dt>
                                <li>
                                    <span className="zc-hm">手机号码</span>
                                    <span className="SignFlow-accountSeperator">&nbsp;</span>
                                    <input
                                        name="user_phone"
                                        id="user_phone"
                                        type="text"
                                        placeholder="请输入手机号码"
                                        className="zc-qsr"
                                        value={user_phone}
                                        onChange={this.getChangeValue}
                                        required
                                    />
                                </li>
                                <li>
                                    <span className="zc-hm">验 证 码</span>
                                    <span className="SignFlow-accountSeperator">&nbsp;</span>
                                    <input
                                        name="phone_code"
                                        id="phone_code"
                                        type="text"
                                        placeholder="请输入6位短信验证码"
                                        className="zc-qsr2 m-code"
                                        value={phone_code}
                                        onChange={this.getChangeValue}
                                        required
                                    />
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
                                    <button
                                        type="submit"
                                        className="zc-rw"
                                        id="btn_submit"
                                        name="submit"
                                        value="确定"
                                        disabled=""
                                    >确定
                                    </button>
                                </dd>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}