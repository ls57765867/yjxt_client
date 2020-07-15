import React, {Component} from 'react';
import {message} from "antd";
import md5 from 'blueimp-md5'

import {resetPassword} from '../../../api/userApi'
import config from './../../../config/config'


export default class VerifyPhone extends Component{
    constructor(props) {
        super(props);

        this.state = {
            user_phone: '', // 用户手机号码
            new_password: '', // 新密码
            c_new_password: '' // 确认新密码
        }
    }

    componentDidMount() {
        // 1. 处理传递过来的数据
        if(!this.props.location.state){
            this.setState = ()=> false;
            this.props.history.goBack();
        }
        if(this.props.location.state){
           const user_phone = this.props.location.state.user_phone;
           if(user_phone){
               this.setState({
                   user_phone
               })
           }
        }
    }

    getChangeValue = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    /*
     提交
    */
    onFinish = (e)=>{
        // 1. 阻止默认事件
        e.preventDefault();

        // 2. 获取数据
        const {user_phone, new_password, c_new_password} = this.state;

        // 3. 验证数据
        if(!new_password || !c_new_password){
            message.error('手机号或密码不能为空!');
            return;
        }
        if(new_password !== c_new_password){
            message.error('两次输入的密码不一致!');
            return;
        }

        // 4. 调用接口
        resetPassword(user_phone, md5(new_password, config.PC_KEY)).then((result)=>{
            if(result && result.status === 1){
                message.success(result.msg);
                // 回到登录界面
                this.props.history.replace('/login');
            }else {
                message.error(result.msg);
            }
        }).catch((error)=>{
            message.error(error.msg);
        });
    };

    render() {
        const {new_password, c_new_password} = this.state;
        return (
            <div className="mainwraper">
                <div id="reg_bg">
                    <div className="zczx">
                        <form onSubmit={this.onFinish}>
                            <ul className="user-zc">
                                <dt>
                                    您的账号存在风险,为保障账户安全, 请重置新密码
                                </dt>
                                <li>
                                    <span className="zc-hm">输入新密码</span>
                                    <span className="SignFlow-accountSeperator">&nbsp;</span>
                                    <input
                                        name="new_password"
                                        id="new_password"
                                        type="password"
                                        placeholder="请输入您的密码"
                                        className="zc-qsr2"
                                        required
                                        value={new_password}
                                        onChange={this.getChangeValue}
                                    />
                                </li>
                                <li>
                                    <span className="zc-hm">确认新密码</span>
                                    <span className="SignFlow-accountSeperator">&nbsp;</span>
                                    <input
                                        type="password"
                                        name="c_new_password"
                                        id="c_new_password"
                                        placeholder="请重复输入您的密码"
                                        className="zc-qsr2"
                                        required
                                        value={c_new_password}
                                        onChange={this.getChangeValue}
                                        />
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