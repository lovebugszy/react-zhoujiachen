import React,{ Component } from 'react';
import './style.scss';

class SingleOrderDetails extends Component {
    render () {
        const {details} = this.props;
        //业务类型 0:销售出库1:调拨出库2:换货出库9:其它出库
        

        switch(details.dcType) {
            case 0:
                details.dcType = '米阳配送';
                break;
            case 1:
                details.dcType = '自提';
                break;
            case 9:
                details.dcType = '其它';
                break;
            default:
        }
        switch(details.isDriver) {
            case 0:
                details.isDriver = '不需要装车';
                break;
            case 1:
                details.isDriver = '需要装车';
                break;
            default:
        }
        switch(details.orderStatus) {
            case 0:
                details.orderStatus = '待审核';
                break;
            case 1:
                details.orderStatus = '退货中';
                break;
            case 2:
                details.orderStatus = '已完成';
                break;
            case 99:
                details.orderStatus = '已取消';
                break;
            default:
        }
        return (
            <div className="single-order-details clearfix">
                <ul className="list-ul">
                    <li><span>拒收单号：</span><span>{details.orderCode}</span></li>
                    <li><span>仓库：</span><span>{details.storeName}</span></li>
                    <li><span>拒收日期：</span><span>{details.thDate ? details.thDate : ''}</span></li>
                </ul>
                <ul className="list-ul">
                    <li><span>货主企业：</span><span>{details.businessName}</span></li>
                    <li>
                        <span>承运方：</span><span>{details.dcType} {details.dcType === '自提' ? details.isDriver : ''}</span>
                    </li>
                    <li><span>状态：</span><span className={`${details.orderStatus === '待审核' ? 'red' : ''}`}>{details.orderStatus}</span></li>
                </ul>
                <ul className="list-ul">
                    <li><span>来源单号：</span><span>{details.originCode}</span></li>
                    <li><span>业务员：</span><span>{details.saleManName ? details.saleManName : '无'}</span></li>

                </ul>
                <ul className="list-ul">
                    <li className="top"/>
                    <li className="clientName text-overflow">{details.clientName}</li>
                    <li className="clientMan text-overflow">{details.clientMan} {details.clientTel}</li>
                    <li className="clientCity text-overflow">{details.province}{details.city}{details.county}</li>
                    <li className="bottom"/>
                </ul>
            </div>
        )
    }
}

export default SingleOrderDetails;