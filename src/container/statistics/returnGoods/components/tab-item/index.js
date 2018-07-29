/**
 * Created by Administrator on 2018/7/17.
 */
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
        const {sellReportList} = this.props;
        const trs = sellReportList.map((v, i) => {
            return (
                <tr key={i} className="outList-tr">
                    <td className="td outList-td">
                        <p className="left">{i + 1}</p>
                    </td>
                    <td className="td outList-td">
                        <p className="left">{v.auditTime ? v.auditTime : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p className="left">{v.rewriteTime ? v.rewriteTime : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.storeName ? v.storeName : '米阳嘉兴仓'}</p>
                    </td>
                    <td className="td">
                        <p>{v.businessName}</p>
                    </td>

                    <td className="td outList-td">
                        <p>{v.clientName}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.orderCode }</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.dcType}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.isUpOrder}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.goodsCount ? v.goodsCount : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.actualGoodsCount ? v.actualGoodsCount : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.actualMoney  ? v.actualMoney : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.salemanName ? v.salemanName : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.processingInstructions ? v.processingInstructions : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.remark ? v.remark : '-'}</p>
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
                        <th>审核时间</th>
                        <th>入库日期</th>
                        <th>仓库</th>
                        <th>货主企业</th>
                        <th>客户名称</th>
                        <th>退货单号</th>
                        <th>配送方式</th>
                        <th>是否改单</th>
                        <th>计划退货数量</th>
                        <th>实际退货数量</th>
                        <th>实际退款</th>
                        <th>业务员</th>
                        <th>备注</th>
                        <th>收货说明</th>
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