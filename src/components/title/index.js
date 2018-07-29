import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

//页面Title组件
class Title extends Component {
    render () {
        const {title,subTitle} = this.props;
        if(subTitle) {
            return (
                <div className="subTitle-double">
                    <p>{title}</p>
                    <p>
                        <Link to={subTitle.Link}>{subTitle.assgin1}</Link> /
                        {subTitle.assgin2}
                    </p>
                </div>
            )
        } else {
            return (
                <div className="subTitle">
                    <p>{title}</p>
                </div>
            )
        }
    }

}

export default Title