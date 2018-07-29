
import React,{ Component } from 'react';
import { Select } from 'antd';
import { DatePicker } from 'antd';
import { Input } from 'antd';
import Tab from '../../../../components/tabs';
import TabItem from './components/tab-item';
import moment from 'moment';
//import Select from '../../../../components/select';
//import 'moment/locale/zh-cn';

//import { Link } from 'react-router-dom';
import './style.scss';
import Title from '../../../../components/title';
import MyInput from '../../../../components/input';
import { fetchPost } from "../../../../fetch/fetch";
import api from '../../../../utils/interface';
import MyButton from '../../../../components/button';
import Message from "../../../../components/message";
import DetailsTable from './components/single-edit';


const Option = Select.Option;
class DangerEdit extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id:props.match.params.id || false,
            details:{},
            businessCode:'',
            thDate:'',
            storeCode:'',
            storeName:'',
            quality:'',
            reason:'',
            orderCode:'',
            remark:'',
            processingInstructions:'',
            refund:undefined,
            businessName:'', //货主
            businessId:'', //货主id
            goodsList:[],
            selectList: [], // 选择货主列表
            openModal:false,
        }
    }
    componentDidMount () {
        this.fetchDetails();
        this.fetchSelectList();
        // this.fetchGoodList();
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
                    // 价格拼接
                    v.discountPrice = {
                        goodsPrice:v.goodsPrice,
                    }
                })
                this.setState({
                    orderCode:res.data.orderCode,
                    businessId:res.data.businessId,
                    businessCode:res.data.businessCode,
                    businessName:res.data.businessName,
                    thDate:(res.data.thDate || ""),
                    storeCode:res.data.storeCode,
                    storeName:(res.data.storeCode==="JX" || "米阳嘉兴仓"),
                    quality:res.data.quality,
                    reason:res.data.reason,
                    refund:res.data.refund,
                    remark:res.data.remark,
                    processingInstructions:res.data.processingInstructions,
                    goodsList:res.data.goodsList,
                    selectList:[],
                    details:res.data
                })

            }
        })

    }

    // 请求企业列表
    fetchSelectList = () => {
        const params = {
            "subservice": "business",
            "params": {

            }
        }
        fetchPost(api.entrySelectList, params).then(res => {
            console.log(res)
            const code = res.code;
            if (code === "1000") {
                this.setState({
                    selectList: res.data
                })

            }
        })
    }

    handleReasonChange = (e) => {
        console.log(e)
        this.setState({
            reason: e
        })
        console.log("reason:"+this.state.reason)
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
    handleBusinessNameChange = (e) => {
        console.log(e)
        this.setState({
            businessName: e
        })
    }
    // 选择时间回调
    handleDateChange = (value,dateString) => {
        this.setState({
            thDate:dateString
        })
    }
    handleTextareaChange = (e) => {
        this.setState({
            processingInstructions:e.target.value
        })
    }
    onReturn = () => {
        this.props.history.push('/m/business/returnGoods');
    }
    //保存
    onSave = () => {
        const params = {
            subservice: "save",
            params: {
                id: this.state.id,
                orderCode:this.state.orderCode,
                businessId: this.state.businessId,
                businessCode: this.state.businessCode,
                businessName:this.state.businessName,
                thDate: this.state.thDate,
                storeCode: this.state.storeCode,
                storeName: this.state.storeName,
                quality: this.state.quality,
                servType:4,
                reason: this.state.reason,
                refund: this.state.refund,
                remark: this.state.remark,
                goodsList:this.state.goodsList,
                processingInstructions:this.state.processingInstructions
            },
            user: {
                businessid: this.state.businessId,
                code: this.state.businessId
            }
        }
        fetchPost(api.afterSale, params).then(res => {
            const code = res.code;
            if (code === "1000") {
                Message.open('success', res.message, 3000);
                this.props.history.push('/m/business/returnGoods');
            }
        })
    }



    render () {
        // const {onChange} = this.props;
        const {details ,goodsList,selectList ,refund} = this.state;
        const DatePicker1 = () => {
            return <DatePicker defaultValue={moment(this.state.thDate,"YYYY-MM-DD")} value={moment(this.state.thDate,"YYYY-MM-DD")}  onChange={this.handleDateChange} />
        }
        const SelectReason = (reason) => {
            return (
                <Select defaultValue={this.state.reason} value={this.state.reason} onChange={this.handleReasonChange}>
                        {refuseArr7.length > 0 && refuseArr7.map((item, i) => {
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
        const BusinessNameStore = (data) => {
            return (
                <Select defaultValue={this.state.businessName} value={this.state.businessName} onChange={this.handleBusinessNameChange}>
                    {selectList.length > 0 && selectList.map((item, i) => {
                        return <Option key={i} value={item.id}>{item.name}</Option>
                    })}
                </Select>
            )
        }
        const TextareaRemark = () => {
            return <textarea value={this.state.processingInstructions}defaultValue={this.state.processingInstructions}  onChange={this.handleTextareaChange} />
        }

        return (
            <div className="m-reject-edit-wrap">
                <div className="m-reject-edit-inner">
                    {this.state.id?
                        <Title title='编辑货物赔偿订单' subTitle={{assgin1:'货物赔偿单',assgin2:'编辑货物赔偿订单',Link:'/m/business/dangerList'}}/>
                        : <Title title='新增货物赔偿订单' subTitle={{assgin1:'货物赔偿单',assgin2:'新增货物赔偿订单',Link:'/m/business/dangerList'}}/>
                    }
                    <div className="reject-edit-content">
                        <div className="edit-main-info">
                            <ul>
                                <li>
                                    <div className="input-wrap clearfix">
                                        <span>货主企业：</span>
                                        <BusinessNameStore businessName={this.state}/>
                                    </div>

                                </li>
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
                                        <DatePicker1  thDate={this.state}/>
                                        {/*<DatePicker onChange={this.handleDateChange} style={{width:'50%'}}/>*/}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="edit-reject-info">
                            {/*{tables}*/}
                            <DetailsTable goodsList={goodsList}/>
                            {/*<Tab content={<TabItem goodsList={this.state.goodsList}*/}
                                                   {/*onCompletion={this.handleCompletion}/>}*/}
                                 {/*onChange={this.navChange}/>*/}
                        </div>
                        <div className="edit-reject-info">
                            <ul>
                                <li>
                                    <div className="input-wrap clearfix">
                                        <span>赔偿金额：</span>
                                        {
                                            refund !== undefined ?
                                                <MyInput type="number"
                                                         placeholder="请输入金额"
                                                         value={refund}
                                                         style={{
                                                             width:'20%',
                                                             height:'34px'
                                                         }}
                                                         onInputChange={(v) => {
                                                             this.setState({
                                                                 refund:v
                                                             })
                                                         }}/> : ''
                                        }
                                    </div>
                                </li>
                                <li>
                                    <div className="input-wrap clearfix">
                                        <span>赔偿原因：</span>
                                        <SelectReason reason={this.state}/>
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
                            <div className="btn-group">
                                    <MyButton className="m-global-button m-button-default"
                                              HtmlValue="取消"
                                              HtmlType="button"
                                              style={{height:'28px',borderRadius:'2px'}}
                                              onClick={this.onReturn}/>

                                    <MyButton className="m-global-button m-button-primary"
                                              HtmlValue="保存"
                                              HtmlType="button"
                                              style={{height:'28px',borderRadius:'2px'}}
                                              onClick={this.onSave}
                                    />
                                </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
const refuseArr7 = [
    {name:'配送过程商品破损',id:'0'},
    {name:'存储期间破损',id:'1'},
    {name:'其他',id:'2'},
]


const storeArr = [
    {name:'米阳嘉兴仓',id:'JX'},

]
const qualityArr = [
    {name:'临期品/次品',id:0},
    {name:'正常销售品',id:1},
]

export default DangerEdit;