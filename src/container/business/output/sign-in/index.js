import React,{ Component } from 'react';
import './style.scss';
import { withRouter } from 'react-router';
import Title from '../../../../components/title';
import NavTabs from '../components/nav-tabs';
import SignContentNormal from '../components/sign-content-normal';
import SignContentPart from '../components/sign-content-part';
import SignContentAllReject from '../components/sign-content-all-reject';
import SignContentAbnormal from '../components/sign-content-abnormal';
import { fetchPost } from "../../../../fetch/fetch";
import api from '../../../../utils/interface';
import MyButton from '../../../../components/button';
import Message from '../../../../components/message';

class SignIn extends Component {
    constructor (props) {
        super(props)
        this.state = {
            radioValue:4,
            id:props.match.params.id,
            goodsList:[],
            businessCode:"",
            businessId:"",
            isReceive:"",//0不需要代收，1需要
            // 签收参数
            outOrderId:"", // 出库单id
            signType:"",   // 签收类型
            signRemark:"", // 签收说明
            reason:"",     // 拒收原因
            dealWay:"",    // 处理方式
            fileList:"",   // 图片地址
            signGoodsList:[],
        }
    }

    componentDidMount () {
        this.fetchDetails()
    }

    // 签收状态
    handleChangeRadioValue = (value) => {
        this.setState({
            radioValue:value
        })
    }

    // 请求详情
    fetchDetails = () => {
        const params = {
            subservice:"orderInfo",
            params:{
                orderid:this.state.id
            }
        }
        fetchPost(api.outputDetails,params).then(res => {
            const code = res.code;
            console.log(res.data)
            if(code === '1000') {
                this.setState({
                    goodsList:res.data.goodsList,
                    businessCode:res.data.businessCode,
                    businessId:res.data.businessId,
                    isReceive:res.data.isReceive,
                })
            }
        })
    }

    // 保存 
    handleSave = () => {
        const {radioValue,reason,dealWay,signGoodsList = [],id,signRemark,fileList} = this.state;
        console.log(signGoodsList)
        if(radioValue === 6) {
            const type = signGoodsList.some((cur,pre) => {
                return cur.batchNum !== cur.rewriteNum
            })
            if(!type) {
                Message.open('error','实际出库量与实收数量不可相等',3000);
                return false;
            }
        }
        if(radioValue === 5 || radioValue === 6 || radioValue === 8) {
            if(reason === '' || undefined) {
                Message.open('error','请选择拒收原因',3000);
                return false;
            } else if(dealWay === '' || undefined) {
                Message.open('error','请选择处理方式',3000);
                return false;
            }
        }
        const params = {
            "subservice":"sign",
            "params":{
                "signParam":{
                    "outOrderId":id,
                    "signType":radioValue,
                    "signRemark":signRemark,
                    "reason":reason,
                    "dealWay":dealWay,
                    "img1":fileList,
                },
                "goodslist":signGoodsList
            },
            "user":{
                "code":this.state.businessCode,
                "businessid":this.state.businessId,
            }
            
        }
        console.log(params)
        fetchPost(api.outputSignIn,params).then(res => {
            const code = res.code;
            if(code === '1000') {
                if(this.state.radioValue === 4 || this.state.radioValue === 6) {
                    if(this.state.isReceive === 1){
                        this.props.history.push('/m/business/output/receipt/'+this.state.id)
                    } else {
                        this.props.history.push('/m/business/output/')
                    }
                    
                } else {
                    this.props.history.push('/m/business/output')
                }
                Message.open('success','保存成功',3000);
            }
        })
    }

    // 正常签收内容回调
    handleSignContentNormal = (v) => {
        let fileList = [];
        v.fileList.forEach(v => {
            fileList.push(v.response)
        })
        this.setState({
            signRemark:v.signRemark,
            fileList:fileList.join(','),
        })
    }

    // 部分签收回调内容
    handleSignContentPart = (v) => {
        let list = this.state.goodsList
        //console.log(list)
        //console.log(v.goodsList)
        for(let i = 0; i < list.length; i++) {
            list[i].outOrderBatches = [];
            let actualNumTotal=0;
            // list[i].outOrderGoodId = list[i].id
            v.goodsList.forEach(v => {
                
                v.goodsCode = v.goodsNames.goodsCode;
                v.goodsName = v.goodsNames.goodsName;
                v.goodsPackage = v.goodsNames.goodsPackage;
                v.goodsSpec = v.goodsNames.goodsSpec;
                v.goodsUnit = v.goodsNames.goodsUnit;
                //v.rewriteNum = v.rewriteNums;
                //v.actualNum = v.actualNums;
                if(v.barcode === list[i].barcode) {
                    //console.log(v.barcode)
                    //console.log(list[i].barcode)
                    let obj={
                        actualNum:v.actualNums,
                        rewriteNum:v.rewriteNums,
                        produceDate:v.produceDate,
                    }
                    list[i].outOrderBatches.push(obj)
                    list[i].outOrderGoodId = v.outOrderGoodsId
                    actualNumTotal+=v.actualNums;
                }
            })
            list[i].actualNum=actualNumTotal;
        }

        for(let i = 0; i < list.length; i++) {
            console.log("list[i].outOrderBatches.length",list[i].outOrderBatches.length)
            if(list[i].outOrderBatches === null || list[i].outOrderBatches === undefined || list[i].outOrderBatches.length === 0) {
                list[i].outOrderBatches = [];
            }
            delete list[i].volume;
            delete list[i].actualGoodsAmount;
            delete list[i].add;
            delete list[i].deleted;
            delete list[i].outStoreType
            delete list[i].planNum
            delete list[i].priCode
            delete list[i].quality
            delete list[i].remark
            delete list[i].greaterThanStoreNum
            delete list[i].grossWeight
            delete list[i].orderCode
            delete list[i].orderId
            delete list[i].businessCode
            delete list[i].discountAmount
            delete list[i].id

        }
        console.log(list)

        let fileList = [];
        v.fileList.forEach(v => {
            fileList.push(v.response)
        })
        this.setState({
            signRemark:v.signRemark,
            reason:v.reason,
            dealWay:v.dealWay,
            fileList:fileList.join(','),
            signGoodsList:list
        })
    }

    // 全部拒收回调内容
    handleSignContentAllReject = (v) => {
        let fileList = [];
        v.fileList.forEach(v => {
            fileList.push(v.response)
        })
        this.setState({
            signRemark:v.signRemark,
            reason:v.reason,
            dealWay:v.dealWay,
            fileList:fileList.join(','),
            goodsList:[]
        })
    }

    // 异常出库处理
    handleSignContentAbormal = (v) => {
        console.log(v)
        this.setState({
            signRemark:v.signRemark,
            reason:v.reason,
            dealWay:v.dealWay,
            goodsList:[]
        })
    }

    render () {
        const {radioValue} = this.state;
        let contents;
        if(radioValue === 4) {
            contents = <SignContentNormal onChange={this.handleSignContentNormal}/>
        } else if(radioValue === 6) {
            contents = <SignContentPart onChange={this.handleSignContentPart}
                                        goodsList={this.state.goodsList}/>
        } else if(radioValue === 5) {
            contents = <SignContentAllReject onChange={this.handleSignContentAllReject}/>
        } else if(radioValue === 8) {
            contents = <SignContentAbnormal onChange={this.handleSignContentAbormal}/>
        }
        return (
            <div className="m-sign-in-wrap">
                <Title title="出库单签收" subTitle={{assgin1:'出库单',assgin2:'出库单签收',Link:'/m/business/output'}}/>
                <NavTabs onClick={this.handleChangeRadioValue}/>
                <div className="m-sign-in-content">
                    {contents}
                    <MyButton className="m-button-primary"
                              HtmlValue="保存"
                              HtmlType="button"
                              style={{
                                  height:'38px',
                                  width:'600px',
                                  borderRadius:'5px',
                                  margin:'50px auto',
                                  display:'block'
                              }}
                              onClick={() => this.handleSave()}/>
                </div>
            </div>
        )
    }
}

export default withRouter(SignIn);