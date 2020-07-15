import React, {Component} from 'react';
import {message, Modal} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';

import {Switch, NavLink, Link} from 'react-router-dom'

import {getObj, removeObj} from "../../../tools/cache-tool";
import {getActivitiesDetail, userFavActivities} from "../../../api/activitiesApi";
import config from '../../../config/config'
import {getUser, isLogin, isUserBuyActivities, userBuyActivities} from "../../../api/userApi";
import Moment from "moment";

export default class ActivitiesDetail extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            activities: {}, // 活动内容
            activities_dataList: [],
            isLoading: false,
            activities_tag: '',


            //临时的垃圾代码 表示地区等
            activities_address: ['北京', '上海', '南京', '杭州', '深圳'],
            activities_object: ['托班 (2-3岁)', '小班 (3-4岁)', '中班 (4-5岁)', '大班 (5-6岁)'],
            activities_navList: ['课程介绍', '行程安排', '开营日期', '报名须知'],
            activities_navTag: 0,
            activities_navLink: ["activities_intro", 'activities_trip', 'activities_days', 'activities_notice']
        }
    }

    componentDidMount() {
        let activities = getObj('activities')
        // 1. 拦截
        if (activities.id === undefined) {

            this.setState = () => false;
            this.props.history.goBack();
            return
        } else {
            this.setState({
                activities
            }, () => {
                this.getListData(activities)
                this.setState({
                    isLoading: true,
                })
            })

        }

    }

    getListData(activities) {
        // 2. 请求下载的资源
        getActivitiesDetail(activities.id).then((result) => {
            if (result && result.status === 1) {
                this.setState({
                    activities_dataList: result.data[0],
                    activities_tag: result.data[0].activities_tag
                },()=>{
                    console.log(this.state.activities_dataList);
                })
            }
        }).catch((error) => {
            message.error('111');
        })
    }

    componentWillUnmount() {
        removeObj('activities')
    }


    /* //更新views + 1
     updateResourceViewsCount(resource.id).then((result) => {
         if (result && result.status === 1) {
             message.success(result.msg)
         } else if (result && result.status === 0) {
             message.error(result.msg)
         }
     }).catch((error) => {
         message.error(error)
     })*/

    /**
     * activities_address_id: 2
     activities_bus_day_id: 7
     activities_days: "<p>阿达大厦的</p><div class="media-wrap image-wrap"><img class="media-wrap image-wrap" src="http://localhost:5000/upload/images/activities/1592553082548.jpg"/></div><p></p>"
     activities_img: "/upload/images/activities/1592553924078.png"
     activities_intro: "<p>阿达</p><p></p><div class="media-wrap image-wrap"><img class="media-wrap image-wrap" src="http://localhost:5000/upload/images/activities/1592553757631.jpg"/></div><p></p><p>阿达</p>"
     activities_name: "北京小活动02"
     activities_notice: "<p>啊实打实</p><p></p><p></p>"
     activities_object_id: 4
     activities_price: 2
     activities_tag: "嘿嘿,吼吼"
     activities_time: "2020-06-19 15:50:49"
     activities_trip: "<p></p><div class="media-wrap image-wrap"><img class="media-wrap image-wrap" src="http://localhost:5000/upload/images/activities/1592553751957.png"/></div><p>啊实打实大师</p><p></p><p></p>"
     buy_count: 200
     focus_img: "/upload/images/activities/1592553925805.jpg"
     id: 4

     */

    favActivities = () => {
        if (isLogin()) {
            let acitvities_id = this.state.activities_dataList.id
            userFavActivities(getUser().id, acitvities_id).then((result) => {
                if (result && result.status === 1) {
                    message.success(result.msg)
                } else {
                    message.success(result.msg)
                }
            }).catch((err) => {
                message.error(err.msg)
            })
        }else {
            Modal.confirm({
                title: '还没有登录?',
                icon: <ExclamationCircleOutlined/>,
                content: '您还没有登录, 登录后才能进行收藏!',
                okText: '立即登录',
                cancelText: '取消',
                onOk: () => {
                    this.props.history.push('/login');
                }
            })
        }

    }

    toResourceDetail = (activities) => {

        // 2. 判断是否已经登录
        if (isLogin()) {
            // 2.1 判断当前用户是否已经购买了该资源
            isUserBuyActivities(getUser().id, activities.id).then((result) => {
                // console.log(activities);
                if (result && result.status === 1) { // 已经购买
                    message.success('您已购买了此资源!')
                } else { // 没有购买
                    Modal.confirm({
                        title: '是否购买此资源?',
                        icon: <ExclamationCircleOutlined/>,
                        content: `该资源的价格是¥${activities.activities_price}元 (暂未收到甲方申请的微信支付商户号,故无法实际支付,您可以直接选择下单) !`,
                        okText: '确认下单',
                        cancelText: '我在想想',
                        onOk: () => {
                            console.log(activities.id);
                            console.log(activities.activities_price);
                            console.log(Moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
                            userBuyActivities(getUser().token, getUser().id, activities.id, activities.activities_price, Moment(new Date()).format('YYYY-MM-DD HH:mm:ss')).then((result) => {
                                if (result && result.status === 1) {
                                    message.success({
                                        content:result.msg,
                                        duration:5
                                    });

                                } else {
                                    message.error(result.msg);
                                }
                            }).catch((error) => {
                                message.error(error.msg);
                            })
                        }
                    })
                }
            }).catch((error) => {
                console.log(error);
            })
        } else { // 没有登录
            Modal.confirm({
                title: '还没有登录?',
                icon: <ExclamationCircleOutlined/>,
                content: '您还没有登录, 登录后才能报名!',
                okText: '立即登录',
                cancelText: '取消',
                onOk: () => {
                    this.props.history.push('/login');
                }
            })
        }

    };

    render() {
        const {activities,activities_dataList, isLoading, activities_tag, activities_address, activities_object, activities_navList, activities_navTag, activities_navLink} = this.state;
        return (
            <div className="mainwraper">
                <div className="content content01y clearfix">
                    <div className="mainbox clearfix">
                        <div className="here_url">
                            <Link to={'/'}>幼教服务系统 > </Link>
                            <Link to={'/activities'}>活动专区 > </Link>
                            <span>正文</span>

                        </div>
                        <div className="resource_cons no_top">
                            <div className="img_loop_box">
                                <div id="picBox" className="picBox">
                                    <img src={config.BASE_URL + activities_dataList.activities_img}
                                         style={{width: '100%'}}/>
                                </div>
                            </div>
                            <div id="detail_main_info">
                                <h3><b id="title">{activities_dataList.activities_name}</b></h3>
                                <div className="other clearfix">
                                    <div className="tag">
                                        {
                                            activities_tag.split(',').map((item) => (
                                                <span className="shux" key={item.id}>{item}</span>
                                            ))
                                        }

                                    </div>
                                    <div className="time">
                                        <span><label>发布时间：</label>{activities_dataList.activities_time}</span></div>
                                </div>
                                <div className="price_area">
                                    <span>{activities_dataList.activities_price}</span>元/人
                                </div>
                                <div className="para para_s">
                                    <ul className="clearfix">
                                        <li>
                                            活动地点：<span>{activities_address[activities_dataList.activities_address_id - 1]}</span>
                                        </li>
                                        <li>
                                            招生对象：<span>{activities_object[activities_dataList.activities_object_id - 1]}</span>
                                        </li>
                                        <li>
                                            行程天数：<span>{activities_dataList.activities_bus_day_id}天</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div id="trans_anniu">
                                <div
                                    className="sc"
                                    onClick={() => {
                                        this.favActivities()
                                    }}
                                >
                                    <div className="icon"><span></span></div>
                                    收&nbsp;藏
                                </div>
                            </div>
                        </div>
                        <div className="resource_cons">
                            <div className="resource_cons_nav">

                                {
                                    activities_navList.map((item, index) => (
                                        <div
                                            className={activities_navTag === index ? "resource_cons_nav_l resource_cons_nav_active" : 'resource_cons_nav_l'}
                                            key={index}
                                            onClick={() => {
                                                this.setState({
                                                    activities_navTag: index
                                                })
                                            }}
                                        >{item}</div>
                                    ))
                                }

                                <div
                                    className="resource_cons_nav_r"
                                    onClick={()=>{
                                        this.toResourceDetail(activities)
                                    }}
                                >立即报名</div>
                            </div>
                        </div>
                        <div className="resource_cons">
                            <div className="resource_cons_hdcon">

                                <div className="resource_cons_hdcon_nav">{activities_navList[activities_navTag]}</div>
                                {
                                    activities_navLink.map((item, index) => (
                                        <div
                                            key={index}
                                            className="resource_cons_hdcon_con"
                                            dangerouslySetInnerHTML={activities_navTag === index ? {__html: activities_dataList[activities_navLink[activities_navTag]]} : {__html: ''}}
                                            style={activities_navTag === index ? {marginBottom: 100} : {}}
                                        >

                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}