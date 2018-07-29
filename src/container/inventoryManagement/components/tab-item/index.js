import React,{ Component } from 'react';
import './style.scss';
import Empty from '../../../../components/empty';
import Operation from './components/Operation';

class TabItem extends Component {

    state = {
        openModal:false,
        batch:'',
    }

    render () {
        const {sOrderList} = this.props;
        const trs = sOrderList.map((v,i) => {

            let goodsInfo={
                "name":v.customName,
                "props":v.goodsPackage+v.goodsUnit+v.goodsSpec,
                "code":v.barcode,
            }
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
                        {v.volume}{v.netWeight}
                    </td>
                    
                    <td className="td">
                        {v.aidPromptGoodsTotal + v.goodsTotal}
                    </td>
                    <td className="td">
                        {v.aidPromptGoodsLock + v.goodsLock}
                    </td>
                    <td className="td">
                        {v.goodsAvailableNum}
                    </td>
                    <td className="td" style={{minWidth:'80px'}}>
                        {v.aidPromptGoodsTotal}
                    </td>
                    <td className="td" style={{minWidth:'80px'}}>
                        {v.businessName}
                    </td>
                    <td className="td">
                        {v.storeName}
                    </td>
                    <td className="td">

                        {(v.batch && v.batch.length > 0) ?
                            <div>
                            
                            <Operation goodsinfo={goodsInfo} oBatches={v.batch}/>
                            </div>:
                            ''
                        }
                    
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
                        <th>商品</th>
                        <th>体积(m³)/净重(kg)</th>
                        <th>实际库存</th>
                        <th>锁定库存</th>
                        <th>正常品可用库存</th>
                        <th>临期品/次品可用库存</th>
                        <th>货主企业</th>
                        <th>仓库</th>
                        <th>详情</th>
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