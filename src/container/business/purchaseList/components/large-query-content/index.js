import React, {Component} from 'react';
import './style.scss';

class LargeQueryContent extends Component {
    constructor() {
        super();
        this.state = {
            processingMethod: '',
            storeCode: '米阳嘉兴仓',
            quality: '',
        }
    }

    render() {
        return (
            <ul className="m-large-query-content">
                <li className="m-large-query-list clearfix">
                    <span className="label">仓库：</span>
                    <span className="type-item active">{this.state.storeCode}</span>
                </li>
            </ul>
        )
    }
}

export default LargeQueryContent;