import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom'
import live_con_pic_1 from './../../../static/images/live_con_pic_1.jpg'
import live_con_other_avatar from './../../../static/images/live_con_other_avatar.png'
import subscribe_ico from './../../../static/images/subscribe_ico.png'
import {getLiveList} from "../../../api/liveApi";
import {message} from "antd";
import config from "../../../config/config";
import joblife_con_other_avatar from "../../../static/images/joblife_con_other_avatar.png";

class HomeLive extends Component {
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
        this.loadListData()
    }

    loadListData = (page_num = 1, page_size = 4) => {
        let {live_person_tag, live_theme_tag} = this.state
        getLiveList(page_num, page_size, live_person_tag, live_theme_tag).then((result) => {
            if (result && result.status === 1) {
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
        const {live_list,live_list_count} = this.state
        return (
            <div className="content content01 clearfix">

                <div className="mainbox clearfix">
                    <div className="lm_title">直播课堂</div>
                    <div className="lm_desc">共有<span className="lm_desc_num">{live_list_count}</span>场直播，供您选择学习</div>
                    <Link to={'/live'} className="lm_more">
                        <span className="lm_more_ico"/>
                        <span className="lm_mores">查看更多</span>
                    </Link>
                    <div className="lives_cons ">
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
                </div>
            </div>
        )
    }
}

export default withRouter(HomeLive)