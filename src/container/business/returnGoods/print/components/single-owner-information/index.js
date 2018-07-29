/**
 * Created by Administrator on 2018/7/17.
 */
import React,{ Component } from 'react';
import './style.scss';

class SingleOwnerInfo extends Component {

    render () {
        const {details} = this.props;
        return (
            <div className="single-owner-info clearfix">
                {/*<p className="info-list">*/}
                    {/*<div className="info-item text-overflow"><span>退货单号：</span><span>{details.orderCode}</span></div>*/}
                    {/*<div className="info-item text-overflow"><span>来源单号：</span><span>{details.orginCode}</span></div>*/}
                {/*</p>*/}
                {/*<p className="info-list">*/}
                    {/*<div className="info-item text-overflow"><span>制单人：</span><span>{details.creator?details.creator:""}</span></div>*/}
                    {/*<div className="info-item text-overflow"><span>审单日期：</span><span>{details.auditTime?details.auditTime:""}</span></div>*/}
                {/*</p>*/}

                {/*<p className="info-list">*/}
                    {/*<div className="info-item text-overflow"><span>客户名称：</span><span>{details.clientName}</span></div>*/}
                    {/*<div className="info-item text-overflow"><span>联系人：</span><span>{details.clientMan}</span></div>*/}
                {/*</p>*/}
                {/*<p className="desc "><span>地址：</span> {details.province}{details.city}{details.county}</p>*/}
                {/*<p className="desc "><span>补充说明：</span> {details.processingInstructions ?details.processingInstructions:""}</p>*/}

                <ul>
                    <li class="info1">
                        <a href="javascript:;" class="wid">退货单号:<span>{details.orderCode}</span></a>
                        <a href="javascript:;">来源单号:<span>{details.orginCode}</span></a>
                    </li>
                    <li class="info1">
                        <a href="javascript:;" class="wid">制单人:<span>{details.creator?details.creator:""}</span></a>
                        <a href="javascript:;"  class="wids">审单日期:<span>{details.auditTime?details.auditTime:""}</span></a>
                    </li>
                    <li class="info2">
                        <a href="javascript:;" class="wid">客户名称:<span>{details.clientName}</span></a>
                        <a href="javascript:;">联系人:<span>{details.clientMan}</span></a>
                    </li>
                    <li>
                        <a href="javascript:;">地址:<span >{details.province}{details.city}{details.county}</span></a>
                    </li>
                    <li>
                        <a href="javascript:;">补充说明:<span >{details.processingInstructions ?details.processingInstructions:""}</span></a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default SingleOwnerInfo;