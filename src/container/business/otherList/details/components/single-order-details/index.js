import React, {Component} from 'react';
import './style.scss';

class SingleOrderDetails extends Component {
    render() {
        const {details} = this.props;
        //业务类型 0:销售出库1:调拨出库2:换货出库9:其它出库
        console.log(details)
        switch (details.orderStatus) {
            case 0:
                details.orderStatus = '待审核';
                break;
            case 1:
                details.orderStatus = '待出库';
                break;
            case 2:
                details.orderStatus = '已完成';
                break;
            case 99:
                details.orderStatus = '已关闭';
                break;
            default:
        }
        return (
            <div className="single-orders-details clearfix">
                <ul className="list-ul">
                    <li><span>货主企业：</span><span>{details.businessName}</span></li>
                    <li><span>商品性质：</span><span>{details.quality === 0 ? '次品' : '正常商品'}</span></li>
                </ul>
                <ul className="list-ul">
                    <li><span>处理单号：</span><span>{details.orderCode}</span></li>
                    <li><span>处理日期：</span><span>{details.thDate}</span></li>
                </ul>

                <ul className="list-ul">
                    <li><span>仓库：</span><span>{details.storeName ? details.storeName : ''}</span></li>
                    <li><span>状态：</span><span
                        className={details.orderStatus === '0' ? 'red' : ''}>{details.orderStatus}</span></li>
                </ul>
            </div>
        )
    }
}

export default SingleOrderDetails;