import React,{ Component } from 'react';
//import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './style.scss';
import Header from '../../../../components/header';
import Title from '../../../../components/title';
import { fetchPost } from "../../../../fetch/fetch";
import api from '../../../../utils/interface';
import SingleOrderDetails from './components/single-order-details';
import MyButton from '../../../../components/button';
//import { fetchDynamic } from '../../../../utils/utils';
//import Modal from '../../../../components/modal';
import DetailsTable from './components/details-table';
import Message from "../../../../components/message";


class RejectDetail extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id:props.match.params.id,
            outid:props.match.params.outid,
            details:{},
            orderCode:'',
            code:'',
            businessId:'',
            goodsList:[],
            //stepHorizontalList:[], // 横向节点list
            //stepVerList:[],        // 竖向节点list
            openModal:false,
        }
    }

    componentDidMount () {
        this.fetchDetails();
        console.log("outid",this.state.outid)
    }
    //通知入库
    onCompletion = (id) => {
        console.log(id)
        const params = {
            "subservice":"push",
            "params":{
                "orderid":id,
            }
        }
        console.log(params)
        fetchPost(api.afterSale,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                Message.open('success',res.message,3000);
                this.fetchDetails()
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
        if(this.state.outid){
            params.subservice="rejectInfo";
            params.params.orderid=this.state.outid;
        }
        console.log(params)
        fetchPost(api.afterSale,params).then(res => {
            const code = res.code;
            console.log(res)
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
                        rewriteNum:v.rewriteNum
                    }
                    // 价格拼接
                    v.discountPrice = {
                        discountPrice:v.discountPrice,
                        goodsPrice:v.goodsPrice,
                        discountRate:v.discountRate,
                        discountAmount:v.discountAmount
                    }
                })
                this.setState({
                    orderCode:res.data.orderCode,
                    code:res.data.businessCode,
                    businessId:res.data.businessId,
                    details:res.data,
                    goodsList:res.data.goodsList
                })
            }
        })
    }

    render () {
        const {details,goodsList} = this.state;
        console.log(details)
        return (
            <div className="m-output-detail-wrap">
                <Header/>
                <div className="m-output-detail-inner">
                    <Title title="拒收单详情" subTitle={{assgin1:'拒收单',assgin2:'拒收单详情',Link:'/m/business/rejecting'}}/>

                    <div className="output-detail-content">
                        <SingleOrderDetails details={details}/>
                        <div className="details-table">
                            <DetailsTable goodsList={goodsList}/>
                        </div>
                        <div className="list-bottom">
                            <ul className="list-ul">
                                <li>
                                    <div>
                                        <span>拒收原因：</span>
                                        <span>{details.reason ? details.reason : ""}</span>
                                    </div>

                                </li>
                                <li>

                                    <div>
                                        <span>处理方式：</span>
                                        <span>{details.processingInstructions ? details.processingInstructions : ""}</span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span>补充说明：</span>
                                        <span>{details.remark ? details.remark : ""}</span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span>拒收日期：</span>
                                        <span>{details.thDate ? details.thDate : ""}</span>
                                    </div>
                                    <div>
                                        <span>入库日期：</span>
                                        <span>{details.rewriteTime ? details.rewriteTime : ""}</span>
                                    </div>
                                </li>

                            </ul>

                        </div>
                        <div>

                            {details.orderStatus === 0 ?
                                <div className="btn-group">
                                    <MyButton className="m-global-button m-button-primary"
                                              HtmlValue="通知入库"
                                              HtmlType="button"
                                              style={{height:'28px',borderRadius:'2px'}}
                                              onClick={() => this.onCompletion(details.id)}/>

                                              
                                                    <Link className="m-global-button m-button-primary" style={{display:'inline-block',height:'28px',lineHeight:'26px',borderRadius:'2px'}} to={`/rejectedit/${details.id}`}>编辑</Link>
                                              
                                              
                                    </div>
                                : ''}

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default RejectDetail;