/**
 * Created by Administrator on 2018/7/16.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './style.scss';
import MyButton from '../../../../../components/button';
import Empty from '../../../../../components/empty';
class TabItem extends Component {

    state = {
        //openModal:false,
        id:'',
    }
    // 调用审核接口
    onCompletion = (id) => {
        const {onCompletion} = this.props;
        onCompletion && onCompletion(id);
    }

    render () {
        const {reportList} = this.props;
        console.log(this.props)
        const trs = reportList.map((v,i) => {
            const otds = (v.OUTORDER).map((item,j) => {
                return (
                    <p className="tablep" key={j}>{item.orderCode}</p>
                )
            })
            const ntds = (v.OUTORDER).map((item,j) => {
                return (
                    <p className="tablep" key={j}>{item.goodsNum}件</p>
                )
            })
            const mtds = (v.OUTORDER).map((item,j) => {
                return (
                    <p className="tablep" key={j}>￥{item.money}</p>
                )
            })
            const retds = (v.ORDER).map((item,j) => {
                return (
                    <p className="tablep" key={j}>{item.orderCode}</p>
                )
            })
            const rentds = (v.ORDER).map((item,j) => {
                return (
                    <p className="tablep" key={j}>{item.goodsNum}件</p>
                )
            })
            const remtds = (v.ORDER).map((item,j) => {
                return (
                    <p className="tablep" key={j}>￥{item.money}</p>
                )
            })
            return (
                <tr key={i}>
                    <td className="td" style={{width:'200px'}}>
                        {v.outOrderTime}
                    </td>
                    <td className="td" style={{textAlign:'left'}}>
                        {v.clientName}
                    </td>
                    <td className="td" style={{textAlign:'left'}}>
                        {v.name}
                    </td>
                    <td className="td">
                        {otds ? v.orderCode : '-'}
                    </td>
                    <td className="td" style={{minWidth:'80px'}}>
                        {ntds ? v.money : '-'}
                    </td>
                    <td className="td" style={{minWidth:'80px'}}>
                        {mtds ? v.goodsNum : '-'}
                    </td>
                    <td className="td">
                        {retds }
                    </td>
                    <td className="td" style={{minWidth:'80px'}}>
                        {rentds  }
                    </td>
                    <td className="td" style={{minWidth:'80px'}}>
                        {remtds  }
                    </td>
                    <td className="td">
                        {v.otherDeductible}
                    </td>
                    <td className="td">
                        {v.otherReceivables}
                    </td>
                    <td className="td">
                        {v.actualReceipts}
                    </td>
                    <td className="td">
                        {v.paymentMethod}
                    </td>
                    <td className="td" style={{textAlign:'left'}}>
                        {v.remark}
                    </td>
                </tr>
            )
        })
        return (
            <div className="m-table-list-wrap collect-table">
                <table border="1" style={{border:'none'}}>
                    <thead>
                    <tr>
                        <th>配送日期</th>
                        <th>客户名称</th>
                        <th>货主企业</th>
                        <th>订单</th>
                        <th>出库数量</th>
                        <th>订单金额</th>
                        <th>退货单</th>
                        <th>退货数量</th>
                        <th>实退金额</th>
                        <th>其他抵扣</th>
                        <th>其他收款</th>
                        <th>实际收款</th>
                        <th>支付方式</th>
                        <th>备注</th>
                    </tr>
                    </thead>
                    <tbody>
                    {trs.length > 0 ? trs : <Empty/>}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default TabItem;