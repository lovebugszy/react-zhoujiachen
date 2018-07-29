import React, {Component} from 'react';
import './style.scss';

class SingleOrderDetails extends Component {
    render() {
        const {details} = this.props;
        switch (details.dcType) {
            case 0:
                details.dcType = '米阳物流';
                break;
            case 1:
                details.dcType = '货主自提';
                break;
            default:
        }
        return (
            <div className="single-order-details clearfix">
                <ul className="list-ul">
                    <li><span>退货单号：</span><span>{details.orderCode}</span></li>
                    <li><span>仓库：</span><span>{details.storeCode === 'JX' ? '米阳嘉兴仓' : ''}</span></li>
                    <li><span>出库日期：</span><span>{details.createTime}</span></li>
                </ul>
                <ul className="list-ul">
                    <li><span>货主企业：</span><span>{details.businessName}</span></li>
                    <li>
                        <span>配送方式：</span><span>{details.dcType}</span>
                    </li>
                </ul>
                <ul className="list-ul">
                    <li><span>来源单号：</span><span>{details.originCode}</span></li>
                    <li><span>商品性质：</span><span>{details.quality === 0 ? '次品' : '正常商品'}</span></li>

                </ul>
                <ul className="list-ul">
                    <li className="top"/>
                    <span style={{marginLeft:'-50px',marginTop:'-40px',fontSize:'16px'}}>收货信息</span>   <li className="clientName text-overflow">{details.clientName}</li>
                    <li className="clientMan text-overflow">{details.clientMan} {details.clientTel}</li>
                    <li className="clientCity text-overflow">{details.province}{details.city}{details.county}{details.address}</li>
                    <li className="bottom"/>
                </ul>
            </div>
        )
    }
}

export default SingleOrderDetails;