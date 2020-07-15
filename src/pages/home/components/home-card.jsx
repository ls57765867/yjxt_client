import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import resources_cat_ico_1 from './../../../static/images/resources_cat_ico_1.png'
import resources_cat_ico_2 from './../../../static/images/resources_cat_ico_2.png'
import resources_cat_ico_3 from './../../../static/images/resources_cat_ico_3.png'
import resources_cat_ico_4 from './../../../static/images/resources_cat_ico_4.png'

export default class HomeCard extends Component{
    render() {
        return (
            <div className="content content01 clearfix">
                <div className="mainbox clearfix">
                    <Link to={'/activities'} className="resources_cat">
                        <div className="resources_cat_ico">
                            <img src={resources_cat_ico_1} alt=""/>
                        </div>
                        <div className="resources_cat_name">教学活动小助手</div>
                    </Link>
                    <Link to={'/resource'} className="resources_cat">
                        <div className="resources_cat_ico">
                            <img src={resources_cat_ico_2} alt=""/>
                        </div>
                        <div className="resources_cat_name">亲子小学堂</div>
                    </Link>
                    <Link to={'/job'} className="resources_cat">
                        <div className="resources_cat_ico">
                            <img src={resources_cat_ico_3} alt=""/>
                        </div>
                        <div className="resources_cat_name">培训教学</div>
                    </Link>
                    <Link to={'/live'} className="resources_cat">
                        <div className="resources_cat_ico">
                            <img src={resources_cat_ico_4} alt=""/>
                        </div>
                        <div className="resources_cat_name">GT课程</div>
                    </Link>
                </div>
            </div>
        )
    }
}