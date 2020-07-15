import React from 'react'
import {Button} from 'antd'

import "./not-found.css"

export default class NotFound extends React.Component{
    render() {
        return (
            <div className="not-found">
                 <Button type="primary" onClick={()=> this.props.history.replace('/')}>回到首页</Button>
            </div>
        )
    }
}