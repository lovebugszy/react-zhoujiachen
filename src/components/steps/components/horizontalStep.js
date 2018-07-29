import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import './hor-step.scss';

/*
* params stepTitle  -> 步骤title 必传
* params stepTime   -> 步骤时间   必传
* params length     -> 一共几条步骤 必传
* params status     -> 步骤状态   必传  finish 完成  pending 处理中 fail 失败 normal 默认状态
*  // 示例
   // 引入
    import Steps from '*components/steps'; // *代表你的绝对路径
    const Step = Steps.Step;
   // 操作 
    const arr = [
        {stepTime:'2018-06-05 17:49:35',stepTitle:'创建订单',status:'finish'},
        {stepTime:'2018-06-05 17:49:35',stepTitle:'审核订单',status:'finish'},
        {stepTime:'2018-06-05 17:49:35',stepTitle:'取消',status:'pending'},
        {stepTime:'2018-06-05 17:49:35',stepTitle:'开始订单',status:'pending'},
        {stepTime:'2018-06-05 17:49:35',stepTitle:'开始订单',status:'pending'},
    ]
    const StepList = arr.map((v,i) => {
        return <Step stepTitle={v.stepTitle}
                     stepTime={v.stepTime}
                     key={i}
                     status={v.status}
                     length={arr.length}/>
    })
    return (
        <div style={{width:'100%',background:'#fff',padding:'20px'}}>
            <Steps stepList={StepList}/>
        </div>
    )
* */
class Step extends Component {
    render () {
        const {stepTitle,stepTime,length,status,id} = this.props;
        console.log("re-props",this.props)
        console.log("ididid",id)
        const width = 72 / (length - 1);
        return (
            <div className={`m-step-item-hor ${status}`} style={{width:width + '%'}}>
                <div className="m-step-status">
                    <p>{stepTitle}</p>
                    <i className={status}/>
                    <p className="m-step-time">{stepTime}</p>
                    {(stepTitle === "部分签收" || stepTitle === "客户拒收" || stepTitle === "异常出库处理")?<Link className="reject-icon" to={`/rejectdetailout/${id}`} />:''}
                </div>
            </div>
        )
    }
}

export default Step;