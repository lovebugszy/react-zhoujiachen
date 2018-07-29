import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import MyButton from '../../../../../components/button';
import Empty from '../../../../../components/empty';
//import Modal from '../../../../../components/modal';
//import OutList from './components/outList';

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
    //编辑
    onEdit = (id) => {
        const {onEdit} = this.props;
        onEdit && onEdit(id);
    }
    onDetail = (id) => {
        const {onDetail} = this.props;
        onDetail && onDetail(id);
    }
    
    render () {
        const {cOrderList} = this.props;
        console.log(this.props)
        const trs = cOrderList.map((v,i) => {
            
            // 订单状态 0:待审核1:退货中2:已完成99:已取消
            switch(v.ifAudit) {
                case 0:
                    v.ifAudit = '未审核';
                    break;
                case 1:
                    v.ifAudit = '已审核';
                    break;
                default:
            }
            const otds = (v.outorder).map((item,j) => {
                return (
                        <p className="tablep" key={j}>{item.orderCode}</p>
                    )
            })
            const ntds = (v.outorder).map((item,j) => {
                return (
                    <p className="tablep" key={j}>{item.goodsNum}件</p>
                    )
            })
            const mtds = (v.outorder).map((item,j) => {
                return (
                        <p className="tablep" key={j}>￥{item.money}</p>
                    )
            })
            const retds = (v.receivablesOrder).map((item,j) => {
                return (
                        <p className="tablep" key={j}>{item.orderCode}</p>
                    )
            })
            const rentds = (v.receivablesOrder).map((item,j) => {
                return (
                        <p className="tablep" key={j}>{item.goodsNum}件</p>
                    )
            })
            const remtds = (v.receivablesOrder).map((item,j) => {
                return (
                        <p className="tablep" key={j}>￥{item.money}</p>
                    )
            })
            return (
                <tr key={i}>
                    <td className="td">
                        {v.shDate}
                    </td>
                    <td className="td" style={{textAlign:'left'}}>
                        {v.clientName}
                    </td>
                    <td className="td" style={{textAlign:'left'}}>
                        {v.businessName}
                    </td>
                    <td className="td">
                        {otds}
                    </td>
                    <td className="td" style={{minWidth:'80px'}}>
                        {ntds}
                    </td>
                    <td className="td" style={{minWidth:'80px'}}>
                        {mtds}
                    </td>
                    <td className="td">
                        {retds}
                    </td>
                    <td className="td" style={{minWidth:'80px'}}>
                        {rentds}
                    </td>
                    <td className="td" style={{minWidth:'80px'}}>
                        {remtds}
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
                    
                    <td className="td">
                        <p className={`${v.ifAudit === '未审核' ? 'red' : ''}`}>{v.ifAudit}</p>
                    </td>
                    
                    <td className="td">
                        <p className="link-detail" style={{marginBottom:'12px'}} onClick={() => this.onDetail(v.id)}>订单详情</p>
                        <p>{v.ifAudit === '未审核' ?
                            <MyButton className="m-global-button m-button-success"
                                      HtmlValue="审核"
                                      HtmlType="button"
                                      style={{height:'28px',borderRadius:'2px'}}
                                      onClick={() => this.onCompletion(v.id)}/>
                            : '-'}
                        </p>
                    </td>
                    <td className="td">
                        {v.ifAudit === '未审核' ?
                            <p className="edit" onClick={() => this.onEdit(v.id)}></p>
                            : '-'}
                        
                    </td>
                    
                </tr>
            )
        })
        return (
            <div className="m-table-list-wrap collect-table">
                <table border="1" style={{border:'none'}}>
                    <thead>
                    <tr>
                        <th>收款日期</th>
                        <th>客户名称</th>
                        <th>货主企业</th>
                        <th>订单</th>
                        <th>出库数量</th>
                        <th>订单金额</th>
                        <th>退货单</th>
                        <th>出库数量</th>
                        <th>订单金额</th>
                        <th>其他抵扣</th>
                        <th>其他收款</th>
                        <th>实际收款</th>
                        <th>支付方式</th>
                        <th>备注</th>
                        <th>状态</th>
                        <th>详情</th>
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

export default TabItem;