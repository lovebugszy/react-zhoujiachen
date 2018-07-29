import React,{ Component } from 'react';
import Steps from '../../components/steps';

const Step = Steps.StepHorizontal;

class Stepss extends Component {
    render () {
        const arr = [
            {stepTime:'2018-06-05 17:49:35',stepTitle:'创建订单',status:'finish'},
            {stepTime:'2018-06-05 17:49:35',stepTitle:'审核订单',status:'finish'},
            {stepTime:'2018-06-05 17:49:35',stepTitle:'取消',status:'pending'},
            {stepTime:'2018-06-05 17:49:35',stepTitle:'开始订单',status:'pending'},
            {stepTime:'2018-06-05 17:49:35',stepTitle:'开始订单',status:'pending'},
        ]
        const StepList = arr.map((v,i) => {
            return <Step {...v} key={i} length={arr.length}/>
        })
        return (
            <div style={{width:'100%',background:'#fff',padding:'20px'}}>
                <Steps stepList={StepList} direction="horizontal"/>
            </div>
        )
    }
}

export default Stepss;