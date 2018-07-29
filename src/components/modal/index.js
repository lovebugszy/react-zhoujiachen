import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './style.scss';
import MyButton from '../button';

/*
* modalTitle -> string 模态框title
* modalInnerStyle -> object 模态框样式
* buttonFlag -> boolean 是否要求出现button  ---button 待考察是否需要button的出现
* children  框内容 接受任意形式
* content   框内容 使用button 时接受的组件
* 
* */
class Modal extends Component {
    constructor (props) {
        super(props)
        this.state = {
            openModal:props.openModal,
        }
    }

    static propTypes = {
        openModal:PropTypes.bool.isRequired,
    }

    static defaultProps = {
        openModal:false
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            openModal:nextProps.openModal
        })
    }
    
    handleOk = () => {
        const {onOkClick} = this.props;
        onOkClick && onOkClick();
    }

    handleCancel = () => {
        this.setState({
            openModal:false
        })
        const {onCancelClick,onClick} = this.props;
        onCancelClick && onCancelClick();
        onClick && onClick();
    }

    render () {
        let {modalTitle = '提示',style,buttonFlag = false,children,content} = this.props;
        children = React.Children.toArray(children)
        const button = buttonFlag ?
            <div className="m-modal-button-wrap">
                <MyButton className="m-button-default cancel"
                          HtmlValue="取消"
                          HtmlType="button"
                          style={{
                              background:'#fff',
                              width:'120px',
                              height:'38px',
                              borderColor:'#d2d2d2',
                              color:'#666',
                              fontSize:'16px'
                          }}
                          onClick={() => this.handleCancel()}/>
                <MyButton className="m-button-primary"
                          HtmlValue="确定"
                          HtmlType="button"
                          style={{
                              width:'120px',
                              height:'38px',
                              fontSize:'16px'
                          }}
                          onClick={() => this.handleOk()}/>
            </div> : '';
        return (
            <div className={`m-modal-wrap ${this.state.openModal ? 'm-modal-block' : ''}`}>
                <div className="m-modal-inner" style={style}>
                    <h3>{modalTitle} <span className="close" onClick={this.handleCancel}/></h3>
                    {content ? content : ""}
                    <div className="m-modal-content">
                        {children}
                        {
                            buttonFlag ? button : ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;