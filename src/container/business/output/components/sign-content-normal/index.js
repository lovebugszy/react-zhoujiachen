import React,{ Component } from 'react';
import './style.scss';
import { Upload,Icon,Modal } from 'antd';
import Input from '../../../../../components/input';

class SignContentNormal extends Component {
    state = {
        previewVisible:false,
        previewImage:'',
        fileList:[],
        signRemark:'',

    };

    // 关闭查看图片
    handleCancel = () => this.setState({previewVisible:false})

    // 图片查看
    handlePreview = (file) => {
        this.setState({
            previewImage:file.url || file.thumbUrl,
            previewVisible:true,
            fileList:[],
        });
    }

    // 获取图片上传列表
    handleChange = ({fileList}) => {
        this.setState({
            fileList:fileList
        },() => {
            const {onChange} = this.props;
            onChange && onChange(this.state);
        })
    }

    // 签收说明
    handleTextChange = (v) => {
        this.setState({signRemark:v},() => {
            const {onChange} = this.props;
            onChange && onChange(this.state);
        })
    }

    render () {
        const {previewVisible,previewImage,fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" style={{color:'#3385ff',fontSize:'30px'}}/>
                <div className="ant-upload-text">
                    <p style={{color:'#666',fontSize:'14px'}}>上传回单</p>
                    <p style={{color:'#999',fontSize:'12px'}}>最多可上传三张</p>
                </div>
            </div>
        );
        return (
            <div className="sign-content-normal-wrap">
                <div className="uploads clearfix">
                    <span>上传状态：</span>
                    <Upload
                        action="http://testoms.myspzh.com/upload"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                    >
                        {fileList.length >= 3 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{width:'100%'}} src={previewImage}/>
                    </Modal>
                </div>
                <div className="uploads clearfix" style={{marginTop:'60px'}}>
                    <span>签收说明：</span>
                    <span style={{width:'calc(100% - 80px)'}}>
                         <Input type="textarea"
                                placeholder="您最多可输入200字"
                                style={{width:'100%',height:'100px'}}
                                onInputChange={this.handleTextChange}/>
                    </span>
                </div>
            </div>
        )
    }
}

export default SignContentNormal