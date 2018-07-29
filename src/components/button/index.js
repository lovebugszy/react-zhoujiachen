import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

/*
*  HtmlValue:PropTypes.string.isRequired,
*  HtmlType:PropTypes.string.isRequired,
*  onClick type 为button时必传
*  onSubmit type 为submit时必传
* */
class Button extends Component {
    static propTypes = {
        HtmlValue:PropTypes.string.isRequired,
        HtmlType:PropTypes.string.isRequired,
    }

    static defaultProps = {
        HtmlValue:'确认',
        HtmlType:'button',
    }
    // 按钮点击事件触发
    handleClick = () => {
        const {onClick} = this.props;
        onClick && onClick();
    }
    // 提交事件触发
    handleSubmit = () => {
        const {onSubmit} = this.props;
        onSubmit && onSubmit();
    }

    render () {
        const {HtmlValue,HtmlType,className,style} = this.props;
        return (
            <input className={`m-global-button ${className}`}
                   type={HtmlType}
                   value={HtmlValue}
                   style={style}
                   onClick={this.handleClick}
                   onSubmit={this.handleSubmit}/>
        )
    }
}

export default Button;