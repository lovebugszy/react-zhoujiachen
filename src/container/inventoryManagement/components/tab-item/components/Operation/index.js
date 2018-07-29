import React,{ Component } from 'react';
import Modal from '../../../../../../components/modal';
import './style.scss';

// 批次详情展示
class Operation extends Component {
    constructor (props) {
        super(props)
        this.state = {
            openModal:false
        }
    }

    handleOpen = () => {
        this.setState({
            openModal:true
        })
    }

    render () {
        const {goodsinfo,oBatches} = this.props;
        const list = oBatches.map((v,i) => {
            return <div key={i} className="store-info-batch-list">
                <span>{v.batchDate1}</span>
                <span>{v.expireDate}</span>
                <span>{v.validity}</span>
                <span>{v.total}</span>
                <span>{v.aidPromptGoodsTotal}</span>
                <span>{v.lock}</span>
                <span>{v.aidPromptGoodsLock}</span>
                <span>{v.availableNum}</span>
                <span>{v.aidPromptGoodsAvailableNum}</span>
                <span>{v.batchQuality === 0?'临期品/次品':'正常销售品'}</span>
                
            </div>
        })
        return (
            <div>
                {
                    oBatches.length > 0 ?
                        <span className="batch-on-click" onClick={this.handleOpen}>批次详情</span> : '-'
                }

                <Modal openModal={this.state.openModal}
                       style={{width:'1100px',height:'640px'}}
                       modalTitle="批次详情">
                    <div className="goods-info">
                        <span style={{color:'#999'}}>商品</span>{goodsinfo.name} ({goodsinfo.props}) {goodsinfo.code}
                    </div>   
                    <div className="store-info-batch-title">
                        <span>生产日期</span>
                        <span>到期日期</span>
                        <span>剩余有效期(天)</span>
                        <span>正常品实际库存</span>
                        <span>次品实际库存</span>
                        <span>正常品锁定库存</span>
                        <span>次品锁定库存</span>
                        <span>正常品可用库存</span>
                        <span>次品可用库存</span>
                        <span>商品性质</span>
                    </div>
                    {list.length > 0 ? list : '无批次记录'}
                </Modal>
            </div>
        )
    }
}

export default Operation;