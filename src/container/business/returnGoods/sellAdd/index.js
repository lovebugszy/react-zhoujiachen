
import React,{ Component } from 'react';
import { Upload,Icon,Modal, Select,Table,Input} from 'antd';
import './style.scss';
import Title from '../../../../components/title';
import { fetchPost } from "../../../../fetch/fetch";
import api from '../../../../utils/interface';
import MyButton from '../../../../components/button';
import { DatePicker} from 'antd';
import MyInput from '../../../../components/input';
//import Modal from '../../../../components/modal';
import Message from "../../../../components/message";
import DetailsTable from './components/sell-detail';

const Option = Select.Option;
class SellAdd extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id:props.match.params.id,
            details:{},
            businessId:'',
            businessCode:'',
            dcType:'',
            storeCode:'',
            storeName:'',
            quality:'',
            fileList:[],
            reason:'',
            processingInstructions:'',
            remark:'',
            signRemark:'',
            goodsList:[],
            openModal:false,
        }
    }

    componentDidMount () {
        this.fetchDetails();

    }
    handleStoreChange = (e) => {
        console.log(e)
        this.setState({
            storeCode: e
        })
    }

    handleQualityChange = (e) => {
        console.log(e)
        this.setState({
            quality: e
        })
    }
    handleTextareaChange = (e) => {
        this.setState({
            processingInstructions:e.target.value
        })
    }
    // 选择时间回调
    handleDateChange = (value,dateString) => {
        this.setState({
            thDate:dateString
        })
    }
    handleMethodChange = (e) => {
        this.setState({
            dcType:e
        })
    }

    onInputChange = (v) => {
        this.setState({remark:v},() => {
            const {onChange} = this.props;
            onChange && onChange(this.state);
        })
    }



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


    //取消
    onReturn = () => {
        this.props.history.push('/m/business/returnGoods');
    }
    //编辑
    onEdit = () => {
        const params = {
            subservice: "collectGoods",
            params: {
                id:this.state.id,
                businessId:this.state.businessId,
                businessCode:this.state.businessCode,
                dcType:this.state.dcType,
                storeCode:this.state.storeCode,
                storeName:this.state.storeName,
                quality:this.state.quality,
                reason:this.state.reason,
                goodsList:this.state.goodsList,
                processingInstructions:this.state.processingInstructions,
                remark:this.state.remark,
                signRemark:this.state.signRemark
            },
            user: {
                businessid:this.state.businessId,
                code:this.state.businessId
            }
        }
        fetchPost(api.afterSale,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                Message.open('success',res.message,3000);
                this.props.history.push('/m/business/returnGoods');
            }
        })

    }

    // 订单详情
    fetchDetails = () => {
        const params = {
            subservice: "orderInfo",
            params: {
                orderid: this.state.id
            }
        }
        fetchPost(api.afterSale,params).then(res => {
            const code = res.code;
            console.log(code)
            if(code === '1000') {
                res.data.goodsList.forEach((v,i) => {
                    v.key = i;
                    // 商品信息拼接
                    v.goodsName = {
                        goodsName:v.goodsName,
                        goodsCode:v.goodsCode,
                        goodsSpec:v.goodsSpec,
                        goodsPackage:v.goodsPackage,
                        goodsUnit:v.goodsUnit
                    }
                    // 数量拼接
                    v.planNum = {
                        status:res.data.orderStatus,
                        planNum:v.planNum,
                    }
                    // 价格拼接
                    v.discountPrice = {
                        discountPrice:v.discountPrice,
                        discountRate:v.discountRate
                    }
                })
                this.setState({
                    businessId:res.data.businessId,
                    businessCode:res.data.businessCode,
                    dcType:res.data.dcType ,
                    storeCode:res.data.storeCode,
                    storeName:(res.data.storeCode==="JX" || "米阳嘉兴仓"),
                    quality:res.data.quality,
                    reason:res.data.reason,
                    processingInstructions:res.data.processingInstructions,
                    signRemark:res.data.signRemark,
                    remark:res.data.remark,
                    goodsList:res.data.goodsList,
                    details:res.data
                })

            }
        })

    }

    render () {
        const {onChange} = this.props;
        console.log(onChange)
        const {details ,goodsList,previewVisible, previewImage, fileList,} = this.state;
        console.log(details)
        const uploadButton = (
            <div>
                <Icon type="plus" style={{color:'#3385ff',fontSize:'30px'}}/>
                <div className="ant-upload-text">
                    <p style={{color:'#666',fontSize:'14px'}}>上传回单</p>
                    <p style={{color:'#999',fontSize:'12px'}}>最多可上传三张</p>
                </div>
            </div>
        );

        const SelectStore = (data) => {
            return (
                <Select defaultValue={this.state.storeCode} value={this.state.storeCode} onChange={this.handleStoreChange}>
                    {storeArr.length > 0 && storeArr.map((item, i) => {
                        return <Option key={i} value={item.id}>{item.name}</Option>
                    })}
                </Select>
            )
        }
        const QualityStore = (data) => {
            return (
                <Select defaultValue={this.state.quality} value={this.state.quality} onChange={this.handleQualityChange}>
                    {qualityArr.length > 0 && qualityArr.map((item, i) => {
                        return <Option key={i} value={item.id}>{item.name}</Option>
                    })}
                </Select>
            )
        }
        const DcType = () => {
            return (
                <Select defaultValue={this.state.dcType} value={this.state.dcType} onChange={this.handleMethodChange}>
                    {methodArr.length > 0 && methodArr.map((item, i) => {
                        return <Option key={i} value={item.id}>{item.name}</Option>
                    })}
                </Select>
            )
        }
        const TextareaRemark = () => {
            return <textarea value={this.state.processingInstructions} onChange={this.handleTextareaChange} />
        }



        return (
            <div className="m-reject-edit-wrap">
                <div className="m-reject-edit-inner">
                    <Title title="销售退货单收货" subTitle={{assgin1:'销售退货单',assgin2:'销售退货单收货',Link:'/m/business/returnGoods'}}/>
                    <div className="reject-edit-content">
                        <div className="edit-main-info">
                            <ul>
                                <li>
                                    <div className="input-wrap clearfix">
                                        <span>仓库：</span>
                                        <SelectStore store={this.state}/>
                                    </div>

                                </li>
                                <li>
                                    <div className="input-wrap clearfix">
                                        <span>商品性质：</span>
                                        <QualityStore quality={this.state}/>

                                    </div>

                                </li>
                                <li>
                                    <div className="input-wrap clearfix">
                                        <span>承运方：</span>
                                        <DcType dcType={this.state}/>
                                    </div>

                                </li>
                                {/*<li>*/}
                                {/*<div className="input-wrap clearfix">*/}
                                {/*<span>处理日期：</span>*/}
                                {/*<DatePicker1 />*/}
                                {/*</div>*/}

                                {/*</li>*/}
                            </ul>
                        </div>
                        <div className="edit-reject-info details-table">
                            {/*{tables}*/}
                            <DetailsTable goodsList={goodsList}/>
                            <div className="add-receipt list-item">
                                <Icon type="plus"/>继续添加
                            </div>
                        </div>
                        <div className="edit-reject-info">
                            <ul>
                                <li>
                                    <div className="input-wrap clearfix">
                                        <span>上传退货单：</span>
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
                                </li>
                                <li>
                                    <div className="input-wrap clearfix">
                                        <span>补充说明：</span>
                                        <TextareaRemark/>
                                    </div>

                                </li>
                            </ul>
                        </div>

                        <div>

                            {details.orderStatus == 1 ||
                            details.orderStatus == 5?
                                <div className="btn-group">
                                    <MyButton className="m-global-button m-button-default"
                                              HtmlValue="取消"
                                              HtmlType="button"
                                              style={{height:'28px',borderRadius:'2px'}}
                                              onClick={this.onReturn}
                                    />

                                    <MyButton className="m-global-button m-button-primary"
                                              HtmlValue="确定"
                                              HtmlType="button"
                                              style={{height:'28px',borderRadius:'2px'}}
                                              onClick={this.onEdit}
                                    />
                                </div>
                                : ''}

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const methodArr = [
    {name:'米阳配送',id:0},
    {name:'自提',id:1}

]
const storeArr = [
    {name:'米阳嘉兴仓',id:'JX'},

]
const qualityArr = [
    {name:'临期品/次品',id:0},
    {name:'正常销售品',id:1},
]

export default SellAdd;