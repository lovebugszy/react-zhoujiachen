import React, {Component} from 'react';
// import { withRouter } from "react-router-dom";
import './style.scss';
import Title from '../../../components/title';
import Tab from '../../../components/tabs';
import QueryPane3 from '../../../components/query-panel5';
import api from '../../../utils/interface'
import LargeQueryContent from './components/large-query-content';
import TabItem from './components/tab-item';
import {fetchPost} from "../../../fetch/fetch";
import {Pagination} from 'antd';
import Message from "../../../components/message";
class DangerList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: 0,
            selectList: [],          // 选择企业列表
            count: 0,                // 总条数
            businessId: '',          // 企业id
            servType: 4,             // 选择入库类型
            keyword: '',             // 出库单号/来源单号/供应商名称
            startTime: '',           // 开始日期
            endTime: '',             // 结束日期
            orderStatus: '',         // 订单状态
            pageindex: 1,            // 当前页
            pageSize: 10,             // 当前条数
            dangerList: [],          // 数据列表
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
                "orderStatus": this.state.orderStatus,
                "startTime": this.state.startTime,
                "endTime": this.state.endTime,
                "page": {
                    "pageIndex": this.state.pageindex,
                    "pageSize": this.state.pageSize
                }
            }
        }

        fetchPost(api.dangerList, params).then(res => {
            const code = res.code;
            if (code === "1000") {
                this.setState({
                    dangerList: res.data.orderList,
                    count: res.data.pageTotal
                })
            }
        })
    };

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
        this.setState({orderStatus: v}, () => {
            this.fetchData()
        })
    }

    // 点击查询
    handleQuery = (v) => {
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
            keyword: v.oddNumber,               // 请输入单号/来源单号/供应商名称
            startTime: v.date[0],
            endTime: v.date[1],    // 结束日期
            businessId: v.enterprise
        }, () => {
            this.exports()
        })
    }
    //高级查询
    handleSelectChange = (v) => {
        this.setState({
            storename: v.storename,
        })
    }

    // 时间变化
    handleDateChange = (v) => {
        this.setState({
            startTime: v.date[0],
            endTime: v.date[1]
        })
    }
    // 取消
    handleCompletion = (id, cancel) => {
        console.log(id, cancel)
        const params = {
            "subservice": "cancel",
            "params": {
                "orderid": id, "cancelreason": cancel
            }
        }
        fetchPost(api.enforcedCompletions, params).then(res => {
            const code = res.code;
            if (code === "1000") {
                Message.open('success', res.message, 3000);
                this.fetchData();
            }
        })
    }

    render() {
        const navList = ['全部', '待审核', '待出库', '已完成', '已取消'];
        return (
            <div className="m-output-wrap">
                <Title title="货损赔偿单"/>
                <QueryPane3 onQuery={this.handleQuery}
                            onExports={this.handleExports}
                            onDateChange={this.handleDateChange}
                            placeholder="订单号/来源单号"
                            selectList={this.state.selectList}
                            largeQueryContent={<LargeQueryContent onClick={this.handleSelectChange}/>}
                            largeQueryHeight="55px"/>
                <div className="m-output-list-wrap">
                    <Tab navList={navList}
                         content={<TabItem dangerList={this.state.dangerList}
                                           onCompletion={this.handleCompletion}/>}
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

export default DangerList;