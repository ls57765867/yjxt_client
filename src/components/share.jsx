import React, {Component} from 'react';

export default class Share extends Component{
    render() {
        return (
            <div id="rig_box">
                <div className="edu-widgets">

                    <div className="g-top" title="返回顶部" style={{marginTop: 1}}>
                        <a href="#" title="返回顶部">
                            <i className="tab-ico" />
                            <em className="tab-text">回到顶部</em>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}