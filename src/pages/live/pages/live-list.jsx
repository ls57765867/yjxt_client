import React, {Component} from "react";
import {Link} from 'react-router-dom'
import banner_live from "../../../static/images/banner_live.jpg";
import lives_con_pic_1 from "../../../static/images/lives_con_pic_1.jpg";
import subscribe_ico from "../../../static/images/subscribe_ico.png";
import joblife_con_other_avatar from "../../../static/images/joblife_con_other_avatar.png";
import {getLivePerson, getLiveTheme, getLiveList} from '../../../api/liveApi'

import config from '../../../config/config'
import {message, Pagination} from "antd";

export default class LiveList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            live_person: [],
            live_person_tag: 0,

            live_theme: [],
            live_theme_tag: 0,

            live_list: [],
            live_list_count: 0,
        }
    }

    componentDidMount() {
        this.loadOneData()
        this.loadListData()
    }

    loadOneData() {
        getLivePerson().then((result) => {
            if (result && result.status === 1) {
                let item = {id: 0, live_person_name: '全部'};
                result.data.unshift(item);
                this.setState({
                    live_person: result.data
                })
            }
        }).catch((error) => {
            console.log(error);
        });

        getLiveTheme().then((result) => {
            if (result && result.status === 1) {
                let item = {id: 0, live_theme_title: '全部'};
                result.data.unshift(item);
                this.setState({
                    live_theme: result.data
                })
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    loadListData = (page_num = 1, page_size = 4) => {
        let {live_person_tag, live_theme_tag} = this.state
        getLiveList(page_num, page_size, live_person_tag, live_theme_tag).then((result) => {
            if (result && result.status === 1) {
                message.success(result.msg);
                // 更新状态机
                this.setState({
                    live_list: result.data.live_list,
                    live_list_count: result.data.live_count
                });
            } else {
                message.error(result.msg);
            }
        }).catch((error) => {
            message.error(error.msg)
        })
    }

    render() {
        const {live_person, live_person_tag, live_theme, live_theme_tag, live_list, live_list_count} = this.state
        return (
            <div>
                {/*封面*/}
                <div className="mainWrap clearfix">
                    <div className="banner_pagex">
                        <ul className="banner_box">
                            <li className="one"
                                style={{background: "url(" + banner_live + ") no-repeat top center"}}>
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
                                            <span>适用人群：</span>
                                        </div>
                                        <div className="catalog__sub-category-container--396VW w1180">
                                            <ul className="catalog__sub-category-list--2KWmC">
                                                {
                                                    live_person.map((item, index) => (
                                                        <li
                                                            key={item.id}
                                                            onClick={() => {
                                                                this.setState({
                                                                    live_person_tag: item.id
                                                                }, () => {
                                                                    this.loadListData()
                                                                })
                                                            }}
                                                        >
                                                            <a className={live_person_tag === item.id ? 'catalog__active--LrCRX' : ''}>{item.live_person_name}</a>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="catalog__category-item--1xiWA bottom-border">
                                        <div className="catalog__category-name-container--31pkW w100">
                                            <span>内容主题：</span>
                                        </div>
                                        <div className="catalog__sub-category-container--396VW w1180">
                                            <ul className="catalog__sub-category-list--2KWmC">
                                                {
                                                    live_theme.map((item) => (
                                                        <li
                                                            key={item.id}
                                                            onClick={() => {
                                                                this.setState({
                                                                    live_theme_tag: item.id
                                                                }, () => {
                                                                    this.loadListData()
                                                                })
                                                            }}
                                                        >
                                                            <a className={live_theme_tag === item.id ? 'catalog__active--LrCRX' : ''}>{item.live_theme_title}</a>
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
                                        <a className="">最新</a>
                                    </li>
                                    <li>
                                        <a className="">免费</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="sort_right">共有<span className="lm_desc_num">{live_list_count}</span>场直播
                            </div>
                            <div className="lives_cons no_top">
                                {
                                    live_list.map(item => {

                                        return (
                                            <div className="lives_con">
                                                <a>
                                                    <div
                                                        className="lives_con_pic"
                                                        onClick={()=>{
                                                            window.open(item.live_url)
                                                        }}
                                                    >
                                                        <img src={config.BASE_URL + item.live_img}/>
                                                    </div>
                                                    <div className="lives_con_title">{item.live_title}</div>
                                                    <div className="lives_con_other">
                                                        <span
                                                            className="lives_con_other_date">{item.live_begin_time.substr(5, 5)}日 {item.live_begin_time.substr(10)}开始直播</span>
                                                        <span className="lives_con_other_subscribe_ico">

                                            </span>
                                                    </div>
                                                    <div className="lives_con_tags">
                                            <span className="lives_con_tags_avatar">
                                                <img src={joblife_con_other_avatar} alt=""/>
                                            </span>
                                                        <span
                                                            className="lives_con_tags_teacher">来自：{item.live_author}</span>
                                                    </div>
                                                </a>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <div className="page-boxs clearfix">
                                <div className="page-listx">
                                    <Pagination
                                        defaultCurrent={1}
                                        pageSize={4}
                                        total={live_list_count}
                                        onChange={(page, pageSize) => {
                                            // 重新加载数据
                                            this.loadListData(page, pageSize);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}