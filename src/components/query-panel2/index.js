import React,{ Component } from 'react';
import MyInput from '../../components/input';
import './style.scss';
import PropTypes from 'prop-types';
import Select from '../../components/select';
import MyButton from '../../components/button';

class QueryPanel extends Component {
    constructor (props) {
        super(props)
        this.state = {
            largeFlag:false,
            oddNumber:'',   // 请输入单号/来源单号/供应商名称
            enterprise:'',  // 所选企业
            placeholder:'订单号/客户名称',
        }
    }

    static propTypes = {
        onQuery:PropTypes.func.isRequired,
        onExports:PropTypes.func.isRequired,
        selectList:PropTypes.array.isRequired
    }

    static defaultProps = {}
    // 单号/来源单号/供应商名称变化
    handleInputChange = (value) => {
        console.log(value)
        this.setState({
            oddNumber:value
        })
    }

    // 企业变化
    handleSelectChange = (value) => {
        this.setState({
            enterprise:value
        })
    }

    // 点击查询
    handleQuery = () => {
        const {onQuery} = this.props;
        onQuery && onQuery(this.state);
    }

    // 点击导出
    handleExports = () => {
        const {onExports} = this.props;
        onExports && onExports(this.state);
    }

    render () {
        const {largeQueryContent,largeQueryHeight,selectList,placeholder} = this.props;
        return (
            <div className="m-query-wrap clearfix">
                <div className="m-normal-style clearfix">
                    <MyInput type="text"
                             placeholder={placeholder}
                             className="icon"
                             style={{float:'left'}}
                             onInputChange={this.handleInputChange}/>
                    
                    <Select selectStyle={{width:'240px',height:'34px',marginLeft:'10px',float:'left'}}
                            selectList={selectList}
                            selectChange={this.handleSelectChange}/>
                    <MyButton className="m-button-primary"
                              HtmlValue="查询"
                              HtmlType="button"
                              style={{margin:'0 10px 0 10px'}}
                              onClick={this.handleQuery}/>
                   
                    <MyButton className="m-button-primary"
                              HtmlValue="导出"
                              HtmlType="button"
                              style={{float:'right'}}
                              onClick={this.handleExports}/>
                </div>
                <div className={`m-large-query ${this.state.largeFlag ? 'block' : ''}`}
                     style={{height:`${this.state.largeFlag ? largeQueryHeight : '0'}`}}>
                    {largeQueryContent}
                </div>
            </div>
        )
    }
}

export default QueryPanel