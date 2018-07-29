/**
 * Created by Administrator on 2018/7/16.
 */
import React,{ Component } from 'react';
import { withRouter } from "react-router-dom";
import './style.scss';
import Title from '../../../components/title';
import QueryPanel2 from '../../../components/query-panel4';
import api from '../../../utils/interface'
//import LargeQueryContent from './components/large-query-content';
import TabItem from './components/tab-item';
import { fetchPost } from "../../../fetch/fetch";
import { Pagination } from 'antd';
import Message from "../../../components/message";

class DeliveryList extends Component {
    constructor () {
        super();
        this.state = {
            content:0,
            selectList:[],          // 选择企业列表
            count:0,                // 总条数
            businessId:'',          // 企业id
            keyword:'',              // 请输入单号/来源单号/供应商名称
            startcreatetime: '',           // 开始日期
            endcreatetime: '',             // 结束日期
            storeCode:"",
            pageindex:1,            // 当前页
            pageSize:10,             // 当前条数
            reportList: [],          // 数据列表
        }
    }

    componentDidMount () {
        this.fetchSelectList();
        this.fetchData();
    }

    // 请求企业列表
    fetchSelectList = () => {
        const params = {
            "subservice":"business",
            "params":{}
        }
        fetchPost(api.entrySelectList,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                this.setState({
                    selectList:res.data
                })
            }
        })
    }

    // 请求数据列表
    fetchData = () => {
        const params = {
            "subservice":"distributionTJ",
            "params":{
                "keyword": this.state.keyword,
                "startcreatetime": this.state.startcreatetime,
                "endcreatetime": this.state.endcreatetime,
                "storeCode":this.state.storeCode,
                "pageIndex":this.state.pageindex,
                "pageSize":this.state.pageSize,
                "businessId":this.state.businessId
            }
        }

        fetchPost(api.reportentry,params).then(res => {
            const code = res.code;
            console.log(res.data.data)
            if(code === "1000") {
                this.setState({
                    reportList:res.data.orderList,
                    count: res.data.pageTotal
                })
            }
        })
    };

    // 导出请求
    exports = () => {
        const params = {
            "type":"dcInOrder",
            "serviceName":"instorage",
            "param":{
                "subservice":"queryorder",
                "params":{
                    "search":this.state.search,
                    "servType":this.state.servType,
                    "storename":this.state.storename,
                    "startcreatetime":this.state.startcreatetime,
                    "endcreatetime":this.state.endcreatetime,
                    "orderStatus":this.state.orderStatus,
                    "businessId":this.state.businessId
                }
            }
        }
        fetchPost(api.exports,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                this.setState({
                    reportList:res.data.orderList,
                    count:res.data.count
                })
            }
        })
    }

    // 点击查询
    handleQuery = (v) => {
        console.log(v)
        this.setState({
            keyword:v.oddNumber,   // 请输入单号/来源单号/供应商名称
            startcreatetime:v.date[0],
            endcreatetime:v.date[1],
            businessId:v.enterprise.id,
        },() => {
            this.fetchData();
        })
    }

    // 点击导出
    handleExports = (v) => {
        this.setState({
            keyword:v.oddNumber,              // 请输入单号/来源单号/供应商名称
            startcreatetime:v.date[0],     // 开始日期
            endcreatetime:v.date[1],       // 结束日期
            businessId:v.enterprise
        },() => {
            this.exports()
        })
    }


    render () {
        //const navList = ['全部','待审核','退货中','已完成','已取消'];
        return (
            <div className="m-entry-wrap">
                <Title title="配送表"/>
                <QueryPanel2 onQuery={this.handleQuery}
                             onExports={this.handleExports}
                             selectList={this.state.selectList}
                             placeholder="客户名称、订单号/拒收单、销退单"
                />
                <div className="m-entry-list-wrap">
                    <TabItem reportList={this.state.reportList}
                             onCompletion={this.handleCompletion}/>

                    <div className="page-wrap clearfix">
                        <Pagination showSizeChanger
                                    onShowSizeChange={(current,pageSize) => {
                                        this.setState({pageSize:pageSize},() => {
                                            this.fetchData()
                                        })
                                    }}
                                    onChange={(v) => {
                                        this.setState({pageindex:v},() => {
                                            this.fetchData()
                                        })
                                    }}
                                    defaultCurrent={1}
                                    total={this.state.count}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(DeliveryList)