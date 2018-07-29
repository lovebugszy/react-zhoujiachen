import React, {Component} from 'react';

class LargeQueryContent extends Component {
    constructor() {
        super();
        this.state = {
            servType: '',
            storename: '米阳嘉兴仓',
        }
    }

    handleClick = (type) => {
        const {onClick} = this.props;
        if (this.state.servType === type) {
            this.setState({servType: ''}, () => {
                onClick && onClick(this.state)
            })
        } else {
            this.setState({servType: type}, () => {
                onClick && onClick(this.state)
            })
        }
    }

    render() {
        return (
            <ul className="m-large-query-content">

                <li className="m-large-query-list clearfix">
                    <span className="label">仓库：</span>
                    <span className="type-item active">{this.state.storename}</span>
                </li>
            </ul>
        )
    }
}

export default LargeQueryContent;