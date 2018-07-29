import React,{ Component } from 'react';
import './login.scss';
import { Form,Icon,Input } from 'antd';
import { fetchPost } from "../../fetch/fetch";
import Button from '../../components/button';
import Message from "../../components/message";
import api from '../../utils/interface';

const FormItem = Form.Item;

class NormalLoginForm extends Component {
    componentDidMount () {
        if(sessionStorage.getItem('m-access-token')) {
            this.props.history.push('/m/business/entry');
        }
        // Message.open('error','服务器发生重大重大错误，请联系开发人员开发人员开发人员',2000);
        //document.addEventListener("keydown",this.handleEnterKey);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err,values) => {
            if(!err) {
                this.fetchData(values);
                console.log('Received values of form: ',values);
            }
        });
    }

    fetchData = (values) => {
        fetchPost(api.login,values).then(res => {
            const code = res.code;
            if(code === "1000") {
                console.log(this.props)
                sessionStorage.setItem('m-access-token',encodeURI(JSON.stringify(res.data)))
                this.props.history.push('/m/business/entry');
            } else {
                // 待考虑 是否全局处理
            }
        })
    }

    componentWillUnmount () {
        document.removeEventListener("keydown",this.handleEenterKey);
    }

    handleEnterKey = (e) => {
        if(e.keyCode === 13) {
            this.handleSubmit(e);
        }
    }

    render () {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="m-login-wrap">
                <div className="m-login-inner">
                    <div className="login-form-wrap">
                        <span className="m-logo"/>
                        <div className="form-wrap">
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <FormItem style={{margin:'0 auto'}}>
                                    {getFieldDecorator('account',{
                                        rules:[{required:true,message:'请输入正确的用户名'}],
                                    })(
                                        <Input prefix={<Icon type="user" style={{color:'#EEEEEE',fontSize:30,}}/>}
                                               placeholder="请输入用户名" onKeyUp={this.handleEnterKey}/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password',{
                                        rules:[{required:true,message:'请输入正确的密码'}],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{color:'#EEEEEE',fontSize:30,}}/>}
                                               type="password" placeholder="请输入密码" onKeyUp={this.handleEnterKey}/>
                                    )}
                                </FormItem>
                                <a className="login-form-forgot" href="">忘记密码？</a>
                                <FormItem style={{marginTop:'96px'}}>
                                    <Button className="m-button-primary m-login-button"
                                            HtmlValue="登录"
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

const Login = Form.create()(NormalLoginForm);
export default Login;