import React, {Component} from 'react';
import banner from './../../../static/images/banner.jpg'
import {Carousel} from 'antd';
import {getSowing} from '../../../api/userApi'
import config from '../../../config/config'

export default class HomeSowing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sowing_list: [],
        }
    }

    componentDidMount() {
        getSowing().then(result => {
            let newArr = result.data.filter(item => item.length > 0)
            this.setState({
                sowing_list: newArr
            }, () => {
                console.log(this.state.sowing_list);
            })
        })
    }

    render() {
        const {sowing_list} = this.state
        return (
            <div className="mainWrap clearfix">
                <div className="banner_page">
                    <Carousel autoplay effect="fade" style={{cursor: "pointer"}}>
                        {
                            sowing_list.map((item, index) => (
                                item.map(item => {
                                    return (
                                        <div key={index}>
                                            <img src={config.BASE_URL + item.focus_img}
                                                 style={{width: '100%', height: '400px'}} alt=""/>

                                        </div>
                                    )
                                })

                            ))
                        }


                    </Carousel>


                    {/*<ul className="banner_box">
                        <li
                            className="one"
                            style={{background: "url("+ banner +") no-repeat top center"}}>
                            <a href="#" target="_blank" />
                        </li>
                    </ul>
                    <ul className="btn_list clearfix">
                        <li className="on"></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>*/}
                </div>
            </div>
        )
    }
}