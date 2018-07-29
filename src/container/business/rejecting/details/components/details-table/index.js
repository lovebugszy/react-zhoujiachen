import React,{ Component } from 'react';
import { Table } from 'antd';
import Operation from '../../components/Operation';
import './style.scss';

class DetailsTable extends Component {
    render () {
        // 商品信息展示
        const GoodsName = (goodsName) => {

            let obj = goodsName.goodsName;
            console.log(obj)
            return (
                <div className="goods-wrap">
                    <p>{obj.goodsName} {obj.goodsCode}</p>
                    <p className="desc-add">{obj.goodsSpec} {obj.goodsPackage} {obj.goodsUnit}</p>
                </div>
            )
        }
        // 列表头信息
        const columns = [
            {title:'',dataIndex:'id',key:'1'},
            {
                title:'商品信息',
                className:'goodsName',
                dataIndex:'goodsName',
                render:goodsName => <GoodsName goodsName={goodsName}/>,
                key:'2'
            },

            {title:'拒收数量',dataIndex:'planNum',render:text =>
                <div>

                    {<p>{text.planNum}</p>}
                </div>
            ,key:'5'},
            {
                title:'价格',dataIndex:'discountPrice',render:text =>
                <div>
                    {text.discountPrice === text.goodsPrice ? <p>¥{text.goodsPrice}</p> :
                        <div>
                            <del>¥{text.goodsPrice}</del>
                            <p className="red">¥{text.discountPrice}</p>
                        </div>
                    }
                    {text.discountRate ? <p>{text.discountRate}%</p> : ''}
                </div>,key:'6',
            },
            {title:'退款金额',dataIndex:'discountPrice',render:text =>
                <div>

                    {<p class="red">￥{text.discountAmount}</p>}
                </div>,key:'7'},
            {title:'备注',dataIndex:'remark',key:'8'},
            {title:'操作',dataIndex:'batches',render:batches => <Operation batches={batches}/>,key:'9'},
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