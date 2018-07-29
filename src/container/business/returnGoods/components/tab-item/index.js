import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './style.scss';
import MyButton from '../../../../../components/button';
import Empty from '../../../../../components/empty';
import Modal from '../../../../../components/modal';
import RadioList from './components/radioList';

class TabItem extends Component {
    //调用收货接口
    onCompletions = (id,type) => {
        const {onCompletions} = this.props;
        onCompletions && onCompletions(id,type);
    }

    //调用打印接口
    onCompletioned = (id,type) => {
        const {onCompletioned} = this.props;
        onCompletioned && onCompletioned(id,type);
    }

    state = {
        openModal: false,
        id: '',
        cancelReason: '下错单/重复下单',
    }
    //调用推送WMS接口
    onCompletion = (id) => {
        const {onCompletion} = this.props;
        onCompletion && onCompletion(id);
    }

    //取消 跟强制完成同样操作
    onCancel = (id) => {
        this.setState({
            openModal: true,
            id: id
        })
    }
    //打印
    onPrint = (id) => {
        this.setState({
            openModal: true,
            id: id
        })
    }


    // 选择取消原因回调
    handleRadio = (v) => {
        this.setState({
            cancelReason: v
        })
    }

    handleOk = () => {
        this.setState({
            openModal: false
        })
        const {onCompletion} = this.props;
        onCompletion && onCompletion(this.state.id, this.state.cancelReason);
    }

    handleCancel = () => {
        this.setState({
            openModal: false
        })
    }
    render() {
        const {afterSaleList} = this.props;
        const trs = afterSaleList.map((v, i) => {
            // 订单状态 0:待审核1:待退货2:待入库3:正常完成,4:异常完成，5:退货中99已取消
            switch (v.orderStatus) {
                case 0:
                    v.orderStatus = '待审核';
                    break;
                case 1:
                    v.orderStatus = '待退货';
                    break;
                case 2:
                    v.orderStatus = '待入库';
                    break;
                case 3:
                    v.orderStatus = '正常完成';
                    break;
                case 4:
                    v.orderStatus = '异常完成';
                    break;
                case 5:
                    v.orderStatus = '退货中';
                    break;
                case 99:
                    v.orderStatus = '已取消';
                    break;
                default:
            }
            // 总数量
            // 总数量
            if(v.orderStatus === '退货中' || v.orderStatus === '待入库' || v.orderStatus === '正常完成' || v.orderStatus === '异常完成' ) {
                if (v.actualGoodsCount !== v.goodsCount ) {
                    v.Status = <div>
                        <p>{v.orderStatus} </p>
                        <p className="orange">单货不符</p>
                    </div>
                }else if(v.actualGoodsCount === v.goodsCount){
                    v.Status = <div>
                        <p>{v.orderStatus}</p>
                    </div>
                }
            } else {
                v.Status = <p>{v.orderStatus}</p>
            }

            return (
                <tr key={i}>
                    <td className="td" style={{width: '200px'}}>
                        <p className="left">退货单号：<Link to={`/selldetail/${v.id}`}>{v.orderCode}</Link></p>
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
                    <td className="td">
                        <p>{v.goodsCount}</p>
                        {
                            v.aidManageUpdate === 1 || v.aidManageUpdate === 2 ?
                                <p className="orange">
                                    {v.aidManageUpdate === 1 ? `实际退货：${v.actualGoodsCount ? v.actualGoodsCount:'0'}件` : ''}
                                    {v.aidManageUpdate === 2 ? `实际退货：${v.actualGoodsCount ? v.actualGoodsCount:'0'}件` : ''}
                                </p> : ''
                        }
                    </td>
                    <td className="td">
                        <p>{v.refund}</p>
                        {
                            v.aidManageUpdate === 1 || v.aidManageUpdate === 2 ?
                                <p className="red">
                                    {v.aidManageUpdate === 1 ? `实际退款：${v.actualMoney ? v.actualMoney:'0'}元` : ''}
                                    {v.aidManageUpdate === 2 ? `实际退款：${v.actualMoney ? v.actualMoney:'0'}元` : ''}
                                </p> : ''
                        }
                    </td>
                    <td className="td">
                        <p className={`${v.orderStatus === '待审核' ? 'red' : ''}`}>
                            {
                                v.Status
                            }
                        </p>
                    </td>
                    <td className="td">
                        <p>{v.auditTime ? v.auditTime : '-'}</p>
                    </td>
                    <td className="td outList-td">
                        <p className="margin"><Link to={`/selldetail/${v.id}`}>订单详情</Link></p>
                        {
                            v.orderStatus === '待退货' ||
                            v.orderStatus === '退货中' ?
                                <p className="margin">
                                    <MyButton className="m-button-primary"
                                              HtmlValue="收货"
                                              HtmlType="button"
                                              style={{height: '28px', borderRadius: '2px'}}
                                              onClick={() => this.onCompletions(v.id, '收货')}/>
                                </p>
                                : ''
                        }
                        {
                            v.orderStatus === '退货中' ?
                                <p className="margin">
                                    <MyButton className="m-button-warn"
                                              HtmlValue="推送wms"
                                              HtmlType="button"
                                              style={{height: '28px', borderRadius: '2px'}}
                                              onClick={() => this.onCompletion(v.id, '推送wms')}/>
                                </p>
                                : ''
                        }
                    </td>
                    <td className="td outList-td">
                        {
                            v.orderStatus === '待退货' ||
                            v.orderStatus === '退货中' ||
                            v.orderStatus === '待入库' ||
                            v.orderStatus === '正常完成' ||
                            v.orderStatus === '异常完成' ?
                                <p className="margin">
                                    <MyButton className="m-button-primary"
                                              HtmlValue="打印确认"
                                              HtmlType="button"
                                              style={{
                                                  height: '28px',
                                                  borderRadius: '2px',
                                                  float: 'left',
                                                  margin: '5px 0',
                                                  background: '#ffffff',
                                                  color: '#3385ff'
                                              }}
                                              onClick={() => this.onPush(v.id, '打印确认')}/>
                                </p>
                                : ''
                        }
                        {/*{v.orderStatus === '待退货' ?*/}
                            {/*<p className="del" onClick={() => this.onCancel(v.id)}/> : ""*/}

                        {/*}*/}
                        <div className="handle-icon">
                            {
                                (v.orderStatus !== '待审核' && v.orderStatus !== '已取消') ?
                                    <a href="javascript:;" className="icon icon-print" onClick={() => this.onCompletioned(v.id)} ><Link to={`/print/${v.id}`}/></a> : ''

                            }
                            {
                                v.orderStatus === '待退货' ?
                                    <i className="icon icon-cancel" onClick={() => this.onCancel(v.id)}></i> : ''
                            }
                        </div>
                    </td>
                </tr>
            )
        })
        return (
            <div className="m-table-list-wrap">
                <table border="1" style={{border: 'none'}}>
                    <thead>
                    <tr>
                        <th>单号</th>
                        <th>客户信息</th>
                        <th>货主/仓库信息</th>
                        <th>总数量</th>
                        <th>应退金额</th>
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
                       style={{width: '380px', height: '220px'}}
                       onOkClick={this.handleOk}
                       onCancelClick={this.handleCancel}
                       content={<RadioList onChange={this.handleRadio}/>}/>
            </div>
        )
    }
}

export default TabItem;