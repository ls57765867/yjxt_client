import React, {Component} from 'react';
import {Pagination, message, Modal} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import Moment from 'moment'


import config from './../../../config/config'

import {
    getJobPre,
    getJobFamily,
    getJobList

} from "../../../api/jobApi";

import {
    isLogin,
    getUserResource,
    getUser,
    favUserResource,
    isUserBuyResource,
    userBuyResource

} from "../../../api/userApi";


import joblife_con_pic_1 from "./../../../static/images/joblife_con_pic_1.jpg";
import joblife_con_other_avatar from "../../../static/images/joblife_con_other_avatar.png";
import fav_ico from "../../../static/images/fav_ico.png";

export default class Resource extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Job_pre: [],
            Job_pre_tag: 0,

            job_family: [],
            job_family_tag: 0,

            job_list: [],
            job_list_count: 0,
        }
    }

    componentDidMount() {
        this.loadOneData();
        this.loadListData();
    }

    /*
     请求分类数据
   */
    loadOneData() {
        getJobPre().then((result) => {
            if (result && result.status === 1) {
                let item = {id: 0, pre_edu_name: '全部'};
                result.data.unshift(item);
                this.setState({
                    Job_pre: result.data
                })
            }
        }).catch((error) => {
            console.log(error);
        });

        getJobFamily().then((result) => {
            if (result && result.status === 1) {
                let item = {id: 0, job_family_name: '全部'};
                result.data.unshift(item);
                this.setState({
                    job_family: result.data
                })
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    /*
      请求资源列表
    */
    loadListData(page_num = 1, page_size = 4) {
        // 1. 获取查询条件的id
        const {Job_pre_tag, job_family_tag} = this.state;

        getJobList(page_num, page_size, Job_pre_tag, job_family_tag).then((result) => {
            if (result && result.status === 1) {
                message.success(result.msg);
                // 更新状态机
                this.setState({
                    job_list: result.data.job_list,
                    job_list_count: result.data.job_count
                });
            } else {
                message.error(result.msg);
            }
        }).catch((error) => {
            message.error(error.msg)
        })
    }


    /*
     点击跳转到资源详情
    */


    render() {
        const {
            Job_pre,
            Job_pre_tag,

            job_family,
            job_family_tag,

            job_list,
            job_list_count,

        } = this.state;
        return (
            <div className="mainwraper">
                <div className="content content01x clearfix">
                    <div className="mainbox clearfix">
                        <div className="catalog__category-container--3Wcuj">
                            <ul>
                                <li className="catalog__category-item--1xiWA">
                                    <div className="catalog__category-name-container--31pkW w100">
                                        <span>学前教师培训：</span>
                                    </div>
                                    <div className="catalog__sub-category-container--396VW w1180">
                                        <ul className="catalog__sub-category-list--2KWmC">
                                            {
                                                Job_pre.map((item) => {
                                                    return (
                                                        <li key={item.id}>
                                                            <a
                                                                className={
                                                                    Job_pre_tag === item.id ? 'catalog__active--LrCRX' : ''
                                                                }
                                                                onClick={() => {
                                                                    this.setState({
                                                                        Job_pre_tag: item.id
                                                                    }, () => {
                                                                        this.loadListData();
                                                                    })
                                                                }}
                                                            >
                                                                {item.pre_edu_name}
                                                            </a>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </li>
                                <li className="catalog__category-item--1xiWA bottom-border">
                                    <div className="catalog__category-name-container--31pkW w100">
                                        <span>家园共育培训：</span>
                                    </div>
                                    <div className="catalog__sub-category-container--396VW w1180">
                                        <ul className="catalog__sub-category-list--2KWmC">
                                            {
                                                job_family.map((item) => {
                                                    return (
                                                        <li key={item.id}>
                                                            <a
                                                                className={
                                                                    job_family_tag === item.id ? 'catalog__active--LrCRX' : ''
                                                                }
                                                                onClick={() => {
                                                                    this.setState({
                                                                        job_family_tag: item.id
                                                                    }, () => {
                                                                        this.loadListData();
                                                                    })
                                                                }}
                                                            >
                                                                {item.job_family_name}
                                                            </a>
                                                        </li>
                                                    )
                                                })
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
                                    <a className="">人气</a>
                                </li>
                            </ul>
                        </div>
                        <div className="sort_right">共有<span className="lm_desc_num">{job_list_count}</span>篇文章，供您选择浏览
                        </div>
                        <div className="joblife_cons no_top">

                            {
                                job_list.map((item) => {
                                    return (
                                        <div className="joblife_con" key={item.id}>
                                            <Link to={
                                                {
                                                    pathname: '/job/detail',
                                                    state: {job: item}
                                                }
                                            }>
                                                <div className="joblife_con_pic">
                                                    <img src={config.BASE_URL + item.job_img}/>
                                                </div>
                                                <div className="joblife_con_title">{item.job_name}</div>
                                                <div className="joblife_con_other">
                                            <span className="joblife_con_other_avatar">
                                                <img src={joblife_con_other_avatar}/>
                                            </span>
                                                    <span className="joblife_con_other_teacher">来自: {item.job_author}</span>
                                                </div>
                                            </Link>
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
                                    total={job_list_count}
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
        )
    }
}