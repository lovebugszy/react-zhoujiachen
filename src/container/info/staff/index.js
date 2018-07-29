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

class staffList extends Component {
    constructor () {
        super();
        this.state = {
            content:0,
            count:0,                // 总条数
            search:'',              // 请输入单号/来源单号/供应商名称
            pageindex:1,            // 当前页
            pageSize:10,             // 当前条数
            staffList:[],         // 数据列表
            
        }
    }

    componentDidMount () {
        this.fetchData();
    }


    // 请求数据列表
    fetchData = () => {
        const params = {
            "subservice":"list",
            "params":{
                "search":this.state.search,
                "page":this.state.pageindex,
                 "size":this.state.pageSize,
            }
        }

        fetchPost(api.allUser,params).then(res => {
            const code = res.code;
            console.log(res)
            if(code === "1000") {
                this.setState({
                    staffList:res.data.data,
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
                    staffList:res.data.data,
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


    // 重置
    handleResetP = (id) => {
        console.log(id)
        const params = {
            "subservice":"resetpassword",
            "params":{
                "id":id,
            }
        }
        console.log(params)
        fetchPost(api.allUser,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                Message.open('success','重置密码成功！已恢复初始密码：123456',3000);
                this.fetchData();
            }
        })
    }
    // 禁用启用
    handleForbidden = (id,status) => {
        console.log(id);
        const params = {
            "subservice":"delete",
            "params":{
                "id":id,
                "status":"",
            }
        }
        if(status === '禁用'){
            params.params.status=1;
        }else if(status === '启用'){
            params.params.status=0;
        }
        
        console.log(params)
        fetchPost(api.allUser,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                Message.open('success',res.message,3000);
                this.fetchData();
            }
        })
    }

    render () {
       // const navList = ['全部','待审核','退货中','已完成','已取消'];
        return (
            <div className="m-entry-wrap">
                <Title title="员工管理"/>
                <QueryPanel3 onQuery={this.handleQuery}
                            onExports={this.handleExports}
                            placeholder="账号/姓名/联系方式"
                            addLink="/staffadd"
                            />
                <div className="m-entry-list-wrap">
                     
                    <TabItem staffList={this.state.staffList}
                                           onResetP={this.handleResetP} 
                                           onForbidden={this.handleForbidden}
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

export default withRouter(staffList)