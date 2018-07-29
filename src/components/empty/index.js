import React,{ Component } from 'react';
import './style.scss';

class Empty extends Component {

    render () {
        return (
            <tr>
                <td colSpan="9">
                    <div className="m-empty-wrap">
                        <div className="m-empty-bg"/>
                    </div>
                </td>
            </tr>
        )
    }
}

export default Empty;