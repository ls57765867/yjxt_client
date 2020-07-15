import React, {Component} from 'react';
import {message} from 'antd'
import {Link} from 'react-router-dom'

import copyright_ico from './../../../static/images/copyright_ico.png'
import view_ico from './../../../static/images/view_ico.png'
import date_ico from './../../../static/images/date_ico.png'

import {getResourceDownloadList, updateResourceViewsCount} from '../../../api/resourceApi'
import config from './../../../config/config'
import {getUser} from "../../../api/userApi";
import {getObj, removeObj} from "../../../tools/cache-tool";

export default class ResourceDetail extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            resource: {}, // 资源内容
            resource_file_arr: [] // 下载文件的数组
        }
    }


    componentDidMount() {
        let buyResource = getObj('user_buy_resource')
        // 1. 拦截
        if (!this.props.location.state && buyResource.id === undefined) {
            this.setState = () => false;
            this.props.history.goBack();
        }

        if (buyResource.id !== undefined) {
            console.log(buyResource);
            this.setState({
                resource: buyResource
            },()=>{
                this.getListData(buyResource)
            })
        }

        if (this.props.location.state) {

            const resource = this.props.location.state.resource;
            console.log(resource);
            this.setState({
                resource
            }, () => {
                this.getListData(resource)
            })

            //更新views + 1
            updateResourceViewsCount(resource.id).then((result) => {
                if (result && result.status === 1) {
                    message.success(result.msg)
                } else if (result && result.status === 0) {
                    message.error(result.msg)
                }
            }).catch((error) => {
                message.error(error)
            })
        }
    }

    getListData(resource){
        // 2. 请求下载的资源
        getResourceDownloadList(resource.resource_content).then((result) => {
            if (result && result.status === 1) {
                this.setState({
                    resource_file_arr: result.data
                })
            }
        }).catch((error) => {
            message.error(error.msg);
        })
    }

    componentWillUnmount() {
        removeObj('user_buy_resource')
    }

    render() {
        const {resource, resource_file_arr} = this.state;
        return (
            <div className="mainwraper">
                <div className="content content01y clearfix">
                    <div className="mainbox clearfix">
                        <div className="here_url">
                            <Link to={'/'}>幼教服务系统 > </Link>
                            <Link to={'/resource'}>幼教资源 > </Link>
                            <span className="here_url_title">下载资源列表</span>
                        </div>
                        <div className="resource_cons no_top">
                            <div className="resource_cons_left">
                                <div className="resource_cons_left_top">
                                    <div className="resource_cons_left_top_title">
                                        {resource.resource_name}
                                    </div>
                                    <div className="resource_cons_left_top_desc">
                                        <div className="resource_cons_left_top_descx">
                                            <img src={copyright_ico}/>来自：{resource.resource_author}
                                        </div>
                                        <div className="resource_cons_left_top_descx">
                                            <img
                                                src={view_ico}/>{resource.resource_views}
                                        </div>
                                        <div className="resource_cons_left_top_descx">
                                            <img src={date_ico}/>{resource.resource_publish_time}
                                        </div>
                                    </div>
                                </div>
                                <div className="resource_cons_left_right">
                                    <h2>点击文字下载你需要的资源:</h2>
                                    {
                                        resource_file_arr.map((file) => {
                                            console.log(file);
                                            let temp = file.url.split('.')[file.url.split('.').length - 1].toLowerCase() //获取后缀
                                            if (temp === 'jpg' || temp === 'png' || temp === 'gif') {
                                                return (
                                                    <p className="one-p" key={file.id}>
                                                        <a
                                                            href={config.BASE_URL + '/' + file.url}
                                                            download={file.name}
                                                            target={"_blank"}
                                                            style={{fontWeight: 'bold', fontSize: 24}}
                                                        >
                                                            {file.name}
                                                        </a>
                                                        <img src={config.BASE_URL + '/' + file.url} alt=""/>
                                                    </p>
                                                )
                                            } else {
                                                return (
                                                    <p className="one-p" key={file.id}>
                                                        <a
                                                            href={config.BASE_URL + '/' + file.url}
                                                            download={file.name}
                                                            target={"_blank"}
                                                        >
                                                            {file.name}
                                                        </a>

                                                    </p>

                                                )
                                            }

                                        })
                                    }
                                </div>
                                <div className="resource_cons_left_bottom">
                                    <div className="comment_box">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}