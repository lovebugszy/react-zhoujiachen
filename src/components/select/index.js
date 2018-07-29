import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

/*
* @params  selectList   -> array  选择器列表 非必传
* @params  placeholder  -> string input默认话语 非必传 不传时默认选择selectList第0位
* @params  selectStyle  -> object 外层元素样式 非必传
* @params  selectChange -> func 必传 监听所选回调
* */
class Select extends Component {
    constructor (props) {
        super(props)
        this.state = {
            focus:false,
            selectValue:'',
        }
    }

    componentDidMount () {
        if(!this.props.placeholder && this.props.selectList.length > 0) {
            this.handleClick(this.props.selectList[0])
        }
        if(!this.props.value && this.props.selectList.length > 0) {
            this.setState({selectValue:this.props.value});
        }
       
    }

    static propTypes = {
        selectChange:PropTypes.func.isRequired
    }

    handleFocus = () => {
        this.setState({focus:true})
    }

    handleBlur = () => {
        setTimeout(() => {
            this.setState({focus:false})
        },200)
    }

    handleClick = (v) => {
        this.setState({selectValue:v.name});
        const {selectChange} = this.props;
        selectChange(v);
    }

    handleChange = (event) => {
        // event.preventDefault();
        // const {handleChange} = this.props;
        // handleChange(this.state.selectValue);
    }

    render () {
        const {selectList = [],placeholder,selectStyle,value} = this.props;
        const placeholderValue = selectList.length <= 0 ? '暂无可选列表' : placeholder || selectList[0].name;
        
        console.log("支付默认",value)
        const lis = selectList.length <= 0 ?
            <li className="m-select-item-empty">暂无可选列表</li> :
            selectList.map((v,i) => {
                return <li key={i} onClick={() => this.handleClick(v)}>{v.name}</li>;
            })
        return (
            <div className={`m-select-wrap ${this.state.focus ? 'focus' : ''}`} style={selectStyle}>
                <i className={`m-arrow ${this.state.focus ? 'm-arrow-active' : ''}`}/>
                <div className="m-select-input-wrap">
                    <input type="text"
                           value={value}
                           placeholder={placeholderValue}
                           onFocus={this.handleFocus}
                           onBlur={this.handleBlur}
                           onChange={this.handleChange}
                           />
                </div>
                <ul className={`${this.state.focus ? 'm-select-open' : '' } m-select-list`}>
                    {lis}
                </ul>
            </div>
        )
    }
}

export default Select