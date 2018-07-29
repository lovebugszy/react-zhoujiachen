import React,{ Component } from 'react';
import './style.scss';
import Title from '../../../components/title';
import QueryPanel from '../../../components/query-panel';
import { fetchPost } from "../../../fetch/fetch";
import api from '../../../utils/interface'
import Tab from '../../../components/tabs';
import TabItem from './components/tab-item';
import { Pagination } from 'antd';
import LargeQueryContent from './components/large-query-content';
import Message from "../../../components/message";

class Output extends Component {
    constructor (props) {
        super(props)
        this.state = {
            content:0,
            selectList:[],          // 选择企业列表

            count:0,                // 总条数
            businessId:'',          // 企业id
            servType:'',             // 选择入库类型
            storeCode:'JX',         // 仓库名称
            keyword:'',             // 出库单号/来源单号/供应商名称
            startTime:'',           // 开始日期
            endTime:'',             // 结束日期
            orderStatus:'',         // 订单状态
            isReceive:'',           // 是否需要代收货款
            quality:'',             // 商业性质     -----   此查询条件 暂时无用 待后端修改
            pageindex:1,            // 当前页
            pageSize:10,             // 当前条数
            outputList:[],          // 数据列表
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
                "businessId":this.state.businessId || "",
                "keyword":this.state.keyword,
                "servType":this.state.servType,
                "isReceive":this.state.isReceive,
                "storeCode":this.state.storeCode,
                "orderStatus":this.state.orderStatus,
                "startTime":this.state.startTime || "",
                "endTime":this.state.endTime || "",
                "quality":this.state.quality,
                "page":{
                    "pageIndex":this.state.pageindex,
                    "pageSize":this.state.pageSize
                }
            }
        }
        console.log("query",params)

        fetchPost(api.outputList,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                this.setState({
                    outputList:res.data.dataList,
                    count:res.data.pageCount
                })
            }
        })
    };

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
                this.orderStatusChange(3);
                break;
            case 5:
                this.orderStatusChange(4);
                break;
            case 6:
                this.orderStatusChange(8);
                break;
            case 7:
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
        this.setState({
            keyword:v.oddNumber,   // 请输入单号/来源单号/供应商名称
            startTime:v.date[0],
            endTime:v.date[1],
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
            storeCode:'JX',
            isReceive:v.isReceive,
            quality:v.quality,
        })
    }
    //取消订单
    handleCancelOrder = (id,reason) => {
        console.log(id,reason)
        const params = {
            "subservice":"cancel",
            "params":{
                "orderid":id,
                "reason":reason,
            }
        }
        console.log(params)
        fetchPost(api.outputList,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                Message.open('success',res.message,3000);
                this.fetchData();
            }
        })
    }
    // 时间变化
    handleDateChange = (v) => {
        this.setState({
            startTime:v.date[0],
            endTime:v.date[1]
        })
    }

    // 列表按钮点击
    handleCompletion = (id,type) => {
        const {history} = this.props;
        if(type === '签收') {
            history.push(`/m/business/output/signin/${id}`);
        } else if(type === '覆盖签收') {
            this.checkSign(id)
        } else if(type === '新增收款单') {
            history.push(`/m/business/output/receipt/${id}`);
        }
    }

    // 覆盖签收校验
    checkSign = (id) => {
        const params = {
            "subservice":"signConfim",
            "params":{
                "orderId":id
            }
        }
        fetchPost(api.outputCheckSign,params).then(res => {
            const code = res.code;
            const {history} = this.props;
            if(code === '1000') {
                history.push(`/m/business/output/signin/${id}`);
            }
        })
    }

    render () {
        const navList = ['全部','待审核','待发货','拣货中','待签收','正常完成','异常完成','已取消'];
        return (
            <div className="m-output-wrap">
                <Title title="出库订单"/>
                <QueryPanel onQuery={this.handleQuery}
                            onExports={this.handleExports}
                            onDateChange={this.handleDateChange}
                            selectList={this.state.selectList}
                            largeQueryContent={<LargeQueryContent onClick={this.handleSelectChange}/>}
                            largeQueryHeight="185px"/>
                <div className="m-output-list-wrap">
                    <Tab navList={navList}
                         content={<TabItem outputList={this.state.outputList}
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

export default Output;