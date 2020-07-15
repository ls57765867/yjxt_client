import React, {Component} from 'react';

import lives_con_pic_1 from './../../../static/images/live_con_pic_1.jpg'
import subscribe_ico from './../../../static/images/subscribe_ico.png'
import joblife_con_other_avatar from './../../../static/images/joblife_con_other_avatar.png'

export default class UserLive extends Component{
    render() {
        return (
            <div className="member_right">
                    <div className="member_right_title">
                        已购买的直播
                    </div>
                    <div className="member_right_content">
                        <div className="lives_con">
                            <a href="#">
                                <div className="lives_con_pic">
                                    <img src={lives_con_pic_1}/>
                                </div>
                                <div className="lives_con_title">母亲情绪平和是对孩子最好的教育</div>
                                <div className="lives_con_other">
                                    <span className="lives_con_other_date">7月24日16:00直播</span>
                                    <span className="lives_con_other_subscribe">订阅</span>
                                    <span className="lives_con_other_subscribe_ico">
                                        <img src={subscribe_ico}/>
                                    </span>
                                </div>
                                <div className="lives_con_tags">
                                    <span className="lives_con_tags_avatar">
                                        <img src={joblife_con_other_avatar}/>
                                    </span>
                                    <span className="lives_con_tags_teacher">来自：刘晶波教授</span>
                                </div>
                            </a>
                        </div>
                    <div
                        className="page-boxs clearfix"
                        style={{marginLeft: '290px', marginBottom: '50px'}}
                    >
                        <div className="page-listx">
                            <ul id="yw0" className="yiiPager">
                                <li className="page"><a href="#">首页</a></li>
                                <li className="page"><a href="#">上一页</a></li>
                                <li className="page selected"><b>1</b></li>
                                <li className="page"><a href="#">2</a></li>
                                <li className="page"><a href="#">3</a></li>
                                <li className="page"><a href="#">4</a></li>
                                <li className="page"><a href="#">5</a></li>
                                <li className="page"><a href="#">下一页</a></li>
                                <li className="page"><a href="#">末页</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}