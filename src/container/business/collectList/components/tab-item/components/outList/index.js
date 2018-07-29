import React,{ Component } from 'react';
import { Radio } from 'antd';


class OutList extends Component {
    state = {
        value:1,
    }


    render () {
        const {outlist} = this.props;
        console.log("jout");
        console.log(outlist)
        return (
            <td className="td">
                345
            </td>
            <td className="td">
                654
            </td>
            <td className="td">
                ttt
            </td>
        )
    }
}

export default OutList;