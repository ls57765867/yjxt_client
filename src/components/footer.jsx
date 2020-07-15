import React, {Component} from 'react';
import wx from "../static/images/weixin.png";
import xcx from "../static/images/xcx.jpg";
import service_ico from "../static/images/service_ico.png";


export default class Footer extends Component{
    render() {
        return (
           <div>
               <div className="tool-area clearfix">
                   <div className="w1280">
                       <div className="tool_a_l fl">
                           <ul className="clearfix">
                               <li className="first"><h3>帮助中心</h3></li>
                               <li><a href="#">账号管理</a></li>
                               <li><a href="#">积分规则</a></li>
                               <li><a href="#">下载资源</a></li>
                           </ul>
                           <ul className="clearfix">
                               <li className="first"><h3>服务支持</h3></li>
                               <li><a href="#">售后政策</a></li>
                               <li><a href="#">自助服务</a></li>
                               <li><a href="#">相关下载</a></li>
                           </ul>
                           <ul className="clearfix">
                               <li className="first"><h3>入驻平台</h3></li>
                               <li><a href="#">幼儿园入驻</a></li>
                               <li><a href="#">教研室入驻</a></li>
                           </ul>
                           <ul className="clearfix">
                               <li className="first"><h3>关于我们</h3></li>
                               <li><a href="#">加入我们</a></li>
                               <li><a href="#">联系我们</a></li>
                           </ul>
                       </div>
                       <div className="tool_a_r fl">
                           <ul className="clearfix">
                               <li><img src={wx} width="100" height="100"/><p>关注微信公众平台</p></li>
                               <li><img src={xcx} width="100" height="100"/><p>使用幼教小程序</p></li>
                           </ul>
                       </div>
                       <div className="tool_service fr">
                           <div className="service-tel">400-100-5678</div>
                           <div className="service-time">周一至周日 8:00-18:00</div>
                           <div className="service-date"><img src={service_ico}/>24小时在线客服</div>
                       </div>

                   </div>
               </div>
               <div className="footerbar clearfix">
                   <div className="w1280">
                       <p>主办单位：中华人名共和国教育部 运行维护：中央电化教育馆 技术支持：今日教育集团</p>
                       <p style={{marginBottom: 0}}>国家教育资源公共服务平台 版权所有 京ICP备0905918号-3</p>
                   </div>
               </div>
           </div>
        )
    }
}