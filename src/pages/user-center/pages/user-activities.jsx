import React, {Component} from 'react';

import {getUser, userActivities} from '../../../api/userApi'
import {message, Pagination} from "antd";
import {saveObj} from "../../../tools/cache-tool";
import config from '../../../config/config'

export default class UserActivities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_activities_list: [],
            user_activities_count: 0,
        }
    }

    componentDidMount() {
        this.loadListData()
    }

    loadListData(page_num = 1, page_size = 3) {
        userActivities(page_num, page_size, getUser().id).then((result) => {
            if (result && result.status === 1) {
                this.setState({
                    user_activities_count: result.data.user_activities_count,
                    user_activities_list: result.data.user_activities_list
                })
            }
        }).catch((err) => {
            message.error(err)
        })
    }

    render() {
        const {user_activities_count, user_activities_list} = this.state;
        return (
            <div className="member_right">
                <div className="member_right_title">
                    已购买的活动
                </div>
                <div className="member_right_content">
                    {
                        user_activities_list.map(item => (
                            <div
                                className="activities_con"
                                key={item.id}
                                onClick={(e) => {
                                    e.preventDefault()
                                    saveObj('activities', item)
                                    this.props.history.push('/activities/detail')
                                }}
                            >

                                    <div className="activities_con_pic">
                                        <img src={config.BASE_URL + item.activities_img}/>
                                    </div>
                                    <div className="activities_con_title">{item.activities_name}</div>
                                    <div className="activities_con_other">
                                        <span className="activities_con_other_date">活动时间：{item.activities_time}</span>
                                        <span className="activities_con_other_price">￥{item.activities_price}</span>
                                    </div>
                                    <div className="activities_con_tags">
                                        {
                                            item.activities_tag.split(',').map((item) => (
                                                item !== '' ? <span
                                                    className="activities_con_tag"
                                                    key={item.id}
                                                >
                                                                {item}
                                                            </span> : ''
                                            ))
                                        }
                                    </div>
                            </div>
                        ))
                    }


                    <div
                        className="page-boxs clearfix"
                        style={{marginLeft: '290px', marginBottom: '50px'}}
                    >
                        <div className="page-listx">
                            <Pagination
                                defaultCurrent={1}
                                pageSize={4}
                                total={user_activities_count}
                                hideOnSinglePage={true}
                                onChange={(page, pageSize) => {
                                    // 重新加载数据
                                    this.loadDataList(page, pageSize);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}