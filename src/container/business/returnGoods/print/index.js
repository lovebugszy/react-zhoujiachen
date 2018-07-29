/**
 * Created by Administrator on 2018/7/17.
 */

import React,{ Component } from 'react';
// import { Select } from 'antd';
import { Upload,Icon,Modal,DatePicker, Select,Table,Input} from 'antd';
// import { DatePicker } from 'antd';
import moment from 'moment';
//import 'moment/locale/zh-cn';

//import { Link } from 'react-router-dom';
// import './style.scss';
// import './jQuery.print.js';
// import './jquery.PrintArea.min.js';
// import './jquery.min.js';
import Title from '../../../../components/title';
import { fetchPost } from "../../../../fetch/fetch";
import api from '../../../../utils/interface';
import SingleOwnerInfo from './components/single-owner-information';

import MyButton from '../../../../components/button';
//import { Input, Select } from 'antd';
import MyInput from '../../../../components/input';
//import Select from '../../../../components/select';
//import { fetchDynamic } from '../../../../utils/utils';
//import Modal from '../../../../components/modal';
import Message from "../../../../components/message";

const Option = Select.Option;
class Print extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id:props.match.params.id,
            orderCode:'',
            code:'',
            businessId:'',
            details:{},
            openModal:false,
        }
    }

    componentDidMount () {
        this.fetchDetail();
    }

    // 请求详情
    fetchDetail = () => {
        const params = {
            subservice: "orderInfo",
            params: {
                orderid: this.state.id
            }
        }
        fetchPost(api.afterSaleDetails, params).then(res => {
            const code = res.code;
            if (code === '1000') {
                res.data.goodsList.forEach((v, i) => {
                    v.key = i;
                    v.goodsName = {
                        goodsName: v.goodsName
                    }
                    v.goodsCode = {
                        goodsCode:v.goodsCode
                    }

                        // goodsSpec:v.goodsSpec,
                        // goodsPackage:v.goodsPackage,
                        // goodsUnit:v.goodsUnit

                })
                this.setState({
                    orderCode:res.data.orderCode,
                    code:res.data.businessCode,
                    businessId:res.data.businessId,
                    details:res.data,
                    goodList:res.data.goodsList
                })
            }
        })
    }

    //取消
    onReturn = () => {
        this.props.history.push('/m/business/rejecting');
    }
    render () {
        return (
            <div className="m-entry-detail-wrap">
                <div className="m-entry-detail-inner">


                    <div className="entry-detail-content">
                        <Title title="销售退货单"  className="centre"/>
                        <SingleOwnerInfo details={this.state.details}/>
                        <Table
                            columns={columns}
                            dataSource={this.state.goodList}
                            pagination={false}
                            bordered/>
                        <div>
                            <div className="btn-group">
                                    <MyButton className="m-global-button m-button-primary"
                                              HtmlValue="打印"
                                              HtmlType="button"
                                              style={{height:'28px',float:'right',borderRadius:'2px'}}
                                              onClick={() => this.onCompletion(this.state.details.id )}/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// 商品信息展示
const GoodsName = (goodsName) => {
    let obj = goodsName.goodsName;
    return (
        <div className="goods-wrap">
            <p>{obj.goodsName} </p>
        </div>
    )
}
const GoodsCode = (goodsCode) => {
    let obj = goodsCode.goodsCode;
    return (
        <div className="goods-wrap">
            <p> {obj.goodsCode}</p>
        </div>
    )
}
// 列表头信息
const columns = [
    {title:'',dataIndex:'id',},
    {title:'商品编号',className:'goodsCode',dataIndex:'goodsCode',render:goodsCode => <GoodsCode goodsCode={goodsCode}/>,},
    {title:'商品名称',dataIndex:'goodsName',dataIndex:'goodsName',render:goodsName => <GoodsName goodsName={goodsName}/>,},
    {title:'单价',dataIndex:'goodsPrice',render:text => <span>¥{text}</span>,},
    {title:'折扣率',dataIndex:'discountRate',render:text => <span>{text}%</span>,},
    {title:'折后价',dataIndex:'discountPrice',render:text => <span>¥{text}</span>,},
    {title:'金额',dataIndex:'discountAmount',render:text => <span>¥{text}</span>,},
    {title:'数量',dataIndex:'planNum',},
    {title:'规格',dataIndex:'goodsSpec',},

];
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

export default Print;