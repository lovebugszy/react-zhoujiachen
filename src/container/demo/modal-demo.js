import React,{ Component } from 'react';
import Modal from '../../components/modal';
import Steps from '../../components/steps';

const Step = Steps.StepVertical;

class ModalDemo extends Component {
    state = {
        openModal:false
    }
    handleOpen = () => {
        this.setState({
            openModal:true
        })
    }

    render () {
        const arr = [
            {
                time:['2018-05-19','19:34:49'],
                title:'订单正常签收',
                remark:'吧啦吧啦吧啦吧吧备注',
                content:'',
                photoList:['https://avatars3.githubusercontent.com/u/3000285?s=460&v=4',
                    'https://avatars3.githubusercontent.com/u/3000285?s=460&v=4',
                    'https://avatars3.githubusercontent.com/u/3000285?s=460&v=4'],
                operation:'孙勇华',

            },
            {
                time:['2018-05-19','19:34:49'],
                title:'订单正常签收',
                remark:null,
                content:'订单开始吧啦吧啦吧啦吧订单开始吧啦吧啦吧啦吧订单开始吧啦吧啦吧啦吧订单开始吧啦吧啦吧啦吧订单开始吧啦吧啦吧啦吧',
                photoList:['https://avatars3.githubusercontent.com/u/3000285?s=460&v=4',
                    'https://avatars3.githubusercontent.com/u/3000285?s=460&v=4',
                    'https://avatars3.githubusercontent.com/u/3000285?s=460&v=4'],
                operation:'孙勇华'
            },
            {
                time:['2018-05-19','19:34:49'],
                title:'订单正常签收',
                remark:null,
                content:'订单开始吧啦吧啦吧啦吧订单开始吧啦吧啦吧啦吧订单开始吧啦吧啦吧啦吧订单开始吧啦吧啦吧啦吧订单开始吧啦吧啦吧啦吧',
                photoList:['https://avatars3.githubusercontent.com/u/3000285?s=460&v=4',
                    'https://avatars3.githubusercontent.com/u/3000285?s=460&v=4',
                    'https://avatars3.githubusercontent.com/u/3000285?s=460&v=4'],
                operation:'孙勇华'
            },
            {
                time:['2018-05-19','19:34:49'],
                title:'订单正常签收',
                remark:null,
                content:'订单开始吧啦吧啦吧啦吧订单开始吧啦吧啦吧啦吧订单开始吧啦吧啦吧啦吧订单开始吧啦吧啦吧啦吧订单开始吧啦吧啦吧啦吧',
                photoList:['https://avatars3.githubusercontent.com/u/3000285?s=460&v=4',
                    'https://avatars3.githubusercontent.com/u/3000285?s=460&v=4',
                    'https://avatars3.githubusercontent.com/u/3000285?s=460&v=4'],
                operation:'孙勇华'
            },
            {
                time:['2018-05-19','19:34:49'],
                title:'订单正常签收',
                remark:null,
                content:'订单开始吧啦吧啦吧啦吧订单开始吧啦吧啦吧啦吧订单开始吧啦吧啦吧啦吧订单开始吧啦吧啦吧啦吧订单开始吧啦吧啦吧啦吧',
                photoList:['https://avatars3.githubusercontent.com/u/3000285?s=460&v=4',
                    'https://avatars3.githubusercontent.com/u/3000285?s=460&v=4',
                    'https://avatars3.githubusercontent.com/u/3000285?s=460&v=4'],
                operation:'孙勇华'
            },
            {
                time:['2018-05-19','19:34:49'],
                title:'订单正常签收',
                remark:null,
                content:'订单开始吧啦吧啦吧啦吧订单开始吧啦吧啦吧啦吧订单开始吧啦吧啦吧啦吧订单开始吧啦吧啦吧啦吧订单开始吧啦吧啦吧啦吧',
                photoList:['https://avatars3.githubusercontent.com/u/3000285?s=460&v=4',
                    'https://avatars3.githubusercontent.com/u/3000285?s=460&v=4',
                    'https://avatars3.githubusercontent.com/u/3000285?s=460&v=4'],
                operation:'孙勇华'
            },
        ]
        const StepList = arr.map((v,i) => {
            return <Step {...v} key={i} openImgFlag=''/>
        })
        return (
            <div>
                <button onClick={this.handleOpen}>点击开启模态框</button>
                <Modal modalTitle="入库单状态"
                       style={{width:'540px'}}
                       openModal={this.state.openModal}
                       buttonFlag={false}>
                    <Steps stepList={StepList} direction="vertical" />
                </Modal>
            </div>
        )
    }
}

export default ModalDemo;