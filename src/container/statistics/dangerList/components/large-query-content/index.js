/**
 * Created by Administrator on 2018/7/19.
 */
/**
 * Created by Administrator on 2018/7/19.
 */
/**
 * Created by Administrator on 2018/7/17.
 */

import React, {Component} from 'react';
import './style.scss';

class LargeQueryContent extends Component {
    constructor() {
        super();
        this.state = {
            storeCode: '米阳嘉兴仓',

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