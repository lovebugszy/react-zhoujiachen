import React,{ Component } from 'react';
import { withRouter } from "react-router-dom";
import './style.scss';
import Title from '../../../components/title';
import QueryPanel2 from '../../../components/query-panel2';
import api from '../../../utils/interface'
//import LargeQueryContent from './components/large-query-content';
import TabItem from './components/tab-item';
import { fetchPost } from "../../../fetch/fetch";
import { Pagination } from 'antd';
import Message from "../../../components/message";

class CollectList extends Component {
    constructor () {
        super();
        this.state = {
            content:0,
            selectList:[],          // 选择企业列表
            count:0,                // 总条数
            businessId:'',          // 企业id
            search:'',              // 请输入单号/来源单号/供应商名称
            pageindex:1,            // 当前页
            pageSize:10,             // 当前条数
            cOrderList:[],         // 数据列表
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
                "search":this.state.search,
                "page":this.state.pageindex,
                "size":this.state.pageSize,
                "businessId":this.state.businessId
            }
        }

        fetchPost(api.Receivablesorder,params).then(res => {
            const code = res.code;
            console.log(res.data.data)
            if(code === "1000") {
                this.setState({
                    cOrderList:res.data.data,
                    count:res.data.params.count
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
                    cOrderList:res.data.inOrderList,
                    count:res.data.count
                })
            }
        })
    }
    //详情
    handleDetail = (id) => {
        console.log(`/m/business/collectList/details/${id}`)
        this.props.history.push(`/m/business/collectlist/details/${id}`);
    }
    //编辑
    //
    handleEdit = (id) => {
        this.props.history.push(`../../m/business/output/receiptedit/${id}`);
    }
    
    // 点击查询
    handleQuery = (v) => {
        console.log(v)
        this.setState({
            search:v.oddNumber,   // 请输入单号/来源单号/供应商名称
            //startcreatetime:v.date[0],
            //endcreatetime:v.date[1],
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

    // 审核
    handleCompletion = (id) => {
        console.log(id)
        const params = {
            "subservice":"confirm",
            "params":{
                "id":id,
            }
        }
        console.log(params)
        fetchPost(api.Receivablesorder,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                Message.open('success',res.message,3000);
                this.fetchData();
            }
        })
    }

    render () {
        //const navList = ['全部','待审核','退货中','已完成','已取消'];
        return (
            <div className="m-entry-wrap">
                <Title title="代收货款"/>
                <QueryPanel2 onQuery={this.handleQuery}
                            onExports={this.handleExports}
                            
                            selectList={this.state.selectList} 
                            placeholder="订单号/客户名称"
                            />
                <div className="m-entry-list-wrap">
                    <TabItem cOrderList={this.state.cOrderList}
                            onCompletion={this.handleCompletion}
                            onEdit={this.handleEdit}
                            onDetail={this.handleDetail}/>
                        
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

export default withRouter(CollectList)