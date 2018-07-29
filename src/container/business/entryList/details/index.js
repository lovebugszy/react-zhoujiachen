import React,{ Component } from 'react';
import './style.scss';
import { fetchPost } from "../../../../fetch/fetch";
import api from '../../../../utils/interface';
import Header from '../../../../components/header';
import Title from '../../../../components/title';
import Steps from '../../../../components/steps';
import SingleOwnerInfo from './components/single-owner-information';
import Operation from './components/Operation';
import { Table } from 'antd';
import Modal from '../../../../components/modal';

const StepHorizontal = Steps.StepHorizontal;
const StepVertical = Steps.StepVertical;

class EntryDetail extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id:props.match.params.id,
            orderCode:'',
            code:'',
            businessId:'',
            stepList:[],
            details:{},
            stepVerList:'',
            openModal:false,
        }
    }

    componentDidMount () {
        this.fetchDetail();
    }

    // 请求详情
    fetchDetail = () => {
        const params = {
            subservice:"infoinorder",
            params:{
                inorder:{
                    orderid:this.state.id
                }
            }
        }
        fetchPost(api.entryDetails,params).then(res => {
            const code = res.code;
            if(code === '1000') {
                res.data.goodsList.forEach((v,i) => {
                    v.key = i;
                    v.goodsName = {
                        goodsName:v.goodsName,
                        goodsCode:v.goodsCode,
                        goodsSpec:v.goodsSpec,
                        goodsPackage:v.goodsPackage,
                        goodsUnit:v.goodsUnit
                    }
                })
                this.setState({
                    orderCode:res.data.orderCode,
                    code:res.data.businessCode,
                    businessId:res.data.businessId,
                    details:res.data,
                    goodList:res.data.goodsList
                },() => {
                    this.fetchDynamic();
                })
            }
        })
    }

    // 请求步骤条内容
    fetchDynamic = () => {
        const params = {
            orderCode:this.state.orderCode,
            orderType:"1",
            user:{
                code:this.state.code,
            }
        }
        fetchPost(api.dynamic,params).then(res => {
            const code = res.code;
            if(code === '1000') {
                let list = res.data
                let newArr = [];
                let newList = [];
                list = list.reverse()
                // statusCode 订单状态 0:待审核1:已审核2:收货中3:正常完成,4:异常完成9已取消
                list.forEach(v => {
                    let statusCode = parseInt(v.statusCode,0)
                    if(statusCode !== 2) {
                        if(newArr.indexOf(statusCode) === -1) {
                            newArr.push(statusCode);
                            newList.push(v);
                        }
                    } else {
                        if(newArr.indexOf(statusCode) !== -1) {
                            newArr.splice(newArr.indexOf(statusCode),1,statusCode);
                            newList.splice(newArr.indexOf(statusCode),1,v);
                        } else {
                            newArr.push(statusCode);
                            newList.push(v);
                        }
                    }
                })
                newList.forEach(v => v.status = 'finish');
                let length = newList.length - 1;
                // 把所有code 状态转为number 处理
                let statusCode = parseInt(newList[length].statusCode,0);
                if(statusCode === 4 || statusCode === 9) {
                    if(statusCode === 4) {
                        newList[length].operationTitle = '异常完成';
                    }
                    newList[length].status = 'fail';
                } else if(statusCode === 2) {
                    newList.push({dateTime:'',operationTitle:'完成',status:'pending'},)
                } else if(statusCode === 1) {
                    newList.push({dateTime:'',operationTitle:'仓库收货',status:'pending'},
                        {dateTime:'',operationTitle:'完成',status:'normal'})
                } else if(statusCode === 0) {
                    newList.push(
                        {dateTime:'',operationTitle:'审核订单',status:'pending'},
                        {dateTime:'',operationTitle:'仓库收货',status:'normal'},
                        {dateTime:'',operationTitle:'完成',status:'normal'})
                }
                this.setState({
                    stepList:newList,
                    stepVerList:res.data
                })
            }
        })
    }

    // 关闭modal时触发事件
    handleClose = () => {
        this.setState({
            openModal:false,
            stepVerList:this.state.stepVerList && this.state.stepVerList.reverse()
        })
    }

    render () {
        let {stepList:list,stepVerList} = this.state;
        // 横向步骤条
        const StepHorizontalList = list.map((v,i) => {
            v.stepTitle = v.operationTitle;
            v.stepTime = v.dateTime;
            return <StepHorizontal {...v} key={i} length={list.length}/>
        })

        // 竖向步骤条
        const StepVerticalList = stepVerList && stepVerList.map((v,i) => {
            // 区分创建订单跟修改订单
            if(i !== (stepVerList.length - 1) && v.statusCode === 0) {
                v.statusType = 'normal';
            } else {
                v.statusType = v.statusCode;
            }
            // 当前状态高亮
            v.active = i === 0 ? 'active' : '';
            // 时间拆分
            const times = v.dateTime
            const time = [times.slice(0,times.indexOf(' ')),times.slice(times.indexOf(' '))];
            return <StepVertical  {...v} key={i} openImgFlag='' time={time}/>
        });
        return (
            <div className="m-entry-detail-wrap">
                <Header/>
                <div className="m-entry-detail-inner">
                    <Title title="入库单详情" subTitle={{assgin1:'入库单',assgin2:'入库单详情',Link:'/m/business/entry'}}/>
                    <div className="steps-box-wrap">
                        <Steps stepList={StepHorizontalList} direction="horizontal"/>
                        <span className="details-btn" onClick={() => {
                            this.setState({
                                openModal:true,
                                stepVerList:this.state.stepVerList && this.state.stepVerList.reverse()
                            })
                        }}/>
                        <Modal modalTitle="入库单状态"
                               style={{width:'540px'}}
                               openModal={this.state.openModal}
                               onClick={this.handleClose}>
                            <Steps stepList={StepVerticalList} direction="vertical"/>
                        </Modal>
                    </div>
                    
                    <div className="entry-detail-content">
                        <SingleOwnerInfo details={this.state.details}/>
                        <Table
                            columns={columns}
                            dataSource={this.state.goodList}
                            pagination={false}
                            bordered/>
                    </div>
                </div>
            </div>
        )
    }
}

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
    {title:'',dataIndex:'id',},
    {title:'商品信息',className:'goodsName',dataIndex:'goodsName',render:goodsName => <GoodsName goodsName={goodsName}/>,},
    {title:'价格',dataIndex:'goodsPrice',render:text => <span>¥{text}</span>,},
    {title:'计划入库量',dataIndex:'planNum',},
    {title:'备注',dataIndex:'remark',},
    {
        title:'操作',dataIndex:'inOrderBatchList',
        render:inOrderBatchList => <Operation inOrderBatchList={inOrderBatchList}/>
    }
];
export default EntryDetail;