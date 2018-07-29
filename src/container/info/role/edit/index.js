import React,{ Component } from 'react';
import { Form, Input, Tree } from 'antd';
import { withRouter } from 'react-router';
//import { Link } from 'react-router-dom';
import './style.scss';
import Header from '../../../../components/header';
import Title from '../../../../components/title';
import { fetchPost } from "../../../../fetch/fetch";
import api from '../../../../utils/interface';

//import Select from '../../../../components/select';
//import { fetchDynamic } from '../../../../utils/utils';
//import Modal from '../../../../components/modal';

import MyButton from '../../../../components/button';
import Message from "../../../../components/message";
const FormItem = Form.Item;
const { TextArea } = Input;
const TreeNode = Tree.TreeNode;
class RoleEdit extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id:props.match.params.id || false,
            details:{},
            roleName:'',
            remark:'',
            ZtreeMenus:[],
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],
        }
    }

    componentDidMount () {
        this.roleList();
        if(this.state.id){
           this.fetchDetails();
        }
        

    }
    onCheckChange = (checkedValues) => {
      console.log('checked = ', checkedValues);
    }

    // 订单详情
    fetchDetails = () => {
        const params = {
            subservice:"roleInfo",
            params:{
                roleId:this.state.id
            }
        }
        fetchPost(api.allUser,params).then(res => {
            const code = res.code;
            console.log("详情",res)
            if(code === '1000') {
                
                this.setState({
                    roleName:res.data.roleName,
                    
                    
                    remark:res.data.remark,
                    
                    details:res.data,
                    
                })
                


            }
        })
    }
    // 权限列表
    roleList = () => {
        const params = {
            subservice:"powerTree",
            params:{

            }
        }
        if(this.state.id){
            params.params.roleId=this.state.id
        }
      
        fetchPost(api.allUser,params).then(res => {
            const code = res.code;
            console.log("treelist",res.data)
            if(code === '1000') {
                let arr=[];
                for(let v of res.data.pwlist){
                    arr.push(v.id+"")
                }
                this.setState({
                    ZtreeMenus:res.data.ZtreeMenus,
                    checkedKeys:arr,
                })

            }
        })
    }
    //编辑
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err,values) => {
            if(!err) {

                if(this.state.id){
                    values.id=this.state.id;
                }
                const json={
                    "subservice": 'saveRole',
                    "params": {

                    }
                }
                json.params=values;
                let checkeds=[]

                for(let v of this.state.checkedKeys){
                    if(v.slice(0,1) !== '0'){
                        checkeds.push(v)
                    }
                }
                json.params.powerIds=checkeds.join(",");
                this.fetchData(json);
                console.log('Received values of form: ',JSON.stringify(json));
            }
        });
    }
    fetchData = (values) => {
        fetchPost(api.allUser,values).then(res => {
            const code = res.code;
            if(code === "1000") {
                Message.open('success','操作成功',2000);
                this.props.history.push('/m/info/role');
            }
        })
    }


    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
          expandedKeys,
          autoExpandParent: false,
        });
      }

      onCheck = (checkedKeys) => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
      }

      onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        this.setState({ selectedKeys });
      }
      renderTreeNodes = (data) => {
        return data.map((item,i) => {
            
          if (item.children) {
            return (
              <TreeNode title={item.name} key={item.id+""} dataRef={item}>
                {this.renderTreeNodes(item.children)}
              </TreeNode>
            );
          }
          return <TreeNode title={item.name} key={item.id+""} dataRef={item} />;
        });
        
      }


    render () {
        const {details,ZtreeMenus} = this.state;
        //const {onChange} = this.props;
        const { getFieldDecorator } = this.props.form;
        const treeData = ZtreeMenus;

        
        return (
            <div className="m-role-edit-wrap">
                <Header/>
                <div className="m-role-edit-inner">
                {this.state.id?
                <Title title='编辑角色' subTitle={{assgin1:'角色管理',assgin2:'编辑角色',Link:'/m/info/role'}}/>
                : <Title title='新增角色' subTitle={{assgin1:'角色管理',assgin2:'新增角色',Link:'/m/info/role'}}/>
                }

                    <div className="role-edit-content">
                        <div className="edit-role-info">

                            <Form onSubmit={this.handleSubmit} className="save-form">
                                <div className="role-info-content">
                                    <div className="role-con-info">
                                        <div className="pr100">
                                            <p className="user-title">角色信息</p>
                                            <FormItem label="角色名称">
                                                {getFieldDecorator('roleName',{
                                                    initialValue:details.roleName || '',
                                                    rules:[{required:true,message:'请输入正确的名称'}],
                                                })(

                                                        <Input type="text" placeholder="字母或数字,长度不超过五个字符" />

                                                )}
                                            </FormItem>

                                            <FormItem label="备注">
                                                {getFieldDecorator('remark',{
                                                    initialValue:details.remark || '',
                                                    rules:[{required:false,message:''}],
                                                })(
                                                    <TextArea rows={4} placeholder="请输入备注"/>

                                                )}
                                            </FormItem>
                                        </div>

                                    </div>
                                    <div className="role-con-info">
                                        <div className="bor-l pl100" style={{minHeight:'350px'}}>
                                            <p className="cus-title">角色权限</p>
                                            <FormItem>
                                                {getFieldDecorator('powerIds',{
                                                    initialValue: this.state.checkedKeys,
                                                    rules:[{required:true,message:'请选择角色权限'}],
                                                })(
                                                    <Tree
                                                        checkable
                                                        onExpand={this.onExpand}
                                                        expandedKeys={this.state.expandedKeys}
                                                        autoExpandParent={this.state.autoExpandParent}
                                                        onCheck={this.onCheck}
                                                        checkedKeys={this.state.checkedKeys}
                                                        onSelect={this.onSelect}
                                                        selectedKeys={this.state.selectedKeys}
                                                      >
                                                        {this.renderTreeNodes(treeData)}
                                                      </Tree>
                                                )}
                                            </FormItem>
                                        </div>


                                    </div>
                                </div>

                                <FormItem style={{margin:'50px auto 70px auto',textAlign:'center',width:'600px'}}>
                                    <MyButton className="m-button-primary m-login-button" style={{width:'100%'}}
                                            HtmlValue="保存"
                                            HtmlType="submit"/>
                                </FormItem>
                            </Form>

                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

const RoleEdit1 = Form.create()(RoleEdit);
export default withRouter(RoleEdit1);