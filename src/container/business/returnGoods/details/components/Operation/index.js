import React, {Component} from 'react';
import Modal from '../../../../../../components/modal';
import './style.scss';

// 批次详情展示
class Operation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false
        }
    }

    handleOpen = () => {
        this.setState({
            openModal: true
        })
    }

    render() {
        let {batches = []} = this.props;
        batches = batches === null ? [] : batches;
        const list = batches.map((v, i) => {
            return <div key={i} className="in-order-batch-list"><span>{v.produceDate}-{v.expireDate}</span><span>{v.batchNum}</span>
            </div>
        })
        return (
            <div>
                {
                    batches.length > 0 ?
                        <span className="batch-on-click" onClick={this.handleOpen}>批次详情</span> : '-'
                }

                <Modal openModal={this.state.openModal}
                       style={{width: '540px'}}
                       modalTitle="批次详情">
                    <div className="in-order-batch-list"><span>日期</span><span>实际入库量</span></div>
                    {list.length > 0 ? list : '无批次记录'}
                </Modal>
            </div>
        )
    }
}

export default Operation;