import React, {Component} from 'react';

import {getUser, userResource} from '../../../api/userApi'
import {message, Pagination} from "antd";
import config from '../../../config/config'
import {saveObj} from "../../../tools/cache-tool";

export default class UserResource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_resource_count: 0,
            user_resource_list: [],
        }
    }

    componentDidMount() {
        this.loadListData()
    }

    loadListData(page_num = 1, page_size = 3) {
        userResource(page_num, page_size, getUser().id).then((result) => {
            if (result && result.status === 1) {
                this.setState({
                    user_resource_count: result.data.user_resource_count,
                    user_resource_list: result.data.user_resource_list
                })
            }
        }).catch((err) => {
            message.error(err)
        })
    }

    render() {
        let {user_resource_count, user_resource_list} = this.state
        return (
            <div className="member_right">
                <div className="member_right_title">
                    已购买的资源
                </div>
                <div className="member_right_content">
                    {
                        user_resource_list.map((item) => (
                            <div
                                className="resource_con" key={item.id}
                                onClick={(e)=>{
                                    e.preventDefault()
                                    saveObj('user_buy_resource',item)
                                    this.props.history.push('/resource/detail')

                                }}
                            >
                                <a href="#">
                                    <div className="resource_con_pic">
                                        <img src={config.BASE_URL + item.resource_img} alt=""/>
                                    </div>
                                    <div className="resource_con_title">{item.resource_name}</div>
                                </a>
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
                                pageSize={3}
                                total={user_resource_count}
                                hideOnSinglePage={true}
                                onChange={(page, pageSize) => {
                                    // 重新加载数据
                                    this.loadListData(page, pageSize);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}