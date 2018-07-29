import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import MyButton from '../../../../../components/button';
import Empty from '../../../../../components/empty';
import Modal from '../../../../../components/modal';
import RadioList from './components/radioList';

class TabItem extends Component {

    state = {
        openModal:false,
        openModal2:false,
        id:'',
        cancelReason:'下错单/重复下单',
    }
    // 调用强制完成接口
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
    onCompletion = (id) => {
        this.setState({
            openModal2:true,
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
        const {onCompletion} = this.props;
        onCompletion && onCompletion(this.state.id,this.state.cancelReason);
    }

    handleCancel = () => {
        this.setState({
            openModal:false
        })
    }
    handleOk2 = () => {
        this.setState({
            openModal2:false
        })
        const {onCompletion} = this.props;
        onCompletion && onCompletion(this.state.id,"");
    }

    handleCancel2 = () => {
        this.setState({
            openModal2:false
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
            // 订单状态 0:待审核1:已审核2:收货中3:正常完成,4:异常完成9已取消
            switch(v.orderStatus) {
                case 0:
                    v.orderStatus = '待审核';
                    break;
                case 1:
                    v.orderStatus = '已审核';
                    break;
                case 2:
                    v.orderStatus = '收货中';
                    break;
                case 3:
                    v.orderStatus = '正常完成';
                    break;
                case 4:
                    v.orderStatus = '异常完成';
                    break;
                case 9:
                    v.orderStatus = '已取消';
                    break;
                default:
            }
            
            return (
                <tr key={i}>
                    <td className="td" style={{width:'200px'}}>
                        <p className="left">入库单号：<Link to={`/entrydetail/${v.id}`}>{v.orderCode}</Link></p>
                        <p className="left">来源单号：{`${v.originCode ? v.originCode : '/'}`}</p>
                    </td>
                    <td className="td">
                        <p className="left1">{v.supplier}</p>
                        <p className="left1">预计入库：{v.planTime}</p>
                        {/*<p className="left1">{v.servType}</p>*/}
                    </td>
                    <td className="td">
                        <p className="left3">{v.businessName}</p>
                        <div className="wrap clearfix">
                            <p className="left2">
                                {v.storeName}
                            </p>
                            <span style={{float:'left',color:'#18A318'}}>{v.ifQualityInspection}</span>
                        </div>
                    </td>
                    <td className="td">
                        <p>{v.planNum}</p>
                        {
                            v.orderStatus === '收货中' || v.orderStatus === '异常完成' ?
                                <p className="orange">
                                    {v.orderStatus === '收货中' ? `已收货：${v.actualNum}件` : ''}
                                    {v.orderStatus === '异常完成' ? `实际入库：${v.actualNum}件` : ''}
                                </p> : ''
                        }
                    </td>
                    <td className="td">
                        <p className={`${v.orderStatus === '待审核' ? 'red' : ''}`}>{v.orderStatus}</p>
                    </td>
                    <td className="td">
                        <p>{v.auditTime ? v.auditTime : '-'}</p>
                    </td>
                    <td className="td">
                        <p style={{marginBottom:'12px'}}><Link to={`/entrydetail/${v.id}`}>订单详情</Link></p>
                        <p>{v.orderStatus === '收货中' ?
                            <MyButton className="m-button-error"
                                      HtmlValue="强制完成"
                                      HtmlType="button"
                                      style={{height:'28px'}}
                                      onClick={() => this.onCompletion(v.id)}/>
                            : ''}
                        </p>
                    </td>
                    <td className="td" style={{padding:'0 30px',textAlign:'center',color:'#3385df'}}>
                        {v.orderStatus === '已审核' ?
                            <p className="del" onClick={() => this.onCancel(v.id)}/> : '-'}
                    </td>
                </tr>
            )
        })
        // const completion = () => {
        //         return <p style={{textAlign:'center'}}>是否强制完成该入库订单!</p>
        //     }
        return (
            <div className="m-table-list-wrap">
                <table border="1" style={{border:'none'}}>
                    <thead>
                    <tr>
                        <th>单号</th>
                        <th>供应商信息</th>
                        <th>货主/仓库信息</th>
                        <th>总数量</th>
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
                       content={<RadioList onChange={this.handleRadio}/>}/>
                <Modal buttonFlag
                       openModal={this.state.openModal2}
                       style={{width:'380px',height:'220px'}}
                       onOkClick={this.handleOk2}
                       onCancelClick={this.handleCancel2}
                       content={<p style={{textAlign:'center',fontSize:'14px',paddingTop:'20px'}}>是否强制完成该入库订单!</p>}/>
            </div>
        )
    }
}

export default TabItem;