import React,{ Component } from 'react';
import './style.scss';

class LargeQueryContent extends Component {
    constructor () {
        super();
        this.state = {
            servType:'',
            storeCode:'米阳嘉兴仓',
            quality:'',
            isReceive:'',
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
        const {onClick} = this.props;
        // 业务类型
        let queryTypeList = [{name:'销售出库',type:0},{name:'调拨出库',type:1},{name:'换货出库',type:2},{name:'其它出库',type:9}];
        queryTypeList = queryTypeList.map((v,i) => {
            return <span className={`type-item ${this.state.servType === v.type ? 'active' : ''}`}
                         onClick={() => this.handleClick(v.type)}
                         key={i}>
                    {v.name}
                </span>
        })
        // 代收货款
        let queryCollectionList = [{name:'不需要',type:0},{name:'需要',type:1}];
        queryCollectionList = queryCollectionList.map((v,i) => {
            return <span className={`type-item ${this.state.isReceive === v.type ? 'active' : ''}`}
                         onClick={() => {
                             if(this.state.isReceive === v.type) {
                                 this.setState({isReceive:''},() => {
                                     onClick && onClick(this.state)
                                 })
                             } else {
                                 this.setState({isReceive:v.type},() => {
                                     onClick && onClick(this.state)
                                 })
                             }
                         }}
                         key={i}>
                        {v.name}
                  </span>
        })
        // 商品性质
        let queryNatureList = [{name:'正常销售品',type:1,},{name:'临期品/次品',type:0}];
        queryNatureList = queryNatureList.map((v,i) => {
            return <span className={`type-item ${this.state.quality === v.type ? 'active' : ''}`}
                         onClick={() => {
                             if(this.state.quality === v.type) {
                                 this.setState({quality:''},() => {
                                     onClick && onClick(this.state)
                                 })
                             } else {
                                 this.setState({quality:v.type},() => {
                                     onClick && onClick(this.state)
                                 })
                             }
                         }}
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
                    <span className="label">代收货款：</span>
                    {queryCollectionList}
                </li>
                <li className="m-large-query-list clearfix">
                    <span className="label">仓库：</span>
                    <span className="type-item active">{this.state.storeCode}</span>
                </li>
                <li className="m-large-query-list clearfix">
                    <span className="label">商品性质：</span>
                    {queryNatureList}
                </li>
            </ul>
        )
    }
}

export default LargeQueryContent;