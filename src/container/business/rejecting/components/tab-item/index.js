import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import MyButton from '../../../../../components/button';
import Empty from '../../../../../components/empty';
import Modal from '../../../../../components/modal';
//import RadioList from './components/radioList';
import ReasonInput from './components/cancelReason';

class TabItem extends Component {

    state = {
        openModal:false,
        id:'',
        cancelReason:'',
    }
    // 调用通知入库完成接口
    onCompletion = (id) => {
        const {onCompletion} = this.props;
        onCompletion && onCompletion(id);
    }

    // 取消 跟强制完成同样操作
    onCancel = (id) => {
        this.setState({
            openModal:true,
            id:id
        })
    }

    // 选择取消原因回调
    handleReasonInput = (v) => {
        this.setState({
            cancelReason:v
        })
    }

    handleOk = () => {
        this.setState({
            openModal:false
        })
        const {onCancelOrder} = this.props;
        onCancelOrder && onCancelOrder(this.state.id,this.state.cancelReason);
    }

    handleCancel = () => {
        this.setState({
            openModal:false
        })
    }

    render () {
        const {inOrderList} = this.props;
        const trs = inOrderList.map((v,i) => {
            // 业务类型
            switch(v.servType) {
                case 0:
                    v.servType = '采购入库';
                    break;
                case 1:
                    v.servType = '生产入库';
                    break;
                case 2:
                    v.servType = '调拨入库';
                    break;
                case 9:
                    v.servType = '其它入库';
                    break;
                default:
            }
            // 质检状态
            switch(v.ifQualityInspection) {
                case 0:
                    v.ifQualityInspection = '';
                    break;
                case 1:
                    v.ifQualityInspection = '抽检';
                    break;
                case 2:
                    v.ifQualityInspection = '全检';
                    break;
                default:
            }
            // 订单状态 0:待审核1:退货中2:已完成99:已取消
            switch(v.orderStatus) {
                case 0:
                    v.orderStatus = '待审核';
                    break;
                case 1:
                    v.orderStatus = '退货中';
                    break;
                case 2:
                    v.orderStatus = '已完成';
                    break;
                case 99:
                    v.orderStatus = '已取消';
                    break;
                default:
            }
            return (
                <tr key={i}>
                    <td className="td" style={{width:'200px'}}>
                        <p className="left">拒收单号：<Link to={`/rejectdetail/${v.id}`}>{v.orderCode}</Link></p>
                        <p className="left">来源单号：{`${v.originCode ? v.originCode : '/'}`}</p>
                    </td>
                    <td className="td">
                        <p className="left1">{v.clientName}</p>
                        <p className="left1">{v.clientMan} {v.clientTel}</p>
                        {/*<p className="left1">{v.servType}</p>*/}
                    </td>
                    <td className="td business-td">
                        <p className="left3"><span className="business-name">{v.businessName}</span><span className="creater-name">{v.creator}</span></p>
                        <div className="wrap clearfix">
                            <p className="left2">
                                {v.storeName}
                            </p>
                            <span style={{float:'left',color:'#18A318'}}>{v.ifQualityInspection}</span>
                        </div>
                    </td>
                    <td className="td">
                        <p>{v.goodsCount}</p>

                    </td>
                    <td className="td">
                        <p className={`${v.orderStatus === '待审核' ? 'red' : ''}`}>{v.orderStatus}</p>
                    </td>
                    <td className="td">
                        <p>{v.auditTime ? v.auditTime : '-'}</p>
                    </td>
                    <td className="td">
                        <p style={{marginBottom:'12px'}}><Link to={`/rejectdetail/${v.id}`}>订单详情</Link></p>
                        <p>{v.orderStatus === '待审核' ?
                            <MyButton className="m-global-button m-button-primary"
                                      HtmlValue="通知入库"
                                      HtmlType="button"
                                      style={{height:'28px',borderRadius:'2px'}}
                                      onClick={() => this.onCompletion(v.id)}/>
                            : ''}
                        </p>
                    </td>
                    <td className="td" style={{padding:'0 30px',textAlign:'center',color:'#3385df'}}>
                        {v.orderStatus === '待审核' ?
                        <div>
                            <p className="del" onClick={() => this.onCancel(v.id)}/>
                            <p className="edit"><Link to={`/rejectedit/${v.id}`}/></p></div> : '-'}
                    </td>
                </tr>
            )
        })
        return (
            <div className="m-table-reject-wrap">
                <table border="1" style={{border:'none'}}>
                    <thead>
                    <tr>
                        <th>单号</th>
                        <th>客户信息</th>
                        <th>货主/仓库信息</th>
                        <th>拒收数量</th>
                        <th>状态</th>
                        <th>审核时间</th>
                        <th>详情</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {trs.length > 0 ? trs : <Empty/>}
                    </tbody>
                </table>
                <Modal buttonFlag
                       openModal={this.state.openModal}
                       style={{width:'380px',height:'220px'}}
                       onOkClick={this.handleOk}
                       onCancelClick={this.handleCancel}
                       content={<ReasonInput onChange={this.handleReasonInput}/>}/>
            </div>
        )
    }
}

export default TabItem;