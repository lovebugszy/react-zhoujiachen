import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

/*
* @params navList        -> array 导航数组 必传项 
* @params defaultActives -> number 默认选中项 非必传 不传为0 按数组下表来
* @params onChange       -> func 点击调转回调 必传项
* @params content        -> 任意类型 当前选中项内容 必传项
* */
class Tab extends Component {
    constructor (props) {
        super(props)
        this.state = {
            defaultActives:this.props.defaultActives
        }
    }

    static propTypes = {
        navList:PropTypes.array.isRequired,
        onChange:PropTypes.func.isRequired,
    }

    static defaultProps = {
        navList:[],
        defaultActives:0,
    }

    navChange = (i) => {
        let {onChange} = this.props
        if(i !== this.state.defaultActives) {
            this.setState({
                defaultActives:i
            })
            onChange(i)
        }
    }

    render () {
        let {navList,content} = this.props
        navList = navList.map((v,i) => {
            return <li key={i}
                       className={`${this.state.defaultActives === i ? 'm-tab-nav-active' : ''} m-tab-nav-item`}
                       onClick={() => this.navChange(i)}>
                {v}
            </li>
        });
        return (
            <div className="m-tab-wrap">
                <ul className="m-tab-nav-list">
                    {navList}
                </ul>
                <div className="m-tab-content">
                    {content}
                </div>
            </div>
        )
    }
}

export default Tab;