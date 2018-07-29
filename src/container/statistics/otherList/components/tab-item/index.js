/**
 * Created by Administrator on 2018/7/19.
 */
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
        const {otherReportList} = this.props;
        const trs = otherReportList.map((v, i) => {
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
                        <p>{v.orderCode }</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.storeName ? v.storeName : '米阳嘉兴仓'}</p>
                    </td>
                    <td className="td">
                        <p>{v.businessName}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.reason ? v.reason : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.processingMethod ? v.processingMethod : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.actualGoodsCount ? v.actualGoodsCount : '-'}</p>
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
                        <th>出库日期</th>
                        <th>处理单号</th>
                        <th>仓库</th>
                        <th>货主企业</th>
                        <th>处理原因</th>
                        <th>处理方式</th>
                        <th>实际处理数量</th>
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