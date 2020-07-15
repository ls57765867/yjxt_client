import React, {Component} from 'react';

import {getUser, getUserMyFavActivities,getUserMyFavResource} from '../../../api/userApi'
import resource_con_pic_1 from './../../../static/images/resource_con_pic_1.jpg'
import activities_con_pic_1 from './../../../static/images/activities_con_pic_1.jpg'
import {message} from "antd";
import {saveObj} from "../../../tools/cache-tool";
import {Link} from "react-router-dom";
import config from "../../../config/config";
import fav_ico_ed from "../../../static/images/fav_ico_ed.png";
import fav_ico from "../../../static/images/fav_ico.png";

export default class UserFav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_fav_activities: [],
            user_fav_resource:[],

        }
    }

    componentDidMount() {
        this.loadListData()
    }


    loadListData(page_num = 1, page_size = 3) {
        getUserMyFavActivities(page_num, page_size, getUser().id).then((result) => {
            this.setState({
                user_fav_activities: result.data
            },()=>{
                console.log(this.state.user_fav_activities);
            })
        }).catch(err => {
            message.error(err.msg)
        })

        getUserMyFavResource(page_num, page_size, getUser().id).then((result) => {
            this.setState({
                user_fav_resource: result.data
            })
        }).catch(err => {
            message.error(err.msg)
        })
    }

    render() {
        const {user_fav_activities,user_fav_resource} = this.state;
        return (
            <div className="member_right">
                <div className="member_right_title">
                    已收藏的资源
                </div>
                <div className="member_right_content">
                    {
                        user_fav_resource.map((item) => {
                            return (
                                <div className="resource_con" key={item.id}>
                                    <div onClick={(e)=>{
                                        e.preventDefault()
                                        saveObj('user_buy_resource',item)
                                        this.props.history.push('/resource/detail')
                                    }}>
                                        <div className="resource_con_pic">
                                            <img src={config.BASE_URL + item.resource_img}/>
                                        </div>
                                        <div className="resource_con_title">{item.resource_name}</div>
                                        <div className="resource_con_other" style={{float: 'right', marginTop: '-36px'}}>
                                            <span
                                                className="resource_con_other_price">{item.resource_price > 0 ? '￥' + item.resource_price + '.00' : '免费'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="member_right_title">
                    已收藏的活动
                </div>
                <div className="member_right_content">

                    {
                        user_fav_activities.map(item => (
                            <div
                                className="activities_con"
                                key={item.id}
                                onClick={(e)=>{
                                    e.preventDefault()
                                    saveObj('activities',item)
                                    this.props.history.push('/activities/detail')
                                }}
                            >

                                    <div className="activities_con_pic">
                                        <img src={config.BASE_URL + item.activities_img} alt=""/>
                                    </div>
                                    <div className="activities_con_title">{item.activities_name}</div>
                                    <div className="activities_con_other">
                                                    <span
                                                        className="activities_con_other_date">{item.activities_time}</span>
                                        <span
                                            className="activities_con_other_price">{'￥' + item.activities_price}</span>
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


                </div>


            </div>
        )
    }
}