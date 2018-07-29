import React,{ Component } from 'react';
import './style.scss';
import Header from '../../../../components/header';
import Title from '../../../../components/title';
import { fetchPost } from "../../../../fetch/fetch";
import api from '../../../../utils/interface';
import SingleOrderDetails from './components/single-order-details';
import Steps from '../../../../components/steps';
import { fetchDynamic } from '../../../../utils/utils';
import Modal from '../../../../components/modal';
import DetailsTable from './components/details-table';

const StepHorizontal = Steps.StepHorizontal;
const StepVertical = Steps.StepVertical;

class OutputDetail extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id:props.match.params.id,
            details:{},
            orderCode:'',
            code:'',
            businessId:'',
            goodsList:[],
            stepHorizontalList:[], // 横向节点list
            stepVerList:[],        // 竖向节点list
            openModal:false,
        }
    }

    componentDidMount () {
        this.fetchDetails()
    }

    // 订单详情
    fetchDetails = () => {
        const params = {
            subservice:"orderInfo",
            params:{
                orderid:this.state.id
            }
        }
        fetchPost(api.outputDetails,params).then(res => {
            const code = res.code;
            if(code === '1000') {
                res.data.goodsList.forEach((v,i) => {
                    v.key = i;
                    // 商品信息拼接
                    v.goodsName = {
                        goodsName:v.goodsName,
                        goodsCode:v.goodsCode,
                        goodsSpec:v.goodsSpec,
                        goodsPackage:v.goodsPackage,
                        goodsUnit:v.goodsUnit
                    }
                    // 数量拼接
                    v.planNum = {
                        status:res.data.orderStatus,
                        planNum:v.planNum,
                        rewriteNum:v.rewriteNum
                    }
                    // 价格拼接
                    v.discountPrice = {
                        discountPrice:v.discountPrice,
                        goodsPrice:v.goodsPrice,
                        discountRate:v.discountRate
                    }
                })
                this.setState({
                    orderCode:res.data.orderCode,
                    code:res.data.businessCode,
                    businessId:res.data.businessId,
                    details:res.data,
                    goodsList:res.data.goodsList
                },() => {
                    this.fetchOutputDynamic();
                })
            }
        })
    }

    // 动态步骤条
    fetchOutputDynamic = () => {
        //0：创建订单 /修改订单 1：审核订单 2：拣货中 3：确认后待签收 4：正常签收 5：客户拒收 6：部分签收 7：异常出库处理 9：装车发货
        let {orderCode,code} = this.state;
        fetchDynamic(orderCode,3,code).then(res => {
            let list = res.data;
            let stepVerList = res.data;
            let newArr = [],newList = [];
            list = list.reverse();
            list.forEach((v,i) => {
                // 所有异常完成状态改写为同一标识
                v.statusType = v.statusCode; // 保存原先statusCode 后边使用
                v.statusCode = v.statusCode === 4 || v.statusCode === 5 || v.statusCode === 6 || v.statusCode === 7 ? 8 : v.statusCode;
                let statusCode = parseInt(v.statusCode,0);
                // 过滤掉确认后待签收
                if(statusCode !== 3) {
                    // 创建订单/修改订单时有多条取第一条
                    if(statusCode === 0) {
                        if(newArr.indexOf(statusCode) === -1) {
                            newArr.push(statusCode);
                            newList.push(v);
                        }
                    } else {
                        // 除去0状态 其它状态有多条时取最后一条
                        if(newArr.indexOf(statusCode) !== -1) {
                            newArr.splice(newArr.indexOf(statusCode),1,statusCode);
                            newList.splice(newArr.indexOf(statusCode),1,v);
                        } else {
                            newArr.push(statusCode);
                            newList.push(v);
                        }
                    }
                }
            })
            newList.forEach(v => v.status = 'finish');
            let length = newList.length - 1;
            // 把所有code 状态转为number 处理
            let statusCode = parseInt(newList[length].statusCode,0);
            if(statusCode === 8 || statusCode === 99) {
                if(statusCode === 99) {
                    newList[length].operationTitle = '取消'
                }
                newList[length].status = 'fail';
            } else if(statusCode === 2) {
                newList.push(
                    {dateTime:'',operationTitle:'装车发货',status:'pending'},
                    {dateTime:'',operationTitle:'完成',status:'normal'},)
            } else if(statusCode === 1) {
                newList.push(
                    {dateTime:'',operationTitle:'拣货中',status:'pending'},
                    {dateTime:'',operationTitle:'装车发货',status:'normal'},
                    {dateTime:'',operationTitle:'完成',status:'normal'})
            } else if(statusCode === 0) {
                newList.push(
                    {dateTime:'',operationTitle:'审核订单',status:'pending'},
                    {dateTime:'',operationTitle:'拣货',status:'normal'},
                    {dateTime:'',operationTitle:'装车发货',status:'normal'},
                    {dateTime:'',operationTitle:'完成',status:'normal'})
            } else if(statusCode === 9) {
                newList.push(
                    {dateTime:'',operationTitle:'完成',status:'pending'},)
            } else if(statusCode === 4) {
                newList[length].operationTitle = '正常完成';
            }
            this.setState({
                stepHorizontalList:newList,
                stepVerList:stepVerList
            })
            console.log(this.state.stepVerList)
        })
    }

    // 关闭详情
    handleClose = () => {
        this.setState({
            openModal:false,
            stepVerList:this.state.stepVerList && this.state.stepVerList.reverse()
        })
    }

    render () {
        const {details,goodsList,stepHorizontalList,stepVerList} = this.state;
        // 横向步骤条
        const StepHorizontalList = stepHorizontalList.map((v,i) => {
            v.stepTitle = v.operationTitle;
            v.stepTime = v.dateTime;
            return <StepHorizontal {...v} key={i} length={stepHorizontalList.length} id={this.state.id}/>
        })
        // 竖向步骤条
        const StepVerticalList = stepVerList && stepVerList.map((v,i) => {
            // 区分创建订单跟修改订单
            if(i !== (stepVerList.length - 1) && v.statusCode === 0) {
                v.outStatus = 'normal';
            } else {
                v.outStatus = v.statusType;
            }
            // 当前状态高亮
            v.active = i === 0 ? 'active' : '';
            // 时间拆分
            const times = v.dateTime
            const time = [times.slice(0,times.indexOf(' ')),times.slice(times.indexOf(' '))];
            return <StepVertical  {...v} key={i} openImgFlag='' time={time}/>
        })
        let listBottom;
        // 米阳配送
        if(Number(details.dcType) === 0 || details.dcType === '米阳配送') {
            console.log(details,details.isReceive)
            // 需要代收货款
            if(Number(details.isReceive) === 1) {
                listBottom = <div>
                    <div className="li">
                        <span>是否代收货款：</span><span> {details.isReceive === 0 ? '否' : '是'}</span>
                    </div>
                    <div className="li">
                        <span>额外抵扣：</span>
                        <span className="red">-¥ {details.deductMoney}</span>
                    </div>
                    <div className="li">
                        <span>额外收款：</span>
                        <span className="red">¥ {details.surchargeMoney}</span>
                    </div>
                    <div className="li">
                        <span>代收金额：</span>
                        <span className="red proxyMoney">¥ {details.proxyMoney}</span>
                    </div>
                    {details.paidMoney === '' || details.paidMoney === undefined || details.paidMoney === null ? '' :
                        <div className="li">
                            <span>实际收款：</span>
                            <span className="red">¥ {details.paidMoney}</span>
                        </div>}
                    {
                        details.paidMoney === '' || details.paidMoney === undefined || details.paidMoney === null ? '' :
                            <div className="li">
                                <span>拒收金额：</span>
                                <span className="red">¥ {details.jsMoney}</span>
                            </div>
                    }
                    <div className="li"><span>备注：</span><span> {details.remark}</span></div>
                </div>
            } else {
                listBottom = <div>
                    <div className="li">
                        <span>是否代收货款：</span><span> {details.isReceive === 0 ? '否' : '是'}</span>
                    </div>
                    <div className="li"><span>备注：</span><span> {details.remark}</span></div>
                </div>
            }
        } else {
            listBottom = <div className="li"><span>备注：</span><span> {details.remark}</span></div>
        }
        return (
            <div className="m-output-detail-wrap">
                <Header/>
                <div className="m-output-detail-inner">
                    <Title title="出库单详情" subTitle={{assgin1:'出库单',assgin2:'出库单详情',Link:'/m/business/output'}}/>
                    <div className="steps-box-wrap">
                        <Steps stepList={StepHorizontalList} direction="horizontal"/>
                        <span className="details-btn" onClick={() => {
                            this.setState({
                                openModal:true,
                                stepVerList:stepVerList && stepVerList.reverse()
                            })
                        }}/>
                        <Modal modalTitle="入库单状态"
                               style={{width:'540px'}}
                               openModal={this.state.openModal}
                               onClick={this.handleClose}>
                            <Steps stepList={StepVerticalList} direction="vertical"/>
                        </Modal>
                    </div>
                    <div className="output-detail-content">
                        <SingleOrderDetails details={details}/>
                        <div className="details-table">
                            <DetailsTable goodsList={goodsList}/>
                        </div>
                        <div className="list-bottom">
                            {listBottom}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OutputDetail;