import React,{ Component } from 'react';
import MyInput from '../../../../../../../components/input';

class reasonInput extends Component {
    state = {
        value:'',
    }
    handleInputChange = (e) => {
        console.log('radio checked',e);
        const {onChange} = this.props;
        //console.log(onChange)
        this.setState({
            value:e,
        },() => {
            onChange && onChange(this.state.value);
        });
    }

    render () {
        const inputStyle = {
            width:'220px',
        };
        const reasonBox={
            padding:'20px 0 0 30px',
        }
        return (
            <div>
                    <div style={reasonBox}>
                        <label>取消原因: </label>
                        <MyInput style={inputStyle} onInputChange={this.handleInputChange} value={this.state.value} type="text" placeholder="请输入取消原因"/>
                    </div>

            </div>
        )
    }
}

export default reasonInput;