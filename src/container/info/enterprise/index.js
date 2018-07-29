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

class EnterpriseList extends Component {
    constructor () {
        super();
        this.state = {
            content:0,
            count:0,                // 总条数
            businessId:'',          // 企业id
            search:'',              // 请输入单号/来源单号/供应商名称
            pageindex:1,            // 当前页
            pageSize:10,             // 当前条数
            enterpriseList:[],         // 数据列表
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

        fetchPost(api.Enterprise,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                this.setState({
                    enterpriseList:res.data.data,
                    count:res.data.params.count
                })
            }
        })
    };



    // 点击查询
    handleQuery = (v) => {
        console.log(v)
        this.setState({
            search:v.oddNumber,   // 请输入单号/来源单号/供应商名称
            businessId:v.enterprise.id,
        },() => {
            this.fetchData();
        })
    }


    // 删除企业
    // handleDel = (id) => {
    //     console.log(id)
    //     const params = {
    //         "subservice":"push",
    //         "params":{
    //             "orderid":id,
    //         }
    //     }
    //     console.log(params)
    //     fetchPost(api.afterSale,params).then(res => {
    //         const code = res.code;
    //         if(code === "1000") {
    //             Message.open('success',res.message,3000);
    //             this.fetchData();
    //         }
    //     })
    // }

    handleExports = () => {
        //const {history} = this.props;


        //history.push(`/m/info/enterprise/edit`);
        //this.props.history.push('/m/info/enterprise/edit');
    }
    //重置密码

    handResetP = (id,code) => {
        console.log(id)
        const params = {
            "subservice":"resetpassword",
            "params":{
                "id":id,
                "code":code,
            }
        }
        console.log(params)

        fetchPost(api.Enterprise,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                Message.open('success','重置密码成功！已恢复初始密码：123456',3000);
                this.fetchData();
            }
        })
    }

    render () {
       // const navList = ['全部','待审核','退货中','已完成','已取消'];
        return (
            <div className="m-entry-wrap">
                <Title title="企业管理"/>
                <QueryPanel3 onQuery={this.handleQuery}
                            onExports={this.handleExports}
                            placeholder="企业名称/企业编号"
                            />
                <div className="m-entry-list-wrap">
                    <TabItem enterpriseList={this.state.enterpriseList}

                                           onResetP={this.handResetP}
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

export default withRouter(EnterpriseList)