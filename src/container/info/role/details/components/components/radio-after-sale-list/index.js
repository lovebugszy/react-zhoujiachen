import React,{ Component } from 'react';
import './style.scss';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

class RadioAfterSaleList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            afterSaleList:props.list,
            value:{}
        }
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
        const {list} = this.props;
        const lis = list.map((v,i) => {
            return <li key={i}>
                <Radio value={v.id}/>
                
                    <span className="id">{v.roleName}</span>
                    
                
                <span className="desc bottom">{v.remark}</span>
            </li>
        })
        return (
            <div className="m-after-sale-wrap m-role-user-wrap">
                <RadioGroup onChange={this.onChange} value={this.state.value}>
                    
                    <ul className="clearfix">
                        <li className="role-title">
                           <span>角色名称</span>
                            <span>备注</span> 
                        </li>
                        {lis}
                    </ul>
                </RadioGroup>
            </div>
        )
    }
}

export default RadioAfterSaleList;