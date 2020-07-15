import {Upload, message} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import config from "../../../config/config";
import React from "react";


class UpLoadImg extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            img_icon: '',
            imgAlt: this.props.image,
            imgName: this.props.imgName,
            upLoadCallBack: this.props.upLoadCallBack,
            upLoadAction: this.props.upLoadAction,
            upLoadBtnTitle:this.props.upLoadBtnTitle,
        };
    }


    componentWillReceiveProps(nextProps, nextContext) {

        // console.log(nextProps);
        if(nextProps.img_icon){
            this.setState({
                img_icon: nextProps.img_icon
            })
        }

    }

    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('上传文件格式错误!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('上传图片大小不超过2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done' && info.file.response.status === 1) {
            let name = info.file.response.data.name
            this.props.upLoadCallBack(name);
            this.setState({
                loading: false,
                img_icon: name,
            });

        }
    };

    render() {
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined/> : <PlusOutlined/>}
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <Upload
                name={this.state.imgName}
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={this.state.upLoadAction}
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
            >
                {this.state.img_icon ?
                    <img src={config.BASE_URL + this.state.img_icon} alt={this.state.imgAlt}
                         style={{width: '140px',height:'140px',borderRadius:'50%'}}/> : uploadButton}
            </Upload>
        );
    }
}

export default UpLoadImg;
