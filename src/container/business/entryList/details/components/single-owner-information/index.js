import React,{ Component } from 'react';
import './style.scss';

class SingleOwnerInfo extends Component {

    render () {
        const {details} = this.props;
        switch(details.servType) {
            case 0:
                details.servType = '采购入库';
                break;
            case 1:
                details.servType = '生产入库';
                break;
            case 2:
                details.servType = '调拨入库';
                break;
            case 9:
                details.servType = '其它入库';
                break;
            default:
        }
        switch(details.ifQualityInspection) {
            case 0:
                details.ifQualityInspection = '否';
                break;
            case 1:
                details.ifQualityInspection = '抽检';
                break;
            case 2:
                details.ifQualityInspection = '全检';
                break;
            default:
        }
        return (
            <div className="single-owner-info clearfix">
                <ul className="info-list">
                    <li className="info-item text-overflow"><span>入库单号：</span><span>{details.orderCode}</span></li>
                    <li className="info-item text-overflow"><span>仓库：</span><span>{details.storeName}</span></li>
                    <li className="info-item text-overflow"><span>分批入库：</span><span>{details.manyTimes === 0 ? '否' : '是'}</span></li>
                </ul>
                <ul className="info-list">
                    <li className="info-item text-overflow"><span>货主企业：</span><span>{details.businessName}</span></li>
                    <li className="info-item text-overflow"><span>业务类型：</span><span>{details.servType}</span></li>
                    <li className="info-item text-overflow"><span>供应商：</span><span>{details.supplier}</span></li>
                </ul>
                <ul className="info-list">
                    <li className="info-item text-overflow"><span className="double">来源单号：</span><span>{details.originCode}</span>
                    </li>
                    <li className="info-item text-overflow"><span className="double">预计到货日期：</span><span>{details.planTime}</span>
                    </li>
                    <li className="info-item text-overflow"><span
                        className="double">是否质检：</span><span>{details.ifQualityInspection}</span></li>
                </ul>
                <p className="desc "><span>备注：</span> {details.remark}</p>
            </div>
        )
    }
}

export default SingleOwnerInfo;