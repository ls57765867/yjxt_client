import React, {Component} from 'react';
import {getUser, getUserAccountList} from '../../../api/userApi'
import {message, Pagination} from "antd";

export default class UserAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account_list: [],
            account_count: 0,
        }
    }

    componentDidMount() {
        this.loadListData()
    }


    loadListData = (page_num = 1, page_size = 4) => {

        getUserAccountList(page_num, page_size, getUser().id).then((result) => {
            if (result && result.status === 1) {
                message.success(result.msg)
                this.setState({
                    account_list: result.data.account_list,
                    account_count: result.data.account_count
                })
            }

        }).catch((err) => {
            message.error(err.msg)
        })
    }

    render() {
        const {account_list, account_count} = this.state
        console.log(account_list);
        return (
            <div className="member_right">
                <div className="member_right_title">
                    账户明细
                </div>
                <div className="member_right_content" style={{paddingTop: 0}}>

                    {
                        account_list.map(item => (

                            <div className="integral_box" key={item.id}>
                                <div className="integral_box_left">
                                    <span
                                        className={item.account_change_method === 1 ? 'integral_box_name_zc' : 'integral_box_name_cz'}>
                                        {item.account_change_method === 1 ? '支出' : '充值'}
                                    </span>
                                    <span className="integral_box_time">{item.account_change_time}</span>
                                </div>
                                <div className="integral_box_right">
                                    <span
                                        className="integral_box_content">{item.account_change_method === 1 ? '-' + +item.account_change_money : '+' + item.account_change_money}</span>
                                </div>
                            </div>
                        ))
                    }

                    {/*<div className="integral_box">
                        <div className="integral_box_left">
                            <span className="integral_box_name_cz">充值</span><span className="integral_box_time">2020/06/26 14:47:43</span>
                        </div>
                        <div className="integral_box_right">
                            <span className="integral_box_content">+30</span>
                        </div>
                    </div>
                    <div className="integral_box">
                        <div className="integral_box_left">
                            <span className="integral_box_name_zc">支出-购买资源</span><span
                            className="integral_box_time">2020/06/26 14:47:43</span>
                        </div>
                        <div className="integral_box_right">
                            <span className="integral_box_content">-20</span>
                        </div>
                    </div>
                    <div className="integral_box">
                        <div className="integral_box_left">
                            <span className="integral_box_name_cz">充值</span><span className="integral_box_time">2020/06/26 14:47:43</span>
                        </div>
                        <div className="integral_box_right">
                            <span className="integral_box_content">+30</span>
                        </div>
                    </div>
                    <div className="integral_box">
                        <div className="integral_box_left">
                            <span className="integral_box_name_zc">支出-购买资源</span><span
                            className="integral_box_time">2020/06/26 14:47:43</span>
                        </div>
                        <div className="integral_box_right">
                            <span className="integral_box_content">-20</span>
                        </div>
                    </div>*/}

                    <div
                        className="page-boxs clearfix"
                        style={{marginLeft: '290px', marginBottom: '50px'}}
                    >
                        <div className="page-listx">
                            <Pagination
                                defaultCurrent={1}
                                pageSize={4}
                                total={account_count}
                                hideOnSinglePage={true}
                                onChange={(page, pageSize) => {
                                    // 重新加载数据
                                    this.loadListData(page, pageSize)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}