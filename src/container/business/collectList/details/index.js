import React,{ Component } from 'react';
//import { withRouter } from 'react-router';
//import { Link } from 'react-router-dom';
import './style.scss';
import Title from '../../../../components/title';
import { fetchPost } from "../../../../fetch/fetch";
import api from '../../../../utils/interface';

import MyButton from '../../../../components/button';
//import { fetchDynamic } from '../../../../utils/utils';
//import Modal from '../../../../components/modal';

import Message from "../../../../components/message";


class RejectDetail extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id:props.match.params.id,
            details:{},
        }
    }
    componentDidMount () {
        this.fetchDetails()
    }

    onEdit= (id) => {
        console.log(id)
        this.props.history.push('/m/business/output')
    }
    // 订单详情
    fetchDetails = () => {
        const params = {
            subservice:"detail",
            params:{
                id:this.state.id
            }
        }
        fetchPost(api.Receivablesorder,params).then(res => {
            const code = res.code;
            
            if(code === '1000') {
                console.log("收款单详情",res)
                
                this.setState({
                    details:res.data,
                })
            }
        })
    }

    render () {
        const {details} = this.state;
        console.log("receivablesOrder",details.receivablesOrder)
        const OutList = () => {
            return details.outorder && details.outorder.map((v,i) => {
                return <li key={i}>
                    <div>
                        <span>{v.orderCode}</span>
                        <span>实际出库:{v.goodsNum}件</span>
                        <span>代收货款:<em className="red">￥{v.money}</em></span>
                        </div>

                    </li>
            })
        }
        const ReList = () => {
            return details.receivablesOrder && details.receivablesOrder.map((v,i) => {
                return <li key={i}>
                    <div>
                        <span>{v.orderCode}</span>
                        <span>{v.orderCode.indexOf('JS') !== -1?'实际退货:':'拒收数量:'}{v.goodsNum}件</span>
                        <span>应退金额:<em className="red">-￥{v.money}</em></span>
                    </div>

                </li>
            })
        }
        const Img = () => {
            return details.img && details.img.split(",").map((v,i) => {
                return <span key={i}><img src={v} className="img-list" alt="回单" /></span>

            })
        }
        let paymentMethod;
        
        if(details.paymentMethod==="支付宝"){
            paymentMethod="p-text icon-zhifubao"
        }else if(details.paymentMethod==="微信"){
            paymentMethod="p-text icon-wechat"
        }else if(details.paymentMethod==="现金"){
            paymentMethod="p-text icon-cash"
        }else if(details.paymentMethod==="银行转账"){
            paymentMethod="p-text icon-card"
        }else if(details.paymentMethod==="其他"){
            paymentMethod="p-text icon-else"
        }else{
            paymentMethod='p-text'
        }
            
        
        return (
            <div className="m-collect-detail-wrap">
              
                <div className="m-entry-wrap">
                    <Title title="收款单详情" subTitle={{assgin1:'代收货款',assgin2:'收款单详情',Link:'/m/business/collectList'}}/>

                    <div className="collect-detail-content">
                        <div className="m-collect-detail-inner">
                            <div className="warp">
                                <div className="clientName"><span>客户名称：</span>{details.clientName}</div>
                                <p className="order-tit">代收出库单：</p> 
                                <ul className="list-ul">
                                    
                                    {OutList()}


                                </ul>
                                <p className="order-tit">退货单：</p>
                                <ul className="list-ul">
                                    
                                    {ReList()}

                                </ul> 
                                <ul className="list-ul-main">
                                    <li>
                                        <p className="p-label">货主企业:</p>
                                        <p className="p-text">{details.businessName}</p>
                                    </li>
                                    <li>
                                        <p className="p-label">状态:</p>
                                        <p className="p-text">{details.ifAudit===0?'未审核':'已审核'}</p>
                                    </li>
                                    <li>
                                        <p className="p-label">其他抵扣:</p>
                                        <p className="p-text"><em className="red">-￥{details.otherDeductible}</em></p>
                                    </li>
                                    <li>
                                        <p className="p-label">其他收款:</p>
                                        <p className="p-text"><em className="red">￥{details.otherReceivables}</em></p>
                                    </li>
                                    <li>
                                        <p className="p-label">支付方式:</p>
                                        <p className={paymentMethod}>{details.paymentMethod}</p>
                                    </li>
                                    <li>
                                        <p className="p-label">收款人:</p>
                                        <p className="p-text">{details.payeePeople}</p>
                                    </li>
                                    <li style={{width:'100%'}}>
                                        <p className="p-label">收款备注:</p>
                                        <p className="p-text">{details.remark}</p>
                                    </li>
                                    <li className="img-content" style={{width:'100%'}}>
                                        <p className="p-label">单据凭证:</p>
                                        <div className="img-box">
                                            {Img()}
                                        </div>
                                    </li>
                                </ul>
                                <div className="receptAmount clearfix">
                                    <i className="left-icon"></i>
                                    <i className="right-icon"></i>
                                    <ul className="list-ul-recept clearfix">
                                        <li><span>实际收款</span></li>
                                        <li><span>￥{details.actualReceipts}</span></li>
                                    </ul>
                                </div>
                            </div>
                               
                        </div>
                        
                        
                    </div>

                </div>
            </div>
        )
    }
}

export default RejectDetail;