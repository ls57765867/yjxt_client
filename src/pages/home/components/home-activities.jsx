import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {getActivitiesList} from "../../../api/activitiesApi";
import {message} from "antd";
import {saveObj} from "../../../tools/cache-tool";
import {Link} from "react-router-dom";
import config from "../../../config/config";

 class HomeActivities extends Component{
    constructor(props) {
        super(props);
        this.state = {
            activities_address: [], // 地点
            activities_address_tag: 0,
            activities_object: [], // 对象
            activities_object_tag: 0,
            activities_bus: [], // 营期
            activities_bus_tag: 0,

            activities_list: [],
            activities_list_count: 0,


        }
    }

    componentDidMount() {
        this.loadDataList()
    }

    loadDataList (page_num = 1, page_size = 4) {
        //page_num, page_size, activities_address_id, activities_object_id, activities_bus_day_id
        const {activities_address_tag, activities_object_tag, activities_bus_tag} = this.state
        getActivitiesList(page_num, page_size, activities_address_tag, activities_object_tag, activities_bus_tag).then((result) => {
            this.setState({
                activities_list: result.data.activities_list,
                activities_list_count: result.data.activities_count
            })
        }).catch((error) => {
            message.error(error.msg)
        })
    }
    render() {
        const {activities_list,activities_list_count} = this.state
        return (
            <div className="content content01 clearfix">
                <div className="mainbox clearfix">
                    <div className="lm_title">精彩活动</div>
                    <div className="lm_desc">共有<span className="lm_desc_num">{activities_list_count}</span>条活动，供您选择参加</div>
                    <Link to={'/activities'} className="lm_more">
                        <span className="lm_more_ico" />
                        <span className="lm_mores">查看更多</span>
                    </Link>
                    <div className="activities_cons ">
                        {
                            activities_list.map(item => (
                                <div
                                    className="activities_con"
                                    key={item.id}
                                    onClick={(e)=>{
                                        e.preventDefault()
                                        saveObj('activities',item)
                                        this.props.history.push('/activities/detail')
                                    }}
                                >
                                    <Link to={'activities/detail'}>
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
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(HomeActivities)