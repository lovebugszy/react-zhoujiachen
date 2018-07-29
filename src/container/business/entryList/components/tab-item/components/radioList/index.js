import React,{ Component } from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

class RadioList extends Component {
    state = {
        value:1,
    }
    onChange = (e) => {
        console.log('radio checked',e.target.value);
        const {onChange} = this.props;
        this.setState({
            value:e.target.value,
        },() => {
            let value;
            switch(this.state.value) {
                case 1:
                    value = '下错单/重复下单';
                    break;
                case 2:
                    value = '取消采购计划';
                    break;
                case 3:
                    value = '其他';
                    break;
                default:
            }
            onChange && onChange(value);
        });
    }

    render () {
        const radioStyle = {
            display:'block',
            height:'30px',
            lineHeight:'30px',
            paddingLeft:'120px',
        };
        return (
            <div>
                <RadioGroup onChange={this.onChange} value={this.state.value} style={{width:'100%'}}>
                    <Radio style={radioStyle} value={1}>下错单/重复下单</Radio>
                    <Radio style={radioStyle} value={2}>取消采购计划</Radio>
                    <Radio style={radioStyle} value={3}>其他</Radio>
                </RadioGroup>
            </div>
        )
    }
}

export default RadioList;