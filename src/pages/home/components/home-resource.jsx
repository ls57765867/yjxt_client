import React, {Component} from 'react';

import resource_con_pic_1 from './../../../static/images/resource_con_pic_1.jpg'
import fav_ico_ed from './../../../static/images/fav_ico_ed.png'
import {withRouter,Link} from 'react-router-dom'
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {
    favUserResource,
    getUser,
    getUserResource,
    isLogin,
    isUserBuyResource,
    userBuyResource
} from "../../../api/userApi";
import {message, Modal} from "antd";
import Moment from "moment";
import {getResourceList} from "../../../api/resourceApi";
import config from "../../../config/config";
import fav_ico from "../../../static/images/fav_ico.png";
import {saveObj} from "../../../tools/cache-tool";


 class HomeResource extends Component {
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
        this.loadListData();
        this.loadUserFavResource();
    }

    /*
      请求资源列表
    */
    loadListData(page_num = 1, page_size = 4) {
        // 1. 获取查询条件的id
        const {resource_category_tag, resource_classes_tag, resource_area_tag, resource_meta_tag, resource_format_tag} = this.state;

        getResourceList(page_num, page_size, resource_category_tag, resource_classes_tag, resource_area_tag, resource_meta_tag, resource_format_tag).then((result) => {
            if (result && result.status === 1) {
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
                        saveObj('user_buy_resource', resource)
                        this.props.history.push('/resource/detail')
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
                                            content: result.msg,
                                            duration: 5
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


            resource_list,
            resource_list_count,

            user_resource_id // 收藏的资源数组
        } = this.state;
        return (
            <div className="content content01 clearfix">
                <div className="mainbox clearfix">
                    <div className="lm_title">幼教资源</div>
                    <div className="lm_desc">共有<span className="lm_desc_num">{resource_list_count}</span>条资源，供您选择学习
                    </div>
                    <Link to={'/resource'} className="lm_more">
                        <span className="lm_more_ico"/>
                        <span  className="lm_mores">查看更多</span>
                    </Link>
                    <div className="resource_cons">
                        {
                            resource_list.map((item, index) => {
                                if (index < 4) {
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
                                }

                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(HomeResource)