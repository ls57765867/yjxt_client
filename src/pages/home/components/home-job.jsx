import React, {Component} from 'react';
import {withRouter,Link} from 'react-router-dom'

import joblife_con_other_avatar from './../../../static/images/joblife_con_other_avatar.png'
import {getJobList} from "../../../api/jobApi";
import {message} from "antd";
import config from "../../../config/config";

export default class HomeJob extends Component {
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
        this.loadListData();
    }

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

    render() {
        const {
            job_list,
            job_list_count,

        } = this.state;
        return (
            <div className="content content01 clearfix">
                <div className="mainbox clearfix">
                    <div className="lm_title">职场人生</div>
                    <div className="lm_desc">共有<span className="lm_desc_num">{job_list_count}</span>条培训，供您选择学习</div>
                    <Link to={'/job'} className="lm_more">
                        <span className="lm_more_ico"/>
                        <span className="lm_mores">查看更多</span>
                    </Link>
                    <div className="joblife_cons">
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
                </div>
            </div>
        )
    }
}