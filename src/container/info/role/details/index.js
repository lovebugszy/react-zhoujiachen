import React,{ Component } from 'react';
//import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './style.scss';
import Header from '../../../../components/header';
import Title from '../../../../components/title';
import { fetchPost } from "../../../../fetch/fetch";
import api from '../../../../utils/interface';
import TabItem from './components/tab-item';
import { Pagination } from 'antd';
import Message from "../../../../components/message";
//import { fetchDynamic } from '../../../../utils/utils';
//import Modal from '../../../../components/modal';

class RoleDetail extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id:props.match.params.id,
            details:{},
            roleUserList:[],
            rolelist1:[],
            count:0,                // 总条数
            pageindex:1,            // 当前页
            pageSize:10,             // 当前条数
            openModal:false,
        }
    }

    componentDidMount () {
        this.fetchData();
        this.fetchUserData();
    }
    
    // 角色用户列表
    fetchData = () => {
        const params = {
            subservice:"roleUser",
            params:{
                roleId:this.state.id,
                pageIndex:this.state.pageindex,
                pageSize:this.state.pageSize,
            }
        }
        console.log(params)
        fetchPost(api.allUser,params).then(res => {
            const code = res.code;
            console.log("接口返回的",res.data.orderList)
            if(code === '1000') {
                this.setState({
                    
                    roleUserList:res.data.orderList,
                    count:res.data.pageTotal,
                })
            }
        })
    }
    // 请求角色数据列表
    fetchUserData = () => {
        const params = {
            "subservice":"roleList",
            "params":{
                "search":"",
                
            }
        }

        fetchPost(api.allUser,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                this.setState({
                    rolelist1:res.data,
                    
                })
            }
        })
    };
    handleChangeRole = (userid,roleid) =>{
        const params = {
            "subservice":"userrelrole",
            "params":{
                "userId":userid,
                "roleId":roleid,
            }
        }

        fetchPost(api.allUser,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                Message.open('success','操作成功',3000);
                this.fetchData();
            }
        })
    }
    render () {
        const {roleUserList} = this.state;
        console.log("thislist333",roleUserList)
        return (
            <div className="m-user-list-wrap">
                <Header/>
                <div className="m-output-detail-inner">
                    <Title title="角色用户" subTitle={{assgin1:'角色管理',assgin2:'角色用户',Link:'/m/info/role'}}/>

                    
                        <div className="output-detail-content">
                            <TabItem roleUser={this.state.roleUserList} rolelist1={this.state.rolelist1}
                                           onChangeRole={this.handleChangeRole}
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
            </div>
        )
    }
}

export default RoleDetail;