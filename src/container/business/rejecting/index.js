import React,{ Component } from 'react';
import { withRouter } from "react-router-dom";
import './style.scss';
import Title from '../../../components/title';
import Tab from '../../../components/tabs';
import QueryPanel from '../../../components/query-panel';
import api from '../../../utils/interface'
import LargeQueryContent from './components/large-query-content';
import TabItem from './components/tab-item';
import { fetchPost } from "../../../fetch/fetch";
import { Pagination } from 'antd';
import Message from "../../../components/message";

class RejectList extends Component {
    constructor () {
        super();
        this.state = {
            content:0,
            selectList:[],          // 选择企业列表

            count:0,                // 总条数
            businessId:'',          // 企业id
            servType:0,             // 选择入库类型
            storename:'米阳嘉兴仓',  // 仓库名称
            search:'',              // 请输入单号/来源单号/供应商名称
            startcreatetime:'',     // 开始日期
            endcreatetime:'',       // 结束日期
            orderStatus:'',         // 订单状态
            pageindex:1,            // 当前页
            pageSize:10,             // 当前条数
            inOrderList:[],         // 数据列表
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
            "subservice":"query",
            "params":{
                "keyword":this.state.search,
                "servType":5,
                //"storename":this.state.storename,
                "startTime":this.state.startcreatetime,
                "endTime":this.state.endcreatetime,
                "orderStatus":this.state.orderStatus,
                "page":{
                    "pageIndex":this.state.pageindex,
                    "pageSize":this.state.pageSize,
                }
            }
        }
        fetchPost(api.afterSale,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                this.setState({
                    inOrderList:res.data.orderList,
                    count:res.data.pageTotal
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
                },
                "user":{
                    "type":"9","userid":"38","useraccount":"admin","username":"管理员"
                }
            }
        }
        fetchPost(api.exports,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                console.log(res)
                this.setState({
                    inOrderList:res.data.inOrderList,
                    count:res.data.count
                })
            }
        })
    }

    // tab切换
    navChange = (i) => {
        switch(i) {
            case 0:
                this.orderStatusChange('');
                break;
            case 1:
                this.orderStatusChange(0);
                break;
            case 2:
                this.orderStatusChange(1);
                break;
            case 3:
                this.orderStatusChange(2);
                break;
            case 4:
                this.orderStatusChange(99);
                break;
            default:
        }
    };

    // 订单状态切换
    orderStatusChange = (v) => {
        this.setState({orderStatus:v},() => {
            this.fetchData()
        })
    }

    // 点击查询
    handleQuery = (v) => {
        console.log(v)
        this.setState({
            search:v.oddNumber,   // 请输入单号/来源单号/供应商名称
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
            search:v.oddNumber,              // 请输入单号/来源单号/供应商名称
            startcreatetime:v.date[0],     // 开始日期
            endcreatetime:v.date[1],       // 结束日期
            businessId:v.enterprise
        },() => {
            this.exports()
        })
    }

    // 高级查询条件变更
    handleSelectChange = (v) => {
        this.setState({
            servType:v.servType,
            storename:v.storename,
        })
    }

    // 时间变化
    handleDateChange = (v) => {
        this.setState({
            startcreatetime:v.date[0],
            endcreatetime:v.date[1]
        })
    }

    // 通知入库
    handleCompletion = (id) => {
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
                this.fetchData();
            }
        })
    }
    // 取消订单
    handleCancelOrder = (id,cancelReason) => {
        console.log(id)
        const params = {
            "subservice":"cancel",
            "params":{
                "orderid":id,
                "cancelreason":cancelReason,
            }
        }
        console.log(params)
        fetchPost(api.afterSale,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                Message.open('success',res.message,3000);
                this.fetchData();
            }
        })
    }

    render () {
        const navList = ['全部','待审核','退货中','已完成','已取消'];
        return (
            <div className="m-entry-wrap">
                <Title title="拒收单"/>
                <QueryPanel onQuery={this.handleQuery}
                            onExports={this.handleExports}
                            onDateChange={this.handleDateChange}
                            selectList={this.state.selectList}
                            largeQueryContent={<LargeQueryContent onClick={this.handleSelectChange}/>}
                            largeQueryHeight="100px"/>
                <div className="m-entry-list-wrap">
                    <Tab navList={navList}
                         content={<TabItem inOrderList={this.state.inOrderList}
                                           onCompletion={this.handleCompletion}
                                           onCancelOrder={this.handleCancelOrder}/>}
                         onChange={this.navChange}/>
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

export default withRouter(RejectList)