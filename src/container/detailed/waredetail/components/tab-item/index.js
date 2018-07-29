/**
 * Created by Administrator on 2018/7/18.
 */
import React,{ Component } from 'react';
import './style.scss';
import Empty from '../../../../../components/empty';
//import Operation from './components/Operation';

class TabItem extends Component {

    state = {
        openModal:false,
        batch:'',
    }

    render () {
        const {sOrderList} = this.props;
        const trs = sOrderList.map((v,i) => {

            // let goodsInfo={
            //     "name":v.customName,
            //     "props":v.goodsPackage+v.goodsUnit+v.goodsSpec,
            //     "code":v.barcode,
            // }
            return (
                <tr key={i}>
                    <td className="td" style={{width:'30px',textAlign:'center'}}>
                        {i+1}
                    </td>
                    <td className="td">
                        <p style={{textAlign:'left'}}>{v.customName}</p>
                        <p style={{textAlign:'left'}}>{v.barcode}</p>
                        <p style={{textAlign:'left'}}>{v.goodsPackage} {v.goodsUnit} {v.goodsSpec}</p>
                    </td>
                    <td className="td" style={{textAlign:'left'}}>
                        {v.batchDate}
                    </td>

                    <td className="td">
                        {v.quality === 1 ? '正常销售品' : '临期品/次品'}
                    </td>
                    <td className="td">
                        {v.total}
                    </td>
                    <td className="td">
                        {v.lock}
                    </td>
                    <td className="td" style={{minWidth:'80px'}}>
                        {v.ava}
                    </td>
                    <td className="td" style={{minWidth:'80px'}}>
                        {v.businessName}
                    </td>
                    <td className="td">
                        {v.storeName}
                    </td>
                </tr>
            )
        })
        return (
            <div className="store-table">
                <table border="1" style={{border:'none'}}>
                    <thead>
                    <tr>
                        <th></th>
                        <th>商品信息</th>
                        <th>生产日期</th>
                        <th>商品性质</th>
                        <th>实际库存</th>
                        <th>锁定库存</th>
                        <th>可用库存</th>
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