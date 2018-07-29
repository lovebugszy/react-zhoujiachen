import React,{ Component } from 'react';
import './style.scss';
import { Table } from 'antd';
import { Upload,Icon,Modal } from 'antd';
import MyInput from '../../../../../components/input';
//import Select from '../../../../../components/select';
import { Input, Select } from 'antd';
const Option = Select.Option;
class SignContentPart extends Component {

    state = {
        goodsList:[],
        previewVisible:false,
        previewImage:'',
        fileList:[],
        signRemark:'', // 签收说明
        reason:'',     // 拒收原因
        dealWay:'',    //处理方式
    }

    componentDidMount () {
        let {goodsList = []} = this.props;
        if(goodsList === null || (goodsList === undefined)) {
            goodsList = []
        }
        let list = [];
        for(let i = 0; i < goodsList.length; i++) {
            if(goodsList[i].outOrderBatches === null || goodsList[i].outOrderBatches === undefined) {
                goodsList[i].outOrderBatches = [];
            }
            goodsList[i].outOrderBatches.forEach(item => {
                item.barcode = goodsList[i].barcode;
                item.rewriteNums = item.batchNum;
                item.actualNums = item.batchNum;
                item.goodsNames = {
                    goodsName:goodsList[i].goodsName,
                    goodsCode:goodsList[i].goodsCode,
                    goodsSpec:goodsList[i].goodsSpec,
                    goodsPackage:goodsList[i].goodsPackage,
                    goodsUnit:goodsList[i].goodsUnit
                }
                item.newNum = '0';
            })
            list = list.concat(goodsList[i].outOrderBatches)
        }
       
        this.setState({
            goodsList:list
        })
    }

    // 关闭查看图片
    handleCancel = () => this.setState({previewVisible:false})

    // 上传图片。。。
    handlePreview = (file) => {
        this.setState({
            previewImage:file.url || file.thumbUrl,
            previewVisible:true,
            fileList:[],
        });
        
    }

    // 获取图片上传列表
    handleChange = ({fileList}) => {
        this.setState({
            fileList:fileList
        },() => {
            const {onChange} = this.props;
            onChange && onChange(this.state);
        })
    }

    // input 操作
    handleBatchNumChange = (event,value,item,index) => {
        const inputValue = event.target.value
        const {onChange} = this.props;
        let goodsList = this.state.goodsList;
        // if(inputValue > value) {
        //     if(goodsList.indexOf(item) !== 1) {
        //         goodsList[goodsList.indexOf(item)].rewriteNums = value;
        //         this.setState({
        //             goodsList:goodsList
        //         })
        //     }
        // } else {
        //     goodsList[goodsList.indexOf(item)].rewriteNums = inputValue;
        //     this.setState({
        //         goodsList:goodsList
        //     })
        // }
        //
        goodsList[index].actualNums=Number(inputValue);
        goodsList[index].newNum = Number(value - inputValue)
        // goodsList.forEach((v,i) => {
        //     // 当前操作项修改回显数量
        //     if(v.id === item.id) {
        //         v.actualNums = Number(inputValue);
        //         if(inputValue === '' || inputValue === 0) {
        //             v.newNum = '';
        //         } else {
        //             v.newNum = Number(value - inputValue)
        //         }
        //     } else {
        //         // 不是当前操作项则回显数量展示实际出库数量
        //         v.rewriteNums = v.batchNum;
        //     }
        // })
       
        this.setState({
            goodsList:goodsList
        },() => {
            onChange && onChange(this.state)
        })
    }


    render () {
        const {onChange} = this.props;
        // 商品信息展示
        const GoodsName = (goodsNames) => {
            let obj = goodsNames.goodsNames;
            return (
                <div className="goods-wrap">
                    <p>{obj.goodsName} {obj.goodsCode}</p>
                    <p className="desc-add">{obj.goodsSpec} {obj.goodsPackage} {obj.goodsUnit}</p>
                </div>
            )
        }
        {/*<MyInput placeholder="点击输入实收数量" type="number"*/
        }
        {/*className="batchNum"*/
        }
        {/*value={batchNum}*/
        }
        {/*onInputChange={(v) => this.handleBatchNumChange(batchNum,v,id)}/>*/
        }
        // 列表头信息
        const columns = [
            {title:'',dataIndex:'id',key:'1',width:'50px'},
            {
                title:'商品信息',
                className:'goodsName',
                dataIndex:'goodsNames',
                render:goodsNames => <GoodsName goodsNames={goodsNames}/>,
                key:'2',
                width:'400px'
            },
            {title:'批次',dataIndex:'produceDate',key:'3',width:'100px'},
            {title:'实际出库量',dataIndex:'batchNum',key:'4',width:'200px'},
            {
                title:'实收数量',dataIndex:'batchNum',key:'5',width:'200px',render:(batchNum,id,index) => {
                return <Input placeholder=""
                              defaultValue={batchNum}
                              onChange={(v) => this.handleBatchNumChange(v,batchNum,id,index)}/>
            }
            },
            {title:'拒收数量',dataIndex:'newNum',key:'6',width:'170px'},
        ];
        let tables;
        if(this.state.goodsList) {
            tables = <Table columns={columns}
                            style={{width:'1000px',margin:'30px auto'}}
                            rowKey={columns => columns.id}
                            dataSource={this.state.goodsList}
                            pagination={false}
                            bordered/>
        }
        const {previewVisible,previewImage,fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" style={{color:'#3385ff',fontSize:'30px'}}/>
                <div className="ant-upload-text">
                    <p style={{color:'#666',fontSize:'14px'}}>上传回单</p>
                    <p style={{color:'#999',fontSize:'12px'}}>最多可上传三张</p>
                </div>
            </div>
        );
        const opts = refuseArr.map((v,i) => {
            return <Option key={i} value={v.id}>{v.name}</Option>
        })
        const opts1 = methodArr.map((v,i) => {
            return <Option key={i} value={v.id}>{v.name}</Option>
        })
        return (
            <div className="sign-content-part-wrap">
                <div className="sign-content-part-inner">
                    {tables}
                    <div className="input-wrap clearfix">
                        <span>拒收原因：</span>
                        <Select defaultValue={this.state.reason} placeholder="请选择拒收原因" style={{width:'500px',height:'34px',float:'left'}} 
                        onChange={(v) => {
                                    this.setState({
                                        reason:v
                                    },() => {
                                        onChange && onChange(this.state)
                                    })
                                }}>
                          {opts}
                        </Select>
                    </div>
                    <div className="input-wrap clearfix">
                        <span>处理方式：</span>
                        <Select defaultValue={this.state.reason} placeholder="请选择处理方式" style={{width:'500px',height:'34px',float:'left'}} 
                        onChange={(v) => {
                                    this.setState({
                                        dealWay:v
                                    },() => {
                                        onChange && onChange(this.state)
                                    })
                                }}>
                          {opts1}
                        </Select>
                    </div>
                    <div className="input-wrap clearfix">
                        <span>上传回单：</span>
                        <Upload
                            action="http://testoms.myspzh.com/upload"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                        >
                            {fileList.length >= 3 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{width:'100%'}} src={previewImage}/>
                        </Modal>
                    </div>
                    <div className="input-wrap clearfix">
                        <span>签收说明：</span>
                        <MyInput type="textarea"
                                 placeholder="您最多可输入200字"
                                 style={{width:'calc(100% - 80px)'}}
                                 onInputChange={(v) => {
                                     this.setState({
                                         signRemark:v
                                     },() => {
                                         onChange && onChange(this.state)
                                     })
                                 }}/>
                    </div>
                </div>
            </div>
        )
    }
}

const refuseArr = [
    {name:'数量多开',id:'数量多开'},
    {name:'单品开错',id:'单品开错'},
    {name:'不方便收货（系统问题、条码没有、老板不在等）',id:'不方便收货（系统问题、条码没有、老板不在等）'},
    {name:'价格有异议',id:'价格有异议'},
    {name:'送货超市/未预约/资料不全',id:'送货超市/未预约/资料不全'},
    {name:'产品日期不好',id:'产品日期不好'},
    {name:'包装不好/质量问题',id:'包装不好/质量问题'},
    {name:'其他',id:'其他'},
]

const methodArr = [
    {name:'按仓配计出库费，记退货入库费',id:'按仓配计出库费，记退货入库费'},
    {name:'按仓配计出库费，不记退货入库费',id:'按仓配计出库费，不记退货入库费'},
    {name:'按自提计出库费，不记退货入库费',id:'按自提计出库费，不记退货入库费'},
    {name:'按自提计出库费，记退货入库费',id:'按自提计出库费，记退货入库费'},
    {name:'不计出库和退货入库费用',id:'不计出库和退货入库费用'},
]
export default SignContentPart;