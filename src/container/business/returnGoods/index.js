import React, {Component} from 'react';
// import { withRouter } from "react-router-dom";
import './style.scss';
import Title from '../../../components/title';
import Tab from '../../../components/tabs';
import QueryPanel6 from '../../../components/query-panel6';
import api from '../../../utils/interface'
import LargeQueryContent from './components/large-query-content';
import TabItem from './components/tab-item';
import {fetchPost} from "../../../fetch/fetch";
import {Pagination} from 'antd';
import Message from "../../../components/message";

class afterSaleList extends Component {
    constructor() {
        super();
        this.state = {
            content: 0,
            selectList: [],          // 选择企业列表
            count: 1,                // 总条数
            businessId: '',          // 企业id
            servType: 1,             // 选择入库类型
            keyword: '',             // 退货单号/来源单号/供应商名称
            startTime: '',           // 开始日期
            endTime: '',             // 结束日期
            orderStatus: '',         // 订单状态
            quality: '',             // 商业性质     -----   此查询条件 暂时无用 待后端修改
            pageindex: 1,            // 当前页
            pageSize: 10,             // 当前条数
            afterSaleList: [],          // 数据列表
        }
    }

    componentDidMount() {
        this.fetchSelectList();
        this.fetchData();
    }

    // 请求企业列表
    fetchSelectList = () => {
        const params = {
            "subservice": "business",
            "params": {}
        }
        fetchPost(api.entrySelectList, params).then(res => {
            const code = res.code;
            if (code === "1000") {
                this.setState({
                    selectList: res.data
                })
            }
        })
    }

    // 请求数据列表
    fetchData = () => {
        const params = {
            "subservice": "query",
            "params": {
                "businessId": this.state.businessId,
                "keyword": this.state.keyword,
                "servType": this.state.servType,
                "startTime": this.state.startTime,
                "endTime": this.state.endTime,
                "orderStatus": this.state.orderStatus,
                "quality": this.state.quality,
                "page": {
                    "pageIndex": this.state.pageindex,
                    "pageSize": this.state.pageSize
                }
            }
        }

        fetchPost(api.afterSaleList, params).then(res => {
            const code = res.code;
            if (code === "1000") {
                this.setState({
                    afterSaleList: res.data.orderList,
                    count: res.data.pageTotal
                })
            }
        })
    };

    // 导出请求
    exports = () => {
        const params = {
            "type": "dcInOrder",
            "serviceName": "after_sale",
            "param": {
                "subservice": "query",
                "params": {
                    "businessId": this.state.businessId,
                    "keyword": this.state.keyword,
                    "servType": this.state.servType,
                    "storename": this.state.storename,
                    "startTime": this.state.startTime,
                    "endTime": this.state.endTime,
                    "orderStatus": this.state.orderStatus,
                    "quality": this.state.quality,
                },
                "user": {
                    "type": "9", "userid": "38", "useraccount": "admin", "username": "管理员"
                }
            }
        }
        fetchPost(api.exports, params).then(res => {
            const code = res.code;
            if (code === "1000") {
                console.log(res)
                this.setState({
                    afterSaleList: res.data.orderList,
                    count: res.data.pageTotal
                })
            }
        })
    }

    // tab切换
    navChange = (i) => {
        switch (i) {
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
                this.orderStatusChange(5);
                break;
            case 4:
                this.orderStatusChange(2);
                break;
            case 5:
                this.orderStatusChange(3);
                break;
            case 6:
                this.orderStatusChange(4);
                break;
            case 7:
                this.orderStatusChange(99);
                break;
            default:
        }
    };

    // 订单状态切换
    orderStatusChange = (v) => {
        this.setState({orderStatus: v}, () => {
            this.fetchData()
        })
    }

    // 点击查询
    handleQuery = (v) => {
        console.log(v)
        this.setState({
            keyword: v.oddNumber,   // 请输入单号/来源单号/供应商名称
            startTime: v.date[0],
            endTime: v.date[1],
            businessId: v.enterprise.id,
        }, () => {
            this.fetchData();
        })
    }

    // 点击导出
    handleExports = (v) => {
        this.setState({
            keyword: v.oddNumber,   // 请输入单号/来源单号/供应商名称
            startTime: v.date[0],
            endTime: v.date[1],    // 结束日期
            businessId: v.enterprise
        }, () => {
            this.exports()
        })
    }

    // 高级查询条件变更
    handleSelectChange = (v) => {
        this.setState({
            storename: v.storename,
        })
    }

    // 时间变化
    handleDateChange = (v) => {
        this.setState({
            startTime: v.date[0],
            endTime: v.date[1],
        })
    }
    //列表点击
    handleCompletions = (id, type) => {
        const {history} = this.props;
        if (type === '收货') {
            history.push(`/m/business/returnGoods/sellAdd/${id}`);
        }
    }
    //列表点击
    handleCompletioned = (id) => {
        console.log(id)
        const params = {
            "subservice":"orderInfo",
            "params":{
                "orderid":id,
            }
        }
        console.log(params)
        fetchPost(api.afterSale,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                this.props.history.push(`/m/business/returnGoods/print/${id}`);
            }
        })

    }
    // 推送Wms
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

    render() {
        const navList = ['全部', '待审核', '待退货', '退货中', '待入库', '正常完成', '异常完成', '已取消'];
        return (
            <div className="m-entry-wrap">
                <Title title="销售退货单"/>
                <QueryPanel6 onQuery={this.handleQuery}
                             onExports={this.handleExports}
                             onDateChange={this.handleDateChange}
                             placeholder="退货单号/来源单号/客户名称"
                             selectList={this.state.selectList}
                             largeQueryContent={<LargeQueryContent onClick={this.handleSelectChange}/>}
                             largeQueryHeight="100px"/>
                <div className="m-entry-list-wrap">
                    <Tab navList={navList}
                         content={<TabItem afterSaleList={this.state.afterSaleList}
                                           onCompletion={this.handleCompletion}
                                           onCompletions={this.handleCompletions}
                                           onCompletioned={this.handleCompletioned}/>}
                         onChange={this.navChange}/>
                    <div className="page-wrap clearfix">
                        <Pagination showSizeChanger
                                    onShowSizeChange={(current, pageSize) => {
                                        this.setState({pageSize: pageSize}, () => {
                                            this.fetchData()
                                        })
                                    }}
                                    onChange={(v) => {
                                        this.setState({pageindex: v}, () => {
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

export default afterSaleList