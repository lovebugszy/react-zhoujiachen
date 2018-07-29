import React,{ Component } from 'react';
import { Radio, Input } from 'antd';

const { TextArea } = Input;
const RadioGroup = Radio.Group;

class radioList2 extends Component {
    state = {
        value:1,
        other:"",
        isvisible:'none'
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
                    this.setState({
                        isvisible:'none',
                    })
                    break;
                case 2:
                    value = '库存不足';
                    this.setState({
                        isvisible:'none',
                    })
                    break;
                case 3:
                    value = '客户不要了';
                    this.setState({
                        isvisible:'none',
                    })
                    break;
                case 4:
                    value = '取消销售计划';
                    this.setState({
                        isvisible:'none',
                    })
                    break;
                case 5:
                    value = '其他:'+this.state.other;
                    this.setState({
                        isvisible:'block',
                    })
                    break;
                default:
            }
            onChange && onChange(value);
        });
    }
    onTextChange = (e) => {
        const {onChange} = this.props;
        this.setState({
            other:e.target.value,
        },() => {
            let value;
            switch(this.state.value) {
                case 1:
                    value = '下错单/重复下单';
                    this.setState({
                        isvisible:'none',
                    })
                    break;
                case 2:
                    value = '库存不足';
                    this.setState({
                        isvisible:'none',
                    })
                    break;
                case 3:
                    value = '客户不要了';
                    this.setState({
                        isvisible:'none',
                    })
                    break;
                case 4:
                    value = '取消销售计划';
                    this.setState({
                        isvisible:'none',
                    })
                    break;
                case 5:
                    value = '其他:'+this.state.other;
                    this.setState({
                        isvisible:'block',
                    })
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
            <div style={{paddingTop:'10px'}}>
                <RadioGroup onChange={this.onChange} value={this.state.value} style={{width:'100%'}}>
                    <Radio style={radioStyle} value={1}>下错单/重复下单</Radio>
                    <Radio style={radioStyle} value={2}>库存不足</Radio>
                    <Radio style={radioStyle} value={3}>客户不要了</Radio>
                    <Radio style={radioStyle} value={4}>取消销售计划</Radio>
                    <Radio style={radioStyle} value={5}>其他</Radio>
                </RadioGroup>
                <div style={{textAlign:'center',display:this.state.isvisible}}>
                    <TextArea placeholder="请输入原因" onChange={this.onTextChange} rows={2} style={{width:'300px'}} />
                </div>
                
            </div>
        )
    }
}

export default radioList2;