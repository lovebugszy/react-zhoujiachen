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
        const {reportJectList} = this.props;
        const trs = reportJectList.map((v, i) => {
            return (
                <tr key={i} className="outList-tr">
                    <td className="td outList-td">
                        <p className="left">{i + 1}</p>
                    </td>
                    <td className="td outList-td">
                        <p className="left">{v.outTime ? v.outTime : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p className="left">{v.rewriteTime ? v.rewriteTime : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p className="left">{v.saleManName ? v.saleManName : '-'}</p>
                    </td>
                    <td className="td">
                        <p>{v.clientName}</p>
                    </td>
                    <td className="td outList-td">
                        <p className="owner3">{v.goodsName}</p>
                        <p className="owner4">{v.barcode} </p>
                        <p className="owner4"> ({v.goodsPackage ? v.goodsPackage : '' };{v.goodsUnit ? v.goodsUnit : ''};{v.goodsSpec ? v.goodsSpec : ''}) </p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.produceDate ? v.produceDate : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.count ? v.count : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p>￥{v.money ? v.money : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p >{v.reason ? v.reason : '-'}</p>
                    </td>

                    <td className="td">
                        <p>{v.orderCode}</p>
                    </td>
                    <td className="td">
                        <p>{v.NAME}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.storeName ? v.storeName : '米阳嘉兴仓'}</p>
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
                        <th>入库日期</th>
                        <th>业务员</th>
                        <th>客户名称</th>
                        <th>商品</th>
                        <th>生产日期</th>
                        <th>拒收数量</th>
                        <th>拒收金额</th>
                        <th>拒收原因</th>
                        <th>拒收单号</th>
                        <th>货主企业</th>
                        <th>仓库</th>

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