import React,{ Component } from 'react';
import './style.scss';
import pic404 from '../../images/pic_404.png';

class NotFound extends Component {
    render () {
        return (
            <div className="m-404-wrap">
                <div className="m-404-inner">
                    <img src={pic404} alt="404咯，去别处看看吧"/>
                    <p>Sorry，未找到该页面~</p>
                    <div className="line"/>
                    <ul>
                        <li>可能原因：网络信号弱</li>
                        <li>找不到请求页面</li>
                        <li>输入的网址不对</li>
                    </ul>
                    <div className="button-wrap clearfix">
                        <div className="reload" onClick={() => {
                            window.history.go(0)
                        }}>刷新
                        </div>
                        <div className="back" onClick={() => {
                            window.history.go(-1)
                        }}>返回上一级
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotFound