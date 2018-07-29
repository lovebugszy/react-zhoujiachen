import React,{ Component } from 'react';
import { Form, Select, Input, Checkbox } from 'antd';
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
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
class StaffEdit extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id:props.match.params.id || false,
            apiUrl:props.match.params.id?'update':'add',
            details:{},
            roleList:[],        //角色列表
            account:'',
            name:'',
            mobile:'',
            roleType:'',
            remark:'',
            roleId:'',
            type:'',
            selectList:[],          //企业列表
            businessId:[],          //选择的企业id组合
            businessIdAll:[],       //全部企业id组合
            isDisabled:false,       //企业可选
        }
    }

    componentDidMount () {
        if(this.state.id){
           this.fetchDetails();
        }
        this.fetchSelectList();
        this.fetchRoleData();
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
                let newArr=[],newArr1=[];
                for(let v of res.data){
                    let obj={
                        label:v.name,
                        value:v.id,
                    }
                    newArr.push(obj);
                    newArr1.push(v.id);
                }
                this.setState({
                    selectList:newArr,
                    businessIdAll:newArr1,
                })
            }
        })
    }
    //请求角色列表
    fetchRoleData = () => {
        const params = {
            "subservice":"roleList",
            "params":{
                "search":'',
            }
        }

        fetchPost(api.allUser,params).then(res => {
            const code = res.code;
            console.log("roleList",res.data)
            if(code === "1000") {
                this.setState({
                    roleList:res.data,
                })
            }
        })
    };
    onCheckChange = (checkedValues) => {
      console.log('checked = ', checkedValues);
    }
    handleSelectChange = (e) => {
        console.log("select",e)
        
        if(+e.split(",")[0] === 9){
            this.setState({
                isDisabled:true,
                roleType:e.split(",")[0],
                roleId:e.split(",")[1],
                businessId:this.state.businessIdAll,
            })
          
        }else{
            this.setState({
                isDisabled:false,
                roleType:e.split(",")[0],
                roleId:e.split(",")[1],
                businessId:[],
            })
            
        }
         
    }

    // 用户详情
    fetchDetails = () => {
        const params = {
            subservice:"detail",
            params:{
                id:this.state.id
            }
        }
        fetchPost(api.allUser,params).then(res => {
            const code = res.code;
            console.log("详情",res.data)
            if(code === '1000') {
                this.setState({
                    account:res.data.account,
                    name:res.data.name,
                    mobile:res.data.mobile,
                    roleType:res.data.type || '',
                    remark:res.data.remark,
                    roleId:res.data.role && res.data.role.id?res.data.role.id:'',
                    type:res.data.type,
                    businessId: res.data.businessId,
                    details:res.data
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
                    "subservice": this.state.apiUrl,
                    "params": {

                    }
                }
                json.params=values;
                json.params.roleId=this.state.roleId;
                json.params.roleType=this.state.roleType;
                json.params.businessId=json.params.businessId.join(",")

                this.fetchData(json);
                console.log('Received values of form: ',json);
            }
        });
    }
    fetchData = (values) => {
        fetchPost(api.allUser,values).then(res => {
            const code = res.code;
            if(code === "1000") {
                Message.open('success','操作成功',2000);
                this.props.history.push('/m/info/staff');
            }
        })
    }

    render () {
        const {details,selectList,businessId,roleList,roleId} = this.state;
        //const {onChange} = this.props;
        const { getFieldDecorator } = this.props.form;
        console.log("details.account",details)
        const Options = () => {
            return roleList.map((element,i) =>
              <Option key={i} value={element.type+","+element.id}> {element.roleName}</Option>);
          };

        return (
            <div className="m-staff-edit-wrap">
                <Header/>
                <div className="m-staff-edit-inner">
                {this.state.id?
                <Title title='编辑员工' subTitle={{assgin1:'员工管理',assgin2:'编辑员工',Link:'/m/info/staff'}}/>
                : <Title title='新增员工' subTitle={{assgin1:'员工管理',assgin2:'新增员工',Link:'/m/info/staff'}}/>
                }

                    <div className="staff-edit-content">
                        <div className="edit-staff-info">

                            <Form onSubmit={this.handleSubmit} className="save-form">
                                <div className="staff-info-content">
                                    <div className="staff-con-info">
                                        <div className="pr100">
                                            <p className="user-title">用户信息</p>
                                            <FormItem label="账号">
                                                {getFieldDecorator('account',{
                                                    initialValue:this.state.account || '',
                                                    rules:[{required:true,message:'请输入正确的账号'}],
                                                })(
                                                    
                                                    <Input type="text" placeholder="字母或数字,长度不超过五个字符" />
                                                    
                                                )}
                                                <p className="tip">初始默认密码：<span>123456</span></p>
                                            </FormItem>

                                            <FormItem label="姓名">
                                                {getFieldDecorator('name',{
                                                    initialValue:details.name || '',
                                                    rules:[{required:true,message:'请输入正确姓名'}],
                                                })(
                                                    <Input onChange={this.handleNameChange}
                                                           type="text" placeholder="请输入姓名"/>
                                                )}
                                            </FormItem>
                                            
                                            <FormItem label="联系方式">
                                                {getFieldDecorator('mobile',{
                                                    initialValue:details.mobile || '',
                                                    rules:[{required:true,message:'请输入正确的联系方式'}],
                                                })(
                                                    <Input
                                                           type="text" placeholder="请输入联系方式"/>
                                                )}
                                            </FormItem>
                                            <FormItem label="角色">
                                                {getFieldDecorator('roleType',{
                                                    initialValue:details.type && roleId? details.type+","+roleId : '',
                                                    rules:[{required:true,message:'请选择角色'}],
                                                })(
                                                <Select onChange={this.handleSelectChange}>
                                                  {Options()}
                                                </Select>
                                                    
                                                )}
                                            </FormItem>
                                            <FormItem label="备注">
                                                {getFieldDecorator('remark',{
                                                    initialValue:details.remark || '',
                                                    rules:[{required:false,message:'请选择地址'}],
                                                })(
                                                    <Input
                                                           type="text" placeholder="您最多可输入100字"/>
                                                )}
                                            </FormItem>
                                        </div>
                                        
                                    </div>
                                    <div className="staff-con-info">
                                        <div className="bor-l pl100">
                                            <p className="cus-title">用户信息</p>
                                            <FormItem>
                                                {getFieldDecorator('businessId',{
                                                    initialValue: businessId,
                                                    rules:[{required:true,message:'请选择货主'}],
                                                })(
                                                    <CheckboxGroup disabled={this.state.isDisabled} options={selectList} onChange={this.onCheckChange} />
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

const StaffEdit1 = Form.create()(StaffEdit);
export default withRouter(StaffEdit1);