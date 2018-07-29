import React,{ Component } from 'react';
import moment from 'moment';
import './style.scss';
import Title from '../../../../components/title';
import { Upload,Icon,Modal,DatePicker,Select } from 'antd';
import MyInput from '../../../../components/input';
import MyButton from '../../../../components/button';
//import Select from '../../../../components/select';
import { fetchPost } from "../../../../fetch/fetch";
import api from '../../../../utils/interface';
import MyModal from '../../../../components/modal';
import RadioAfterSaleList from './components/radio-after-sale-list';
import Message from '../../../../components/message';
const Option = Select.Option;
class Receipt extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id:props.match.params.id,
            reid:props.match.params.reid,
            details:{},
            previewVisible:false,
            previewImage:'',
            fileList:[],
            allUserList:[], // 所有收款人列表
            afterSaleList:[], //销退单列表
            openModal:false,
            search:'',
            radioValue:{}, //销退单选中项
            afterRadioList:[], //退货单列表
            deductMoney:undefined, //抵扣金额
            surchargeMoney:undefined, // 收款金额
            paymentMethod:'',//支付方式'
            payeePeople:'', //收款人姓名
            payeeId:'', //收款人id
            dateString:'',// 收款时间
            actualReceipts:'',// 实收货款
            dRemark:'',// 收款备注
            outOrderTime:'',
        };
    }


    componentDidMount () {
        if(this.state.id){
           this.fetchDetails(); 
        }else if(this.state.reid){
            this.fetchReceiptDetails();
        }
        
        this.fetchAllUser();
    }

    // 详情数据
    fetchDetails = () => {
        const params = {
            subservice:"orderInfo",
            params:{
                orderid:this.state.id
            }
        }
        fetchPost(api.outputDetails,params).then(res => {
            const code = res.code;
            if(code === '1000') {
                console.log("出库单详情",res)
                const afterRadioList = this.state.afterRadioList;
                if(res.data.afterSale !== null) {
                    afterRadioList.push(res.data.afterSale);
                }
                this.setState({
                    details:res.data,
                    afterRadioList:afterRadioList,
                    deductMoney:res.data.deductMoney, //抵扣金额
                    surchargeMoney:res.data.surchargeMoney, // 收款金额
                })
                this.fetchAfterSale()
            }
        })
    }
    // 收款单
    fetchReceiptDetails = () => {
        const params = {
            subservice:"detail",
            params:{
                id:this.state.reid
            }
        }
        console.log(params)
        fetchPost(api.Receivablesorder,params).then(res => {
            const code = res.code;
            console.log("收款单详情1",res)
            if(code === '1000') {
                console.log("res.data.receivablesOrder",res.data.receivablesOrder)
                let afterRadioList = this.state.afterRadioList;
                if(res.data.receivablesOrder !== null) {
                    afterRadioList=res.data.receivablesOrder;
                }
                res.data.orderCode=res.data.outorder[0].orderCode;
                res.data.receiveMoney=res.data.outorder[0].money;
                res.data.goodsNum=res.data.outorder[0].goodsNum;

                res.data.aidClientId=res.data.clientId;
                res.data.clientName=res.data.clientName;
                res.data.id=res.data.orderId;
                res.data.rewriteTime=res.data.outOrderTime;
                let imgObj={},imgArr=[];
                if(res.data.img){
                    for(let v of res.data.img.split(",")){
                        imgObj={
                            uid:v,
                            url:v,
                        }
                        imgArr.push(imgObj);
                    }
                }
                this.setState({
                    details:res.data,
                    afterRadioList:afterRadioList,
                    deductMoney:res.data.otherDeductible, //抵扣金额
                    surchargeMoney:res.data.otherReceivables, // 收款金额
                    paymentMethod:res.data.paymentMethod,//支付方式'
                    payeePeople:res.data.payeePeople, //收款人姓名
                    payeeId:res.data.payeeId, //收款人id
                    dateString:res.data.shDate,// 收款时间
                    actualReceipts:res.data.actualReceipts,// 实收货款
                    dRemark:res.data.remark,// 收款备注
                    //outOrderTime:res.data.outOrderTime,
                    fileList:imgArr,
                    
                })

                this.fetchAfterSale()
            }
        })
    }

    // 查询所有收款人
    fetchAllUser = () => {
        const params = {
            subservice:'allUser',
            params:{}
        }
        fetchPost(api.allUser,params).then(res => {
            const code = res.code;
            console.log("收款人",res)
            if(code === '1000') {
                this.setState({
                    allUserList:res.data
                })
            }
        })
    }

    // 销退单查询
    fetchAfterSale = () => {
        const {details} = this.state;
        const params = {
            subservice:'queryXT',
            params:{
                clientId:details.aidClientId || '',
                clientName:details.clientName,
                search:this.state.search,
            },
            user:{
                businessid:details.businessId,
                code:details.businessCode,
            }
        }
     
        fetchPost(api.afterSale,params,).then(res => {
            const code = res.code;
            console.log("退货单弹框",res)
            if(code === '1000') {
                this.setState({
                    afterSaleList:res.data,
                })
            }
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

    // search字段回调
    handleInputChange = (v) => {
        this.setState({
            search:v
        })
    }

    // 销退单选中项
    handleRadioValue = (v) => {
        this.setState({
            radioValue:v
        })
    }

    // 退货单添加
    handleAddAfterList = () => {
        const {afterRadioList,radioValue} = this.state;
        radioValue.active = true;
        const arr = afterRadioList;
        let idList = [];
        afterRadioList.forEach(v => {
            idList.push(v.orderCode)
        })

        if(idList.indexOf(radioValue.orderCode) === -1) {

            arr.push(this.state.radioValue);
            this.setState({
                afterRadioList:arr,
                openModal:false
            })
        } else {
            this.setState({
                openModal:false
            })
            Message.open('error','不可重复添加退货单',3000);
        }
    }

    // 退货单删除
    handleDeleteAfterList = (v) => {
        const {afterRadioList} = this.state;
        const arr = afterRadioList;
        arr.forEach((item,index) => {
            if(v.orderCode === item.orderCode) {
                arr.splice(index,1)
            }
        })
        this.setState({
            afterRadioList:arr
        })
    }

    // 确认新增收款单

    handleReceivablesorder = () => {
        const {
            deductMoney,
            surchargeMoney,
            paymentMethod,
            payeePeople,
            payeeId,
            dateString,
            details,
            fileList,
            dRemark,
            afterRadioList,
        } = this.state;
        let list=[];
        if(this.state.id){
            list = [{
                orderCode:details.orderCode,
                outthId:details.id,
                goodsNum:details.actualGoodsCount,
                money:details.receiveMoney
            }]
        }else if(this.state.reid){
            console.log("list",details)
            list = [{
                orderCode:details.outorder[0].orderCode,
                outthId:details.outorder[0].outthId,
                goodsNum:details.outorder[0].goodsNum,
                money:details.outorder[0].money
            }]
        }
        
        afterRadioList.forEach(v => {
            
            v.outthId = v.id || v.outthId;
            if(v.orderCode.indexOf('JS') !== -1) {
                v.money = v.goodsMoney === null || v.goodsMoney === undefined || v.goodsMoney === ''?v.money:v.goodsMoney;
                v.goodsNum = v.goodsCount === null || v.goodsCount === undefined || v.goodsCount === ''?v.goodsNum:v.goodsCount;
            } else {
                if(v.orderCode.indexOf('XT') !== -1) {
                    let goodsNum = v.actualGoodsCount !== null || v.actualGoodsCount !== undefined || v.actualGoodsCount !== '' ?
                        v.actualGoodsCount : v.goodsCount
                        v.goodsNum = goodsNum === null || goodsNum === undefined || goodsNum === ''?v.goodsNum:goodsNum;
                } else {
                    v.goodsNum = v.actualGoodsCount === null || v.actualGoodsCount === undefined || v.actualGoodsCount === ''?v.goodsNum:v.actualGoodsCount
                }
                
                let money = v.actualMoney === null || v.actualMoney === undefined || v.actualMoney === '' ?
                    v.refund : v.actualMoney;
                v.money = v.money === null || v.money === undefined || v.money === ''?money:v.money;
            }
            let obj={
                "orderCode":v.orderCode,
                "outthId":v.outthId,
                "money":v.money,
                "goodsNum":v.goodsNum,
            }
            list.push(obj)
        })
        const actualReceipts = sessionStorage.getItem('m-after-money')
        let fileListSrcs = [];
        fileList.forEach(v => fileListSrcs.push(v.response))
        if(paymentMethod === '') {
            Message.open('error','请选择支付方式',2000);
        } else if(!payeePeople || !payeeId) {
            Message.open('error','请选择正确的收款人',2000);
        } else if(dateString === '') {
            Message.open('error','请选择收款时间',2000);
        }
        const params = {
            "subservice":"add",
            "params":{
                "receivables":{
                    "proxyMoney":250,
                    "otherDeductible":deductMoney,
                    "otherReceivables":surchargeMoney,
                    "remark":this.state.dRemark || '',
                    "paymentMethod":paymentMethod,
                    "payeePeople":payeePeople,
                    "payeeId":payeeId,
                    "shDate":dateString,
                    "actualReceipts":actualReceipts,
                    "clientName":details.clientName,
                    "clientId":details.aidClientId,
                    "img1":fileListSrcs.join(','),
                    "orderId":details.id,
                    "businessid":details.businessId,
                    "businessCode":details.businessCode,
                    "receivablesOrder":list,
                    "outOrderTime":details.rewriteTime
                }
            }
        }
        if(this.state.reid){
            params.subservice="update";
            params.params.receivables.id=this.state.reid;
        }
        console.log(params)
        fetchPost(api.Receivablesorder,params).then(res => {
            const code = res.code;
            if(code === '1000') {
                if(this.state.reid){
                    Message.open('success','操作成功',3000);
                    this.props.history.push('/m/business/collectList')
                }else{
                    Message.open('success','新增收款单成功',3000);
                    this.props.history.push('/m/business/output') 
                }
                
            }
        })
    }

    handleClose = () => {
        this.setState({
            openModal:false
        })
    }

    handleOpen = () => {
        this.setState({
            openModal:true
        })
    }

    handleDateChange = (date,dateString) => {
        this.setState({
            dateString:dateString
        })
    }

    render () {
        const {
            previewVisible,
            previewImage,
            fileList,
            details,
            allUserList,
            openModal,
            afterSaleList,
            afterRadioList,
            deductMoney,
            surchargeMoney,
            paymentMethod,
            payeeId,
            dRemark,
        } = this.state;
        console.log("回显图",fileList)
        const uploadButton = (
            <div>
                <Icon type="plus" style={{color:'#3385ff',fontSize:'30px'}}/>
                <div className="ant-upload-text">
                    <p style={{color:'#666',fontSize:'14px'}}>上传回单</p>
                    <p style={{color:'#999',fontSize:'12px'}}>最多可上传三张</p>
                </div>
            </div>
        );
        let total;
        const afterList = afterRadioList.map((v,i) => {
            console.log(afterRadioList,v)
            // let money;
            if(v.orderCode.indexOf('JS') !== -1) {
                if(this.state.id){
                    v.money = v.goodsMoney;
                    v.goodsNum = v.goodsCount
                }else if(this.state.reid){
                    v.money=v.money === null || 
                    v.money === undefined || 
                    v.money === ''?
                    v.goodsMoney:v.money;
                    v.goodsNum = v.goodsNum === null || 
                    v.goodsNum === undefined || 
                    v.goodsNum === ''?
                    v.goodsCount:v.goodsNum;

                }
                
            } else {
                if(this.state.id){
                    v.money = v.actualMoney === null ||
                    v.actualMoney === undefined ||
                    v.actualMoney === '' ?
                        v.refund : v.actualMoney;
                    v.goodsNum = v.actualGoodsCount === null ||
                    v.actualGoodsCount === undefined ||
                    v.actualGoodsCount === '' ?
                        v.goodsCount : v.actualGoodsCount;
                }else if(this.state.reid){
                    v.money=v.money;
                    v.goodsNum = v.goodsNum;
                    if(v.money === null || v.money === undefined || v.money === ''){
                        v.money = v.actualMoney === null ||
                        v.actualMoney === undefined ||
                        v.actualMoney === '' ?
                            v.refund : v.actualMoney;
                        
                        }

                    }
                    if(v.goodsNum === null || v.goodsNum === undefined || v.goodsNum === ''){
                        v.goodsNum = v.actualGoodsCount === null ||
                        v.actualGoodsCount === undefined ||
                        v.actualGoodsCount === '' ?
                            v.goodsCount : v.actualGoodsCount;
                    }
                
            }
            return <div className="list-item output-item xj" key={i}>
                <span>{v.orderCode}</span>
                <span>{v.orderCode.indexOf('JS') !== -1?'实际退货:':'拒收数量:'}<i>{v.goodsNum}件</i></span>
                <span>实际退款：<i>¥{v.money}</i></span>
                <div className={`${v.active ? 'delete' : ''}`} onClick={() => this.handleDeleteAfterList(v)}/>
            </div>
        })
        let arr = [];
        afterRadioList.length > 0 && afterRadioList.forEach((v) => arr.push(v.money));
        let Tmoney = arr.length > 0 && arr.reduce((cur,pre) => Number(cur) + Number(pre));
        total = Number(details.receiveMoney) - Number(Tmoney) - Number(deductMoney) + Number(surchargeMoney)
        total = total < 0 ? `-${Math.abs(total).toFixed(2)}` : total.toFixed(2);
        sessionStorage.setItem('m-after-money',total)
        total = total < 0 ? 0 : total;
        if(this.state.paymentMethod === '未付款'){
            total=0;
            sessionStorage.setItem('m-after-money',total)
        }
        const pay =  methodArr.map((v,i) => {
                                            return <Option key={i} value={v.name}>{v.name}</Option>
                                        })
        const user = allUserList.map((v,i) => {
                    return <Option key={i} value={v.id}>{v.name}</Option>
                })
        console.log("this.state.dateString日期",this.state.dateString)
        const DatePicker1 = () => {
            
                return this.state.dateString?<DatePicker defaultValue={moment(this.state.dateString || '',"YYYY-MM-DD")} onChange={this.handleDateChange} style={{width:'100%'}}/>
                :<DatePicker onChange={this.handleDateChange} style={{width:'100%'}}/>  

        }
        return (
            <div className="m-receipt-wrap">
                {this.state.id?
                    <Title title="新增收款单" subTitle={{assgin1:'出库单',assgin2:'新增收款单',Link:'/m/business/output'}}/>
                    :
                    <Title title="编辑收款单" subTitle={{assgin1:'收款单',assgin2:'编辑收款单',Link:'/m/business/collectList'}}/>
                }
                
                <div className="m-receipt-content">
                    <div className="m-receipt-inner">
                        <div className="list-wrap">
                            <p className="title">添加代收出库单：</p>
                            <div className="list-item output-item">
                                <span>{details.orderCode}</span>
                                <span>实际出库：{details.goodsNum}件</span>
                                
                                <span>订单金额：<i>¥{details.receiveMoney}</i></span>
                            </div>
                            <p className="title">添加退货单：</p>
                            {afterList}
                            <div className="add-receipt list-item" onClick={this.handleOpen}>
                                <Icon type="plus"/>
                            </div>
                            <div className="_m-modal-wrap">
                                <MyModal modalTitle="添加退货单"
                                         style={{width:'540px',height:'85%'}}
                                         openModal={openModal}
                                         buttonFlag
                                         onCancelClick={this.handleClose}
                                         onOkClick={this.handleAddAfterList}>
                                    <div className="search-wrap">
                                        <MyInput type="text"
                                                 placeholder="请输入单号/来源单号/供应商名称"
                                                 className="icon"
                                                 style={{float:'left'}}
                                                 onInputChange={this.handleInputChange}/>
                                        <MyButton className="m-button-primary"
                                                  HtmlValue="查询"
                                                  HtmlType="button"
                                                  onClick={() => {
                                                      this.fetchAfterSale()
                                                  }}/>
                                        <RadioAfterSaleList list={afterSaleList} onClick={this.handleRadioValue}/>
                                    </div>
                                </MyModal>
                            </div>
                            <ul className="list-item ul clearfix">
                                <li>
                                    <p className="title">其他抵扣：</p>
                                    {
                                        deductMoney !== undefined ?
                                            <MyInput type="number"
                                                     placeholder="请输入金额"
                                                     value={deductMoney}
                                                     style={{
                                                         width:'100%',
                                                         height:'34px'
                                                     }}
                                                     onInputChange={(v) => {
                                                         this.setState({
                                                             deductMoney:v
                                                         })
                                                     }}/> : ''
                                    }
                                </li>
                                <li>
                                    <p className="title">其他收款：</p>
                                    {surchargeMoney !== undefined ?
                                        <MyInput type="number"
                                                 placeholder="请输入金额"
                                                 value={surchargeMoney}
                                                 style={{
                                                     width:'100%',
                                                     height:'34px'
                                                 }}
                                                 onInputChange={(v) => {
                                                     this.setState({
                                                         surchargeMoney:v
                                                     })
                                                 }}/> : ''
                                    }
                                </li>
                                <li>
                                    <p className="title">支付方式：</p>
                                    <Select labelInValue value={{key:paymentMethod}} style={{width:'280px'}} onChange={(v) => {
                                            
                                            this.setState({
                                                paymentMethod:v.key
                                            })
                                            
                                        }}>
                                        {pay}
                                        
                                    </Select>
                                    
                                </li>
                                <li>
                                    <p className="title">收款人：</p>
                                    <Select labelInValue value={{key:payeeId}} style={{width:'280px'}} onChange={(v) => {
                                            this.setState({
                                                payeePeople:v.label,
                                                payeeId:v.key
                                            })
                                            
                                        }}>
                                        {user}
                                        
                                    </Select>
                                    
                                </li>
                                <li>
                                    <p className="title">收款时间：</p>
                                    <DatePicker1/>
                                    
                                </li>
                            </ul>
                            <div className="list-item">
                                <p className="title">收款备注：</p>
                                <MyInput type="input"
                                         placeholder="您最多可输入200字"
                                         value={dRemark}
                                         style={{width:'100%',height:'34px'}}
                                         onInputChange={(v) => {
                                             this.setState({
                                                 dRemark:v
                                             })
                                         }}/>
                            </div>
                            <div className="list-item">
                                <p className="title">单据凭证：</p>
                                <Upload
                                    action="http://testoms.myspzh.com/upload"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                >
                                    {fileList.length >= 3 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel} key={previewImage}>
                                    <img alt="example" style={{width:'100%'}} src={previewImage} key={previewImage}/>
                                </Modal>
                            </div>
                            <div className="button-wrap">
                                <MyButton className="m-button-default cancel"
                                          HtmlValue="暂不处理"
                                          HtmlType="button"
                                          onClick={() => {
                                              this.props.history.push('/m/business/output')
                                          }}/>
                                <MyButton className="m-button-primary ok"
                                          HtmlValue="确认收款"
                                          HtmlType="button"
                                          onClick={this.handleReceivablesorder}/>
                            </div>
                            <div className="absolute">
                                <span>实际收款</span>
                                <span>¥{total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const
    methodArr = [
        {name:'现金',id:'1'},
        {name:'支付宝',id:'2'},
        {name:'微信',id:'3'},
        {name:'银行转账',id:'4'},
        {name:'未付款',id:'5'},
        {name:'其他',id:'6'},
    ]
export default Receipt;