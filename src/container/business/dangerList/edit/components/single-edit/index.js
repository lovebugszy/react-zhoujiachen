import React, {Component} from 'react';
import {Table} from 'antd';
import {Input} from 'antd';
 import {Icon} from 'antd';


class DetailsTable extends Component {
    // input 操作
    handleBatchNumChange = (event,value,item,index) => {
        const inputValue = event.target.value
        const {onChange} = this.props;
        let goodsList = this.state.goodsList;
        goodsList[index].goodsName=Number(inputValue);
        goodsList[index].goodsName = Number(value - inputValue)
        this.setState({
            goodsList:goodsList
        },() => {
            onChange && onChange(this.state)
        })
    }
    //删除
    handleDel(e) {
        const DelDataSource = this.state.goodsList;
        DelDataSource.splice(e.target.getAttribute('data-index'), 1);//data-index为获取索引，后面的1为一次去除几行
        this.setState({
            goodsList: DelDataSource,
        });
    }

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
            {
                title:'生产日期',dataIndex:'returnBatch',key:'3',width:'200px'
            },
            {
                title:'价格',dataIndex:'goodsPrice',key:'4',width:'170px'
            },
            {title:'数量',dataIndex:'planNum',key:'5',width:'170px'},
            {title:'备注',dataIndex:'remark',key:'7',width:'170px'},
             // {title:'操作',dataIndex:'newNum',key:'8',width:'170px'},
            {
                title: '操作',
                dataIndex: 'operation',
                key: '8',
                render: (text, record, index) => {
                    return <Icon type="delete" data-index={index} onClick={this.handleDel}/>
                }
            }
        ];
        return (
            <div>
                <Table
                    columns={columns}
                    style={{width:'auto',margin:'0 10px'}}
                    rowKey={columns => columns.id}
                    dataSource={this.props.goodsList}
                    pagination={false}
                    bordered/>
            </div>
        )
    }
}

export default DetailsTable;