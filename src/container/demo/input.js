import React,{ Component } from 'react';
import MyInput from '../../components/input';
import Button from '../../components/button';
import './demo.scss'
import { Input } from 'antd';

class Inputs extends Component {
    handleClick = () => {
        console.log(1)
    }

    render () {
        return (
            <div>
                <Input placeholder="Basic usage" style={{width:'200px',height:'38px',borderColor:'#3385ff'}}
                       className="s-input"/>
                <br/>
                <Button className="m-button-default" HtmlValue="登录" HtmlType="submit"/>
                <br/>
                <Button className="m-button-warn" HtmlValue="登录" HtmlType="submit"
                />
                <br/>
                <Button className="m-button-error" HtmlValue="登录" HtmlType="submit"
                />
                <br/>
                <Button className="m-button-primary" HtmlValue="登录" HtmlType="submit"
                />
                <br/>
                普通文本框
                <MyInput type="text" placeholder="请输入用户名"/><br/>
                {/*密码框*/}
                {/*<Input type="password" placeholder="请输入密码"/><br/>*/}
                {/*数值框*/}
                {/*<Input type="number" placeholder="只能输入数字" inputClassName="shuzi" inputStyle={{width:'300px'}}*/}
                       {/*a="1"/><br/>*/}
                {/*文本域*/}
                <Input type="textarea" placeholder="吧吧吧吧啦啦啦啦吧啦吧啦啦啦吧啦吧啦啦吧啦吧"/>
                
                {/*<button className="submit" onClick={this.handleClick}>submit</button>*/}
            </div>
        )
    }
}

export default Inputs