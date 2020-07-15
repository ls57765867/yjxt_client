import React, {Component} from 'react';
import {Pagination, message, Modal} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import Moment from 'moment'


import config from './../../../config/config'

import {
    getResourceClasses,
    getResourceMeta,
    getResourceFormat,
    getResourceCategory,
    getResourceArea,
    getResourceList,

} from "../../../api/resourceApi";

import {
    isLogin,
    getUserResource,
    getUser,
    favUserResource,
    isUserBuyResource,
    userBuyResource

} from "../../../api/userApi";


import bannerx from "./../../../static/images/bannerx.jpg";
import fav_ico_ed from "../../../static/images/fav_ico_ed.png";
import fav_ico from "../../../static/images/fav_ico.png";

export default class Resource extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resource_category: [], // 分类
            resource_category_tag: 0,


            resource_classes: [], // 班级
            resource_classes_tag: 0,

            resource_meta: [], // 素材
            resource_meta_tag: 0,

            resource_area: [], //  领域
            resource_area_tag: 0,

            resource_format: [], // 格式
            resource_format_tag: 0,

            resource_list: [],
            resource_list_count: 0,

            // 用户收藏的资源id数组
            user_resource_id: []
        }
    }

    componentDidMount() {
        this.loadOneData();
        this.loadListData();
        this.loadUserFavResource();
    }

    /*
     请求分类数据
   */
    loadOneData() {
        getResourceClasses().then((result) => {
            if (result && result.status === 1) {
                let item = {id: 0, classes_name: '全部'};
                result.data.unshift(item);
                this.setState({
                    resource_classes: result.data
                })
            }
        }).catch((error) => {
            console.log(error);
        });

        getResourceArea().then((result) => {
            if (result && result.status === 1) {
                let item = {id: 0, area_name: '全部'};
                result.data.unshift(item);
                this.setState({
                    resource_area: result.data
                })
            }
        }).catch((error) => {
            console.log(error);
        });

        getResourceCategory().then((result) => {
            if (result && result.status === 1) {
                let item = {id: 0, category_name: '全部'};
                result.data.unshift(item);
                this.setState({
                    resource_category: result.data
                })
            }
        }).catch((error) => {
            console.log(error);
        });

        getResourceFormat().then((result) => {
            if (result && result.status === 1) {
                let item = {id: 0, format_name: '全部'};
                result.data.unshift(item);
                this.setState({
                    resource_format: result.data
                })
            }
        }).catch((error) => {
            console.log(error);
        });

        getResourceMeta().then((result) => {
            let item = {id: 0, mate_name: '全部'};
            result.data.unshift(item);
            if (result && result.status === 1) {
                this.setState({
                    resource_meta: result.data
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
        const {resource_category_tag, resource_classes_tag, resource_area_tag, resource_meta_tag, resource_format_tag} = this.state;

        getResourceList(page_num, page_size, resource_category_tag, resource_classes_tag, resource_area_tag, resource_meta_tag, resource_format_tag).then((result) => {
            if (result && result.status === 1) {
                message.success(result.msg);
                // 更新状态机
                this.setState({
                    resource_list: result.data.resource_list,
                    resource_list_count: result.data.resource_count
                });
            } else {
                message.error(result.msg);
            }
        }).catch((error) => {
            message.error(error.msg)
        })
    }

    /*
      请求用户收藏的资源
    */
    loadUserFavResource() {
        // 1. 必须是用户已经登录
        if (isLogin()) {
            getUserResource(getUser().id).then((result) => {
                let tempArr = [];
                if (result && result.status === 1) {
                    tempArr = result.data.map((item) => {
                        return item.resource_id
                    });
                    this.setState({
                        user_resource_id: tempArr
                    });
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    /*
     收藏和取消收藏
    */
    favResource = (resource_id, e) => {
        // 1. 阻止 默认事件 和 冒泡
        e.preventDefault();
        e.stopPropagation();

        // 2. 判断用户是否登录
        if (!isLogin()) {
            message.warning('请登录后再来收藏!');
            return;
        }

        // 3. 调用
        favUserResource(getUser().id, resource_id).then((result) => {
            if (result && result.status === 1) {
                message.success(result.msg);
                // 重新调用
                this.loadUserFavResource();
            } else {
                message.error('收藏失败!');
            }
        }).catch((error) => {
            message.error(error.msg);
        })
    };

    /*
     点击跳转到资源详情
    */
    toResourceDetail = (resource) => {
        // 1. 该资源是免费还是收费
        if (resource.resource_price === 0) { // 免费
            this.props.history.push({
                pathname: '/resource/detail',
                state: {resource}
            })
        } else { // 不是免费
            // 2. 判断是否已经登录
            if (isLogin()) {
                // 2.1 判断当前用户是否已经购买了该资源
                isUserBuyResource(getUser().id, resource.id).then((result) => {
                    // console.log(result);
                    if (result && result.status === 1) { // 已经购买
                        this.props.history.push({
                            pathname: '/resource/detail',
                            state: {resource}
                        });
                    } else { // 没有购买
                        Modal.confirm({
                            title: '是否购买此资源?',
                            icon: <ExclamationCircleOutlined/>,
                            content: `该资源的价格是¥${resource.resource_price}元 (暂未收到甲方申请的微信支付商户号,故无法实际支付,您可以直接选择下单) !`,
                            okText: '确认下单',
                            cancelText: '我在想想',
                            onOk: () => {
                                userBuyResource(getUser().token, getUser().id, resource.id, resource.resource_price, Moment(new Date()).format('YYYY-MM-DD HH:mm:ss')).then((result) => {
                                    if (result && result.status === 1) {
                                        message.success({
                                            content:result.msg,
                                            duration:5
                                        });
                                        this.props.history.push({
                                            pathname: '/resource/detail',
                                            state: {resource}
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
                    content: '您还没有登录, 登录后才能购买!',
                    okText: '立即登录',
                    cancelText: '取消',
                    onOk: () => {
                        this.props.history.push('/login');
                    }
                })
            }
        }
    };

    render() {
        const {
            resource_category,
            resource_category_tag,

            resource_classes,
            resource_classes_tag,

            resource_meta,
            resource_meta_tag,

            resource_area,
            resource_area_tag,

            resource_format,
            resource_format_tag,

            resource_list,
            resource_list_count,

            user_resource_id // 收藏的资源数组
        } = this.state;
        return (
            <div>
                {/*封面*/}
                <div className="mainWrap clearfix">
                    <div className="banner_pagex">
                        <ul className="banner_box">
                            <li className="one"
                                style={{background: "url(" + bannerx + ") no-repeat top center"}}>
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
                                        <div className="catalog__category-name-container--31pkW">
                                            <span>分类：</span>
                                        </div>
                                        <div className="catalog__sub-category-container--396VW">
                                            <ul className="catalog__sub-category-list--2KWmC">
                                                {
                                                    resource_category.map((item) => {
                                                        return (
                                                            <li key={item.id}>
                                                                <a
                                                                    className={
                                                                        resource_category_tag === item.id ? 'catalog__active--LrCRX' : ''
                                                                    }
                                                                    onClick={() => {
                                                                        this.setState({
                                                                            resource_category_tag: item.id
                                                                        }, () => {
                                                                            this.loadListData();
                                                                        })
                                                                    }}
                                                                >
                                                                    {item.category_name}
                                                                </a>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="catalog__category-item--1xiWA top-border">
                                        <div className="catalog__category-name-container--31pkW">
                                            <span>班级：</span>
                                        </div>
                                        <div className="catalog__sub-category-container--396VW">
                                            <ul className="catalog__sub-category-list--2KWmC">
                                                {
                                                    resource_classes.map((item) => {
                                                        return (
                                                            <li key={item.id}>
                                                                <a
                                                                    className={
                                                                        resource_classes_tag === item.id ? 'catalog__active--LrCRX' : ''
                                                                    }
                                                                    onClick={() => {
                                                                        this.setState({
                                                                            resource_classes_tag: item.id
                                                                        }, () => {
                                                                            this.loadListData();
                                                                        })
                                                                    }}
                                                                >
                                                                    {item.classes_name}
                                                                </a>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="catalog__category-item--1xiWA">
                                        <div className="catalog__category-name-container--31pkW">
                                            <span>领域：</span>
                                        </div>
                                        <div className="catalog__sub-category-container--396VW">
                                            <ul className="catalog__sub-category-list--2KWmC">
                                                {
                                                    resource_area.map((item) => {
                                                        return (
                                                            <li key={item.id}>
                                                                <a
                                                                    className={
                                                                        resource_area_tag === item.id ? 'catalog__active--LrCRX' : ''
                                                                    }
                                                                    onClick={() => {
                                                                        this.setState({
                                                                            resource_area_tag: item.id
                                                                        }, () => {
                                                                            this.loadListData();
                                                                        })
                                                                    }}
                                                                >
                                                                    {item.area_name}
                                                                </a>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="catalog__category-item--1xiWA">
                                        <div className="catalog__category-name-container--31pkW">
                                            <span>素材：</span>
                                        </div>
                                        <div className="catalog__sub-category-container--396VW">
                                            <ul className="catalog__sub-category-list--2KWmC">
                                                {
                                                    resource_meta.map((item) => {
                                                        return (
                                                            <li key={item.id}>
                                                                <a
                                                                    className={
                                                                        resource_meta_tag === item.id ? 'catalog__active--LrCRX' : ''
                                                                    }
                                                                    onClick={() => {
                                                                        this.setState({
                                                                            resource_meta_tag: item.id
                                                                        }, () => {
                                                                            this.loadListData();
                                                                        })
                                                                    }}
                                                                >
                                                                    {item.mate_name}
                                                                </a>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="catalog__category-item--1xiWA bottom-border">
                                        <div className="catalog__category-name-container--31pkW">
                                            <span>格式：</span>
                                        </div>
                                        <div className="catalog__sub-category-container--396VW">
                                            <ul className="catalog__sub-category-list--2KWmC">
                                                {
                                                    resource_format.map((item) => {
                                                        return (
                                                            <li key={item.id}>
                                                                <a
                                                                    className={
                                                                        resource_format_tag === item.id ? 'catalog__active--LrCRX' : ''
                                                                    }
                                                                    onClick={() => {
                                                                        this.setState({
                                                                            resource_format_tag: item.id
                                                                        }, () => {
                                                                            this.loadListData();
                                                                        })
                                                                    }}
                                                                >
                                                                    {item.format_name}
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
                                        <a className="">最多下载</a>
                                    </li>
                                    <li>
                                        <a className="">最新</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="sort_right">共有<span className="lm_desc_num">{resource_list_count}</span>条资源，供您选择学习
                            </div>
                            <div className="resource_cons no_top">
                                {
                                    resource_list.map((item) => {
                                        return (
                                            <div className="resource_con" key={item.id}>
                                                <div onClick={() => this.toResourceDetail(item)}>
                                                    <div className="resource_con_pic">
                                                        <img src={config.BASE_URL + item.resource_img}/>
                                                    </div>
                                                    <div className="resource_con_title">{item.resource_name}</div>
                                                    <div className="resource_con_other">
                                                        <span className="resource_con_other_favico">
                                                        <img
                                                            src={user_resource_id.indexOf(item.id) > -1 ? fav_ico_ed : fav_ico}
                                                            alt=""
                                                            onClick={(e) => this.favResource(item.id, e)}
                                                        />
                                                        </span>
                                                        <span className="resource_con_other_fav">收藏</span>
                                                        <span
                                                            className="resource_con_other_price">{item.resource_price > 0 ? '￥' + item.resource_price + '.00' : '免费'}</span>
                                                    </div>
                                                </div>
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
                                        total={resource_list_count}
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
        )
    }
}