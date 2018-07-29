import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

export default class Message extends Component {
    render () {
        const {info,tip} = this.props;
        return (
            <div className={`m-message-wrap m-${info}`}>
                {/*<span className={`m-icon-${info}`}/>*/}
                <p className={`m-text-${info}`}>{tip}</p>
            </div>
        )
    }
}

Message.newInstance = function newMessageInstance (properties = {}) {
    let props = properties;
    let div = document.createElement('div');
    document.body.appendChild(div);
    //let notification = 
    ReactDOM.render(React.createElement(Message,props),div);
    return {
        destroy () {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        },
    };
}
