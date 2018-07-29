import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class MyInput extends Component {
    constructor (props) {
        super(props)
        this.state = {
            value:'',
        }
    }

    static propTypes = {
        type:PropTypes.string.isRequired
    }

    typeCheck = (type) => {
        if(type === 'textarea') {
            return 'textarea'
        }
        return type === 'number' ? 'text' : type;
    }

    handleChange = (event) => {
        const {onInputChange,type} = this.props;
        if(type === 'number') {
            this.setState({
                value:event.target.value.replace(/[^\d^\.]+/g,'')
            },() => {
                onInputChange && onInputChange(this.state.value);
            })
        } else {
            this.setState({
                value:event.target.value
            },() => {
                onInputChange && onInputChange(this.state.value);
            })
        }
    }
    handleEnterKey = (e) => {
        const {onEnterKey,type} = this.props;
        if(e.keyCode === 13) {
            onEnterKey && onEnterKey(this.state.value);
        }
    }

    render () {
        let {type,placeholder = "请输入内容",className,style,value = ''} = this.props;
        type = this.typeCheck(type);
        value = String(value)
        if(type === 'textarea') {
            return (
                <textarea
                    type={type}
                    style={style}
                    className={`_m-textarea ${className}`}
                    placeholder={placeholder}
                    onChange={this.handleChange}
                    defaultValue={value}/>
            )
        } else {
            return (
                <input type={type}
                       placeholder={placeholder}
                       style={style}
                       className={`_m-input ${className}`}
                       onChange={this.handleChange}
                       defaultValue={value}
                       onKeyUp={this.handleEnterKey}/>
            )
        }
    }
}

export default MyInput;