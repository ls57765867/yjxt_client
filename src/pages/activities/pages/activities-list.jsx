import React, {Component} from 'react';
import {message, Pagination} from 'antd'
import {Link} from 'react-router-dom'

import banner_activity from "../../../static/images/banner_activity.jpg";
import activities_con_pic_1 from "../../../static/images/activities_con_pic_1.jpg";
import config from '../../../config/config'

import {
    getActivitiesAddress,
    getActivitiesObject,
    getActivitiesBus,
    getActivitiesList
} from '../../../api/activitiesApi'
import {saveObj} from "../../../tools/cache-tool";

export default class ActivitiesList extends Component {
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
        this.loadOneData();
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

    loadOneData() {
        getActivitiesAddress().then((result) => {
            if (result && result.status === 1) {
                let item = {id: 0, activities_address: '全部'};
                result.data.unshift(item);
                this.setState({
                    activities_address: result.data
                })
            }
        }).catch((error) => {
            console.log(error);
        });

        getActivitiesObject().then((result) => {
            if (result && result.status === 1) {

                let item = {id: 0, activities_object: '全部'};
                result.data.unshift(item);
                this.setState({
                    activities_object: result.data
                })
            }
        }).catch((error) => {
            console.log(error);
        });

        getActivitiesBus().then((result) => {
            if (result && result.status === 1) {
                let item = {id: 0, activities_bus_day: '全部'};
                result.data.unshift(item);
                this.setState({
                    activities_bus: result.data
                })
            }
        }).catch((error) => {
            console.log(error);
        });

    }

    render() {
        const {activities_address, activities_address_tag, activities_object, activities_object_tag, activities_bus, activities_bus_tag, activities_list, activities_list_count} = this.state
        return (
            <div>
                <div className="mainWrap clearfix">
                    <div className="banner_pagex">
                        <ul className="banner_box">
                            <li className="one"
                                style={{background: "url(" + banner_activity + ") no-repeat top center"}}>
                                <a href="#" target="_blank"/>
                            </li>
                        </ul>
                    </div>
                </div>
                {/*主面板*/}
                <div className="mainwraper">
                    <div className="content content01x clearfix">
                        <div className="mainbox clearfix">
                            <div className="catalog__category-container--3Wcuj">
                                <ul>
                                    <li className="catalog__category-item--1xiWA">
                                        <div className="catalog__category-name-container--31pkW w100">
                                            <span>活动地点：</span>
                                        </div>
                                        <div className="catalog__sub-category-container--396VW w1180">
                                            <ul className="catalog__sub-category-list--2KWmC">
                                                {
                                                    activities_address.map(item => (
                                                        <li
                                                            key={item.id}
                                                        >
                                                            <a
                                                                className={activities_address_tag === item.id ? 'catalog__active--LrCRX' : ''}
                                                                onClick={() => {
                                                                    this.setState({
                                                                        activities_address_tag: item.id
                                                                    },()=>{
                                                                        this.loadDataList()
                                                                    })
                                                                }}
                                                            >
                                                                {item.activities_address}
                                                            </a>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="catalog__category-item--1xiWA">
                                        <div className="catalog__category-name-container--31pkW w100">
                                            <span>招生对象：</span>
                                        </div>
                                        <div className="catalog__sub-category-container--396VW w1180">
                                            <ul className="catalog__sub-category-list--2KWmC">
                                                {
                                                    activities_object.map(item => (
                                                        <li
                                                            key={item.id}
                                                        >
                                                            <a
                                                                className={activities_object_tag === item.id ? 'catalog__active--LrCRX' : ''}
                                                                onClick={() => {
                                                                    this.setState({
                                                                        activities_object_tag: item.id
                                                                    },()=>{
                                                                        this.loadDataList()
                                                                    })
                                                                }}
                                                            >
                                                                {item.activities_object}
                                                            </a>
                                                        </li>
                                                    ))
                                                }

                                            </ul>
                                        </div>
                                    </li>
                                    <li className="catalog__category-item--1xiWA bottom-border">
                                        <div className="catalog__category-name-container--31pkW w100">
                                            <span>营&nbsp;&nbsp;&nbsp;&nbsp;期：</span>
                                        </div>
                                        <div className="catalog__sub-category-container--396VW w1180">
                                            <ul className="catalog__sub-category-list--2KWmC">
                                                {
                                                    activities_bus.map(item => (
                                                        <li
                                                            key={item.id}
                                                        >
                                                            <a
                                                                className={activities_bus_tag === item.id ? 'catalog__active--LrCRX' : ''}
                                                                onClick={() => {
                                                                    this.setState({
                                                                        activities_bus_tag: item.id
                                                                    },()=>{
                                                                        this.loadDataList()
                                                                    })
                                                                }}
                                                            >
                                                                {item.activities_bus_day}
                                                            </a>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="content content01y clearfix">
                        <div className="mainbox clearfix">
                            <div className="sort_title">
                                <span>排序：</span>
                            </div>
                            <div className="sort_conts">
                                <ul className="sort_conts_ul">
                                    <li>
                                        <a className="">报名量</a>
                                    </li>
                                    <li>
                                        <a className="">最新</a>
                                    </li>
                                    <li>
                                        <a className="">价格</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="sort_right">共有<span className="lm_desc_num">{activities_list_count}</span>项活动，供您选择参加
                            </div>
                            <div className="activities_cons no_top">
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
                            <div className="page-boxs clearfix">
                                <div className="page-listx">
                                    <Pagination
                                        defaultCurrent={1}
                                        pageSize={4}
                                        total={activities_list_count}
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
                </div>
            </div>
        )
    }
}