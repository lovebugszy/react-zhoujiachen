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

class MestoreList extends Component {
    constructor () {
        super();
        this.state = {
            content:0,
            count:0,                // 总条数
            search:'',              // 请输入
            pageindex:1,            // 当前页
            pageSize:10,             // 当前条数
            mestoreList:[],         // 数据列表
        }
    }

    componentDidMount () {
        this.fetchData();
    }


    // 请求数据列表
    fetchData = () => {
        const params = {
            "subservice":"query",
            "params":{
                "search":this.state.search,
                "pageSize":this.state.pageSize,
                "pageIndex":this.state.pageindex,
            }
        }

        fetchPost(api.Mestore,params).then(res => {
            const code = res.code;
            console.log("仓库",res)
            if(code === "1000") {
                this.setState({
                    mestoreList:res.data.orderList,
                    count:res.data.pageTotal
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


    // 删除
    handleDel = (id) => {
        console.log(id)
        const params = {
            "subservice":"delstore",
            "params":{
                "id":id,
            }
        }
        console.log(params)
        fetchPost(api.Mestore,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                Message.open('success','操作成功',3000);
                this.fetchData();
            }
        })
    }

    handleLink = () => {
        const {history} = this.props;
        history.push(`/m/info/warehouse/add`);
        
    }
    handleEdit = (id) => {
        const {history} = this.props;
        history.push(`/m/info/warehouse/edit/${id}`);
    }

    

    render () {
       // const navList = ['全部','待审核','退货中','已完成','已取消'];
        return (
            <div className="m-entry-wrap">
                <Title title="仓库管理"/>
                <QueryPanel3 onQuery={this.handleQuery}
                            onExports={this.handleExports}
                            placeholder="仓库名称/仓库编号"
                            onLink={this.handleLink}
                            
                            />
                <div className="m-entry-list-wrap">
                    <TabItem mestoreList={this.state.mestoreList}

                                           onDel={this.handleDel}
                                           onEdit={this.handleEdit}
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

export default withRouter(MestoreList)