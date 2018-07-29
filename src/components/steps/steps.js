import React,{ Component } from 'react';
import './style.scss';

/*
* params stepList 步骤节点 JSX结构
* 示例请看 ./components/step.js
* */
class Steps extends Component {
    render () {
        return (
            <div className={`m-steps-wrap m-steps-${this.props.direction}`}>
                {this.props.stepList}
            </div>
        )
    }
}

export default Steps