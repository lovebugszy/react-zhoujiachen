import React,{ Component } from 'react';
import { withRouter } from "react-router-dom";
import './style.scss';
import Title from '../../../components/title';
import QueryPanel3 from '../../../components/query-panel3';
import api from '../../../utils/interface'
import TabItem from './components/tab-item';
import { fetchPost } from "../../../fetch/fetch";
import { Pagination } from 'antd';
import Message from "../../../components/message";

class roleList1 extends Component {
    constructor () {
        super();
        this.state = {
            content:0,
            count:0,                // 总条数
            search:'',              // 请输入角色名称
            pageindex:1,            // 当前页
            pageSize:10,             // 当前条数
            roleList:[],         // 数据列表
        }
    }

    componentDidMount () {
        this.fetchData();
        
    }


    // 请求数据列表
    fetchData = () => {
        const params = {
            "subservice":"roleList",
            "params":{
                "search":this.state.search,
                "pageIndex":this.state.pageindex,
                 "pageSize":this.state.pageSize,
            }
        }

        fetchPost(api.allUser,params).then(res => {
            const code = res.code;
            console.log("res111",res)
            if(code === "1000") {
                this.setState({
                    roleList:res.data.orderList,
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
            console.log(res)
            if(code === "1000") {
                console.log(res)
                this.setState({
                    roleList:res.data.data,
                    count:res.data.count
                })
            }
        })
    }

    // 点击查询
    handleQuery = (v) => {
        console.log(v)
        this.setState({
            search:v.oddNumber,   // 请输入单号/来源单号/供应商名称
            //businessId:v.enterprise.id,
        },() => {
            this.fetchData();
        })
    }

    // 点击导出
    handleExports = (v) => {
        this.setState({
            search:v.oddNumber,              // 请输入单号/来源单号/供应商名称
        },() => {
            this.exports()
        })
    }

    // 删除
    handleForbidden = (id) => {
        console.log(id);
        const params = {
            "subservice":"deleteRole",
            "params":{
                "roleId":id
                
            }
        }
        console.log(params)
        fetchPost(api.allUser,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                Message.open('success','操作成功',2000);
                this.fetchData();
            }
        })
    }

    render () {
        return (
            <div className="m-entry-wrap">
                <Title title="角色管理"/>
                <QueryPanel3 onQuery={this.handleQuery}
                            onExports={this.handleExports}
                            placeholder="请输入角色名称"
                            addLink="/roleadd"
                            />
                <div className="m-entry-list-wrap">
                    <TabItem roleList={this.state.roleList}
                                           onDel={this.handleForbidden}
                                           />
                         
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

export default withRouter(roleList1)