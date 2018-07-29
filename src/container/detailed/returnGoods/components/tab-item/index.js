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
                        <p className="left">{v.auditTime ? v.auditTime : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p className="left">{v.rewriteTime ? v.rewriteTime : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p className="owner3">{v.goodsName}</p>
                        <p className="owner4">{v.barcode} </p>
                        <p className="owner4"> ({v.goodsPackage ? v.goodsPackage : '' },{v.goodsUnit ? v.goodsUnit : ''},{v.goodsSpec ? v.goodsSpec : ''})</p>
                    </td>
                    <td className="td outList-td">
                        <p className="left">{v.produceDate ? v.produceDate : '-'}</p>
                    </td>
                    <td className="td ">
                        <p className="left">{v.batchNum ? v.batchNum : '-' }</p>
                    </td>
                    <td className="td ">
                        <p className="red left">￥{v.backMoney ? v.backMoney : '-' }</p>
                    </td>
                    <td className="td outList-td">
                        <p className="left">{v.clientName}</p>
                    </td>
                    <td className="td">
                        <p className="left">{v.businessName}</p>
                    </td>
                    <td className="td outList-td">
                        <p className="left">{v.storeName ? v.storeName : '米阳嘉兴仓'}</p>
                    </td>
                    <td className="td outList-td">
                        <p className="left">{v.orderCode }</p>
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
                        <th>审核日期</th>
                        <th>退货入库日期</th>
                        <th>商品</th>
                        <th>生产日期</th>
                        <th>实际入库数量</th>
                        <th>实退金额</th>
                        <th>客户名称</th>
                        <th>货主企业</th>
                        <th>仓库</th>
                        <th>退货单号</th>
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