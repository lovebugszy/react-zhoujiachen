import React, {Component} from 'react';
import {Table} from 'antd';
import Operation from '../../components/Operation';

class DetailsTable extends Component {
    render() {
        // 商品信息展示
        const GoodsName = (goodsName) => {
            let obj = goodsName.goodsName;
            return (
                <div className="goods-wrap">
                    <p>{obj.goodsName} {obj.goodsCode}</p>
                    <p className="desc-add">{obj.goodsSpec} {obj.goodsPackage} {obj.goodsUnit}</p>
                </div>
            )
        }
        // 列表头信息
        const columns = [
            {title: '', dataIndex: 'id', key: '1'},
            {
                title: '商品信息',
                className: 'goodsName',
                dataIndex: 'goodsName',
                render: goodsName => <GoodsName goodsName={goodsName}/>,
                key: '2'
            },
            {title: '生产日期', dataIndex: 'returnBatch', key: '3'},
            {title: '退货数量', dataIndex: 'planNum', key: '4'},
            {
                title: '实际退货数量', dataIndex: 'rewriteNum', key: '5', render: text => {
                // 拣货中 待签收 正常完成 异常完成
                return text.rewriteNum !== text.planNum && text.status === (3 || 4) ?
                    <div>
                        <del>{text.planNum}</del>
                        <p>{text.rewriteNum}</p>
                    </div> :
                    <p>{text.rewriteNum}</p>
            }
            },
            {title: '备注', dataIndex: 'remark', key: '6'},
            {title: '操作', dataIndex: 'batches', render: batches => <Operation batches={batches}/>, key: '7'},
        ];
        return (
            <div>
                <Table
                    columns={columns}
                    rowKey={columns => columns.id}
                    dataSource={this.props.goodsList}
                    pagination={false}
                    bordered/>
            </div>
        )
    }
}

export default DetailsTable;