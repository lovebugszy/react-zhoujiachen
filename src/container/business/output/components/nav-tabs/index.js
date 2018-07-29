import React,{ Component } from 'react';
import './style.scss';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

class NavTabs extends Component {
    state = {
        value:4, //签收类型 4:正常签收,5客户拒收,6:部分签收,8:异常出库处理
    }
    onChange = (e) => {
        let {onClick} = this.props;
        this.setState({
            value:e.target.value,
        },() => {
            onClick && onClick(e.target.value)
        });
    }

    render () {
        return (
            <div className="m-sign-in-nav-wrap">
                <div className="sign-nav-inner clearfix">
                    <span>签收状态</span>
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <ul className="clearfix">
                            <li>
                                <Radio value={4}>正常签收</Radio>
                            </li>
                            <li>
                                <Radio value={6}>部分签收</Radio>
                            </li>
                            <li>
                                <Radio value={5}>全部拒收</Radio>
                            </li>
                            <li>
                                <Radio value={8}>异常出库处理</Radio>
                            </li>
                        </ul>
                    </RadioGroup>
                </div>
            </div>
        )
    }
}

export default NavTabs