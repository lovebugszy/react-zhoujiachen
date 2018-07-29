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
        const {inorderList} = this.props;
        const trs = inorderList.map((v, i) => {
            return (
                <tr key={i} className="outList-tr">
                    <td className="td outList-td">
                        <p className="left">{i + 1}</p>
                    </td>
                    <td className="td outList-td">
                        <p className="left">{v.finishTime ? v.finishTime : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.storeName ? v.storeName : '米阳嘉兴仓'}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.orderCode }</p>
                    </td>
                    <td className="td">
                        <p>{v.businessName}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.supplier}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.planNum}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.actualNum ? v.actualNum : '-'}</p>
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
                        <th>入库时间</th>
                        <th>仓库</th>
                        <th>入库单号</th>
                        <th>货主企业</th>
                        <th>供应商</th>
                        <th>计划数量</th>
                        <th>实际入库数量</th>
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