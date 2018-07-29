/**
 * Created by Administrator on 2018/7/19.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './style.scss';
import Empty from '../../../../../../components/empty';
class TabItems extends Component {

    constructor(props) {
        super(props)
        this.state = {
            goodList: [],          // 数据列表
        }
    }

    componentDidMount() {
        this.fetchgoodList();
    }

    render() {
        const {goodList} = this.props;
        const trs = goodList.map((v, i) => {
            return (
                <tr key={i} className="outList-tr">
                    <td className="td outList-td">
                        <p className="left">{i + 1}</p>
                    </td>
                    <td className="td outList-td">
                        <p className="owner3">{v.goodsName}
                            ({v.goodsPackage ? v.goodsPackage : '' };{v.goodsUnit ? v.goodsUnit : ''};{v.goodsSpec ? v.goodsSpec : ''})</p>
                        <p className="owner4">{v.barcode} </p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.produceDate ? v.produceDate : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.batchNum ? v.batchNum : '-'}</p>
                    </td>
                    <td className="td">
                        <p>{v.goodsPrice}</p>
                    </td>
                    <td className="td">
                        <p>{v.remrk}</p>
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
                        <th>商品信息</th>
                        <th>生产日期</th>
                        <th>价格</th>
                        <th>计划入库数量</th>
                        <th>备注</th>
                        <th>操作</th>
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

export default TabItems;