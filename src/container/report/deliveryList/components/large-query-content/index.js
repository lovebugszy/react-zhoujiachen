/**
 * Created by Administrator on 2018/7/16.
 */
import React,{ Component } from 'react';

class LargeQueryContent extends Component {
    constructor () {
        super();
        this.state = {
            servType:'',
            storename:'米阳嘉兴仓',
        }
    }

    handleClick = (type) => {
        const {onClick} = this.props;
        if(this.state.servType === type) {
            this.setState({servType:''},() => {
                onClick && onClick(this.state)
            })
        } else {
            this.setState({servType:type},() => {
                onClick && onClick(this.state)
            })
        }
    }

    render () {
        let queryTypeList = [{name:'采购入库',type:0},{name:'生产入库',type:1},{name:'调拨入库',type:2},{name:'其它入库',type:9}];
        queryTypeList = queryTypeList.map((v,i) => {
            return <span className={`type-item ${this.state.servType === v.type ? 'active' : ''}`}
                         onClick={() => this.handleClick(v.type)}
                         key={i}>
                    {v.name}
                </span>
        })
        return (
            <ul className="m-large-query-content">
                <li className="m-large-query-list clearfix">
                    <span className="label">业务类型：</span>
                    {queryTypeList}
                </li>
                <li className="m-large-query-list clearfix">
                    <span className="label">仓库：</span>
                    <span className="type-item active">{this.state.storename}</span>
                </li>
            </ul>
        )
    }
}

export default LargeQueryContent;