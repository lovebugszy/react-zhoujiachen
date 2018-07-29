import React, {Component} from 'react';
import {Table} from 'antd';
import {Input} from 'antd';
import {Icon} from 'antd';


class DetailsTable extends Component {
    state = {
        goodsList:[],

    }

    componentDidMount () {
        let {goodsList = []} = this.props;
        this.setState({
            goodsList:goodsList
        })
    }
    // input 操作
    handleBatchNumChange = (event,value,item,index) => {
        const inputValue = event.target.value
        console.log(inputValue)
        const {onChange} = this.props;
        let goodsList = this.state.goodsList;
        console.log(goodsList)
        goodsList[index].planNum=Number(inputValue);

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
            {
                title: '序号',
                dataIndex: 'key',
                key: '1',
                render: (text, record, index) => {
                    return <span>{index + 1}</span>//索引从零开始，所以第一行为index+1，index为render方法里面的参数，可自动获取到下标，在ant design里面有详情解释，可参考
                },
            },
            {
                title: '商品信息',
                className: 'goodsName',
                dataIndex: 'goodsName',
                render: goodsName => <GoodsName goodsName={goodsName}/>,
                key: '2'
            },
            {title:'实收数量',dataIndex:'planNum',key:'3',width:'200px',render:(planNum,id,index) => {
                return <Input placeholder=""
                              defaultValue={planNum}
                              onChange={(v) => this.handleBatchNumChange(v,planNum,id,index)}/>
            }
            },
            {
                title:'单价',dataIndex:'goodsPrice',key:'4',width:'170px'
            },
            {title:'折扣',dataIndex:'discountPrice',render:text =>
                <div>
                    {text.discountPrice === text.goodsPrice ? <p>¥{text.goodsPrice}</p> :
                        <div>
                            <p style={{borderBottom:'1px solid #e8e8e8',textAlign:'centre',}}>¥{text.discountPrice}</p>
                        </div>
                    }
                    {text.discountRate ? <p>{text.discountRate}%</p> : ''}
                </div>,
                key:'5',width:'170px'},
            {title:'退款',dataIndex:'discountAmount',key:'6',width:'170px'},
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