import React,{ Component } from 'react';
import { Select } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
//import 'moment/locale/zh-cn';

//import { Link } from 'react-router-dom';
import './style.scss';
import Header from '../../../../components/header';
import Title from '../../../../components/title';
import { fetchPost } from "../../../../fetch/fetch";
import api from '../../../../utils/interface';
import MyButton from '../../../../components/button';
//import Select from '../../../../components/select';
//import { fetchDynamic } from '../../../../utils/utils';
//import Modal from '../../../../components/modal';
import Message from "../../../../components/message";

const Option = Select.Option;
class RejectEdit extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id:props.match.params.id,
            details:{},
            businessId:'',
            businessCode:'',
            thDate:'',
            storeCode:'',
            storeName:'',
            quality:'',
            reason:'',
            processingInstructions:'',
            remark:'',
            openModal:false,
        }
    }

    componentDidMount () {
        this.fetchDetails();
        
    }
    handleReasonChange = (e) => {
        console.log(e)
        this.setState({
            reason: e
        })
        console.log("reason::"+this.state.reason)
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
    // 选择时间回调
    handleDateChange = (value,dateString) => {
        this.setState({
            thDate:dateString
        })
    }
    handleMethodChange = (e) => {
        this.setState({
            processingInstructions:e
        })
    }
    handleTextareaChange = (e) => {
        this.setState({
            remark:e.target.value
        })
    }
    //取消
    onReturn = () => {
        this.props.history.push('/m/business/rejecting');
    }
    //编辑
    onEdit = () => {
        const params = {
            subservice: "editJS",
                params: {
                    id:this.state.id,
                    businessId:this.state.businessId,
                    businessCode:this.state.businessCode,
                    thDate:this.state.thDate,
                    storeCode:this.state.storeCode,
                    storeName:this.state.storeName,
                    quality:this.state.quality,
                    reason:this.state.reason,
                    processingInstructions:this.state.processingInstructions,
                    remark:this.state.remark
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
                this.props.history.push('/m/business/rejecting');
            }
        })
        
    }

    // 订单详情
    fetchDetails = () => {
        const params = {
            subservice:"orderInfo",
            params:{
                orderid:this.state.id
            }
        }
        fetchPost(api.afterSale,params).then(res => {
            const code = res.code;
            if(code === '1000') {

                this.setState({
                    businessId:res.data.businessId,
                    businessCode:res.data.businessCode,
                    thDate:(res.data.thDate || ""),
                    storeCode:res.data.storeCode,
                    storeName:(res.data.storeCode==="JX" || "米阳嘉兴仓"),
                    quality:res.data.quality,
                    reason:res.data.reason,
                    processingInstructions:res.data.processingInstructions,
                    remark:res.data.remark,
                    details:res.data
                })
                
            }
        })
        
    }

    render () {
        const {details} = this.state;
       // const {onChange} = this.props;
        //console.log(this.state.thDate)
        const DatePicker1 = () => {
           return <DatePicker defaultValue={moment(this.state.thDate,"YYYY-MM-DD")} onChange={this.handleDateChange} />
        }
        const SelectReason = (reason) => {
            return (
                details.outOrderStaus===7 ? 
                <Select defaultValue={this.state.reason} value={this.state.reason} onChange={this.handleReasonChange}>
                    {refuseArr7.length > 0 && refuseArr7.map((item, i) => {
                        return <Option key={i} value={item.id}>{item.name}</Option>
                    })}
                </Select> : <Select defaultValue={this.state.reason} value={this.state.reason} onChange={this.handleReasonChange}>
                    {refuseArr.length > 0 && refuseArr.map((item, i) => {
                        return <Option key={i} value={item.id}>{item.name}</Option>
                    })}
                </Select>
            )
        }
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
        const Method = () => {
            return (
                <Select defaultValue={this.state.processingInstructions} value={this.state.processingInstructions} onChange={this.handleMethodChange}>
                    {methodArr.length > 0 && methodArr.map((item, i) => {
                        return <Option key={i} value={item.id}>{item.name}</Option>
                    })}
                </Select>
            )
        }
        const TextareaRemark = () => {
            return <textarea value={this.state.remark} onChange={this.handleTextareaChange} />
        }

                                        
        
        return (
            <div className="m-reject-edit-wrap">
                <Header/>
                <div className="m-reject-edit-inner">
                    <Title title="拒收单编辑" subTitle={{assgin1:'拒收单',assgin2:'拒收单编辑',Link:'/m/business/rejecting'}}/>

                    <div className="reject-edit-content">
                        <div class="edit-main-info">
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
                                        <span>处理日期：</span>
                                       
                                        <DatePicker1 />
                                    </div>
                                    
                                </li>
                                
                                
                                
                            </ul>
                        </div>
                        <div class="edit-reject-info">
                            <ul>
                                <li>
                                    <div className="input-wrap clearfix">
                                        <span>拒收原因：</span>
                                        <SelectReason reason={this.state}/>
                                        
                                    </div>

                                </li>
                                <li>
                                    <div className="input-wrap clearfix">
                                        <span>处理方式：</span>
                                        <Method />
                                        
                                    </div>
                                    
                                </li>
                                <li>
                                    <div className="input-wrap clearfix">
                                        <span>补充说明：</span>
                                        <TextareaRemark />
                                    </div>
                                </li>
                            </ul>
                        </div>
                            
                        <div>

                            {details.orderStatus === 0 ?
                                <div className="btn-group">
                                    <MyButton className="m-global-button m-button-default"
                                              HtmlValue="取消"
                                              HtmlType="button"
                                              style={{height:'28px',borderRadius:'2px'}}
                                              onClick={this.onReturn}
                                              />

                                              <MyButton className="m-global-button m-button-primary"
                                              HtmlValue="编辑"
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
const refuseArr = [
    {name:'数量多开',id:'数量多开'},
    {name:'单品开错',id:'单品开错'},
    {name:'不方便收货(系统问题、条码没有、老板不在等)',id:'不方便收货(系统问题、条码没有、老板不在等)'},
    {name:'价格有异议',id:'价格有异议'},
    {name:'送货超市/未预约/资料不全',id:'送货超市/未预约/资料不全'},
    {name:'产品日期不好',id:'产品日期不好'},
    {name:'包装不好/质量问题',id:'包装不好/质量问题'},
    {name:'其他',id:'其他'},
]
const refuseArr7 = [
    {name:'客户取消订单',id:'客户取消订单'},
    {name:'部分出库情况处理',id:'部分出库情况处理'},
    {name:'其他',id:'其他'},
]

const methodArr = [
    {name:'按仓配计出库费,记退货入库费',id:'按仓配计出库费,记退货入库费'},
    {name:'按仓配计出库费,不记退货入库费',id:'按仓配计出库费,不记退货入库费'},
    {name:'按自提计出库费,不记退货入库费',id:'按自提计出库费,不记退货入库费'},
    {name:'按自提计出库费,记退货入库费',id:'按自提计出库费,记退货入库费'},
    {name:'不计出库和退货入库费用',id:'不计出库和退货入库费用'},
]
const storeArr = [
    {name:'米阳嘉兴仓',id:'JX'},
    
]
const qualityArr = [
    {name:'临期品/次品',id:0},
    {name:'正常销售品',id:1},
]

export default RejectEdit;