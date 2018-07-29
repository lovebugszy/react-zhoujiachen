/**
 * Created by Administrator on 2018/7/9.
 */
import React, {Component} from 'react';
import './style.scss';
import {Radio} from 'antd';

const RadioGroup = Radio.Group;

class Receivablesgoods extends Component {
    constructor(props) {
        super(props);
        this.state = {
            afterSaleList: props.list,
            value: {}
        }
    }

    onChange = (e) => {
        let {onClick} = this.props;
        this.setState({
            value: e.target.value,
        }, () => {
            onClick && onClick(e.target.value)
        });
    }

    render() {
        const {list} = this.props;
        const lis = list.map((v, i) => {
            return <li key={i}>
                <Radio value={v}/>
                <p className="top clearfix">
                    <span className="id">{v.orderCode}</span>
                    <span className="money">实际退款:
                        <b>
                            ¥{v.actualMoney === null || v.actualMoney === undefined || v.actualMoney === ''
                            ? v.refund : v.actualMoney}
                        </b>
                    </span>
                </p>
                <p className="desc bottom">{v.clientName}</p>
            </li>
        })
        return (
            <div className="m-after-sale-wrap">
                <RadioGroup onChange={this.onChange} value={this.state.value}>
                    <ul className="clearfix">
                        {lis}
                    </ul>
                </RadioGroup>
            </div>
        )
    }
}

export default Receivablesgoods;