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

    handleClick = (type) => {
        const {onClick} = this.props;
        if (this.state.processingMethod === type) {
            this.setState({processingMethod: ''}, () => {
                onClick && onClick(this.state)
            })
        } else {
            this.setState({processingMethod: type}, () => {
                onClick && onClick(this.state)
            })
        }
    }

    render() {
        const {onClick} = this.props;
        // 业务类型
        let queryTypeList = [{name: '销毁', type: 0}, {name: '自提', type: 1}, {name: '其它', type: 2}];
        queryTypeList = queryTypeList.map((v, i) => {
            return <span className={`type-item ${this.state.processingMethod === v.type ? 'active' : ''}`}
                         onClick={() => this.handleClick(v.type)}
                         key={i}>
                    {v.name}
                </span>
        })
        // 商品性质
        let queryNatureList = [{name: '正常销售品', type: 1,}, {name: '临期品/次品', type: 0}];
        queryNatureList = queryNatureList.map((v, i) => {
            return <span className={`type-item ${this.state.quality === v.type ? 'active' : ''}`}
                         onClick={() => {
                             if (this.state.quality === v.type) {
                                 this.setState({quality: ''}, () => {
                                     onClick && onClick(this.state)
                                 })
                             } else {
                                 this.setState({quality: v.type}, () => {
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
                    <span className="label">处理方式：</span>
                    {queryTypeList}
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