import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './style.scss';
import MyButton from '../../../../../components/button';
import Empty from '../../../../../components/empty';
class TabItem extends Component {
    // 调用强制完成接口
    onCompletion = (id) => {
        const {onCompletion} = this.props;
        onCompletion && onCompletion(id);
    }


    render() {
        const {reportEntryList} = this.props;
        const trs = reportEntryList.map((v, i) => {
            return (
                <tr key={i} className="outList-tr">
                    <td className="td outList-td">
                        <p className="left">{i + 1}</p>
                    </td>
                    <td className="td outList-td">
                        <p className="left">{v.rewriteTime ? v.rewriteTime : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p className="left">{v.clientName}</p>
                    </td>
                    <td className="td outList-td">
                        <p className="left">{v.businessName}</p>
                    </td>
                    <td className="td outList-td">
                        <p >{v.orderCode}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.rewriteCount ? v.rewriteCount : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p className="red">￥{v.rewriteMomeny ? v.rewriteMomeny : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.rejectOrderCode ? v.rejectOrderCode : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.rejectGoodsCount ? v.rejectGoodsCount : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p className="red">￥{v.rejectGoodsMoney ? v.rejectGoodsMoney : '-'}</p>
                    </td>

                </tr>
            )
        })
        return (
            <div className="m-table-list-wrap">
                <table border="1" style={{border: 'none'}}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>配送日期</th>
                        <th>客户名称</th>
                        <th>货主企业</th>
                        <th>订单</th>
                        <th>出库数量</th>
                        <th>订单金额</th>
                        <th>拒收单</th>
                        <th>拒收数量</th>
                        <th>拒收金额</th>
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