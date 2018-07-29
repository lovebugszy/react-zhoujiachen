import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import MyInput from '../../components/input';
import './style.scss';
import PropTypes from 'prop-types';
import MyButton from '../../components/button';

class QueryPanel3 extends Component {
    constructor (props) {
        super(props)
        this.state = {
            largeFlag:false,
            oddNumber:'',   // 请输入单号/来源单号/供应商名称
        }
    }

    static propTypes = {
        onQuery:PropTypes.func.isRequired,
        //onExports:PropTypes.func.isRequired,

    }

    static defaultProps = {}
    // 单号/来源单号/供应商名称变化
    handleInputChange = (value) => {
        console.log(value)
        this.setState({
            oddNumber:value
        })
    }

    // 点击查询
    handleQuery = () => {
        const {onQuery} = this.props;
        onQuery && onQuery(this.state);
    }
    //新增
    handleLink = () => {
        const {onLink} = this.props;
        onLink && onLink();
    }

    // 点击导出
    handleExports = () => {
        const {onExports} = this.props;
        onExports && onExports(this.state);
    }


    render () {
        const {placeholder,addLink,onLink} = this.props;
        return (
            <div className="m-query-wrap clearfix">
                <div className="m-normal-style clearfix">
                    <MyInput type="text"
                             placeholder={placeholder}
                             className="icon"
                             style={{float:'left'}}
                             onInputChange={this.handleInputChange}/>
                    <MyButton className="m-button-primary"
                              HtmlValue="查询"
                              HtmlType="button"
                              style={{margin:'0 10px 0 10px'}}
                              onClick={this.handleQuery}/>
                              {
                                onLink?
                              <MyButton  className="m-button-primary"
                              HtmlValue="新增"
                              HtmlType="button"
                              style={{margin:'0 10px 0 10px',float:'right'}}
                              onClick={this.handleLink}/>:
                    <Link className="m-global-button m-button-primary" style={{float:'right',textAlign:'center',lineHeight:'32px'}} to={addLink?addLink:`/enterpriseadd`}>新增</Link>
                              }


                </div>

            </div>
        )
    }
}

export default QueryPanel3