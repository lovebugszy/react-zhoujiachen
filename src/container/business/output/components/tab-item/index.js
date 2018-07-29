import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import MyButton from '../../../../../components/button';
import Empty from '../../../../../components/empty';
import Modal from '../../../../../components/modal';
import RadioList from './components/radioList2';

class TabItem extends Component {
    state = {
        openModal:false,
        id:'',
        cancelReason:'下错单/重复下单',
    }
    onCompletion = (id,type) => {
        const {onCompletion} = this.props;
        onCompletion && onCompletion(id,type);
    }

    onCancelOrder = () => {

    }
    onCancel = (id) => {
        this.setState({
            openModal:true,
            id:id
        })
    }
    // 选择取消原因回调
    handleRadio = (v) => {
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
        const {outputList} = this.props;
        const trs = outputList.map((v,i) => {
            // 订单状态 0:待审核1:待出库2:拣货中3:待签收4:已签收,5客户拒收,6:部分签收,7:异常出库处理,99:已关闭
            switch(v.orderStatus) {
                case 0:
                    v.orderStatus = '待审核';
                    break;
                case 1:
                    v.orderStatus = '待出库';
                    break;
                case 2:
                    v.orderStatus = '拣货中';
                    break;
                case 3:
                    v.orderStatus = '待签收';
                    break;
                case 4:
                    v.orderStatus = '已签收';
                    break;
                case 5:
                    v.orderStatus = '客户拒收';
                    break;
                case 6:
                    v.orderStatus = '部分签收';
                    break;
                case 7:
                    v.orderStatus = '异常出库处理';
                    break;
                case 99:
                    v.orderStatus = '已关闭';
                    break;
                default:
            }
            // 总数量
            if(v.actualGoodsCount && (v.orderStatus === '已签收' || v.orderStatus === '客户拒收' || v.orderStatus === '部分签收')) {
                if(v.actualGoodsCount !== v.goodsCount) {
                    v.num = <div>
                        <p>{v.goodsCount} 件</p>
                        <p>实际出库 {v.actualGoodsCount} 件</p>
                        <p>实际签收 {v.lastGoodsCount ? v.lastGoodsCount : 0} 件</p>
                    </div>
                } else {
                    v.num = <div>
                        <p>{v.goodsCount} 件</p>
                        <p>实际签收 {v.lastGoodsCount ? v.lastGoodsCount : 0} 件</p>
                    </div>
                }
            } else if(v.actualGoodsCount && (v.orderStatus === "拣货中" || v.orderStatus === "待签收")) {
                if(v.actualGoodsCount !== v.goodsCount) {
                    v.num = <div>
                        <p>{v.goodsCount} 件</p>
                        <p>实际出库 {v.actualGoodsCount} 件</p>
                    </div>
                } else {
                    v.num = <p>{v.goodsCount} 件</p>
                }
            } else if(v.orderStatus === "异常出库处理") {
                v.num = <div>
                    <p>{v.goodsCount} 件</p>
                    <p>实际出库 {v.actualGoodsCount} 件</p>
                    <p>实际签收 {v.lastGoodsCount ? v.lastGoodsCount : 0} 件</p>
                </div>
            } else {
                v.num = <p>{v.goodsCount} 件</p>
            }

            return (
                <tr key={i} className="outList-tr">
                    <td className="td outList-td">
                        <p className="left">出库单号：<Link to={`/outputdetail/${v.id}`}>{v.orderCode}</Link></p>
                        <p className="left">来源单号：{`${v.originCode ? v.originCode : '/'}`}</p>
                    </td>
                    <td className="td outList-td">
                        <p className="customer">{v.clientName}</p>
                        <p className="customer2">{v.clientMan} {v.clientTel}</p>
                    </td>
                    <td className="td outList-td">
                        <p className="owner">{v.businessName} </p>
                        <p className="owner2">{v.storeName ? v.storeName : '米阳嘉兴仓'} {v.quality === 1 ? '正常销售品' : '临期品/次品'}</p>
                    </td>
                    <td className="td outList-td">
                        {v.num}
                    </td>
                    <td className="td outList-td">
                        <p>{v.isReceive === 0 ? '不需要' : '需要'}</p>
                        {v.isReceive === 1 ?
                            <p>代收货款 : <span className="red">¥{v.proxyMoney}</span></p> : ''}
                        {(  v.orderStatus === '已签收' ||
                            v.orderStatus === '部分签收')
                        && v.isReceive === 1 ?
                            <p>实收货款 : <span className="red">¥{v.paidMoney}</span></p> : ''}
                    </td>
                    < td className="td outList-td">
                        <p>{v.orderStatus}</p>
                    </td>
                    <td className="td outList-td">
                        <p>{v.auditTime ? v.auditTime : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p className="margin"><Link to={`/outputdetail/${v.id}`}>订单详情</Link></p>
                        {
                            v.orderStatus === '待签收' ?
                                <p className="margin">
                                    <MyButton className="m-button-primary"
                                              HtmlValue="签收"
                                              HtmlType="button"
                                              style={{height:'28px',borderRadius:'2px'}}
                                              onClick={() => this.onCompletion(v.id,'签收')}/>
                                </p>
                                : ''
                        }
                        {
                            (v.orderStatus === '部分签收' || v.orderStatus === '客户拒收' || v.orderStatus === '异常出库处理') ?
                                <p className="margin">
                                    <Link className="m-global-button m-button-default"
                                        style={{height:'28px',width:'66px',display: 'inline-block',
    lineHeight: '26px',borderRadius:'2px'}}
                                              to={`/rejectdetailout/${v.id}`}>拒收单</Link>
                                </p>
                                : ''
                        }
                        {
                            v.orderStatus === '已签收' ||
                            v.orderStatus === '部分签收' ||
                            v.orderStatus === '客户拒收' ||
                            v.orderStatus === '异常出库处理' ?
                                <p className="margin">
                                    <MyButton className="m-button-primary"
                                              HtmlValue="覆盖签收"
                                              HtmlType="button"
                                              style={{height:'28px',borderRadius:'2px'}}
                                              onClick={() => this.onCompletion(v.id,'覆盖签收')}/>
                                </p>
                                : ''
                        }
                        {
                            (v.orderStatus === '已签收' || v.orderStatus === '部分签收')
                            && v.signIfReceivables === 1 && v.isReceive === 1 ?
                                <p className="margin">
                                    <MyButton className="m-button-warn"
                                              HtmlValue="新增收款单"
                                              HtmlType="button"
                                              style={{height:'28px'}}
                                              onClick={() => this.onCompletion(v.id,'新增收款单')}/>
                                </p>
                                : ''
                        }
                    </td>
                    <td className="td outList-td">
                        <div className="handle-icon">
                            {
                               (v.orderStatus !== '待审核' && v.orderStatus !== '已关闭') ? 
                               <a href="javascript:;" className="icon icon-print"></a> : ''
                            }
                            {
                               v.orderStatus === '待出库' ? 
                               <i className="icon icon-cancel" onClick={() => this.onCancel(v.id)}></i> : ''
                            }
                        </div>
                    </td>
                </tr>
            )
        })
        return (
            <div className="m-table-list-wrap">
                <table border="1" style={{border:'none'}}>
                    <thead>
                    <tr>
                        <th>单号</th>
                        <th>客户信息</th>
                        <th>货主/仓库信息</th>
                        <th>总数量</th>
                        <th>代收货款</th>
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
                       style={{width:'380px',height:'380px'}}
                       onOkClick={this.handleOk}
                       onCancelClick={this.handleCancel}
                       content={<RadioList onChange={this.handleRadio}/>}/>
            </div>
        )
    }
}

export default TabItem;