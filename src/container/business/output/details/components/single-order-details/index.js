import React,{ Component } from 'react';
import './style.scss';

class SingleOrderDetails extends Component {
    render () {
        const {details} = this.props;
        //业务类型 0:销售出库1:调拨出库2:换货出库9:其它出库
        switch(details.servType) {
            case 0:
                details.servType = '销售出库';
                break;
            case 1:
                details.servType = '调拨出库';
                break;
            case 2:
                details.servType = '换货出库';
                break;
            case 9:
                details.servType = '其它出库';
                break;
            default:
        }

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
        return (
            <div className="single-order-details clearfix">
                <ul className="list-ul">
                    <li><span>出库单号：</span><span>{details.orderCode}</span></li>
                    <li><span>仓库：</span><span>{details.storeCode === 'JX' ? '米阳嘉兴仓' : ''}</span></li>
                    <li><span>是否紧急：</span><span>{details.isUrgent === 0 ? '否' : '是'}</span></li>
                </ul>
                <ul className="list-ul">
                    <li><span>货主企业：</span><span>{details.businessName}</span></li>
                    <li><span>业务类型：</span><span>{details.servType}</span></li>
                    <li><span>出库日期：</span><span>{details.planTime}</span></li>
                </ul>
                <ul className="list-ul">
                    <li><span>来源单号：</span><span>{details.originCode}</span></li>
                    <li><span>商品性质：</span><span>{details.quality === 0 ? '次品' : '正常商品'}</span></li>
                    <li>
                        <span>配送方式：</span><span>{details.dcType} {details.dcType === '自提' ? details.isDriver : ''}</span>
                    </li>
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