import React,{ Component } from 'react';
import './style.scss';

class SingleDetails extends Component {
    render () {
        const {details} = this.props;
        //营业执照
        const Photo= (photo) => {
            let photo1="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1531107502&di=c952383c98e230e088dbafeadc2335a2&src=http://pic2.ooopic.com/10/22/23/71b1OOOPICda.jpg,https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531117987123&di=ec5cbf1b2ce9ef16c6157a4248098a38&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F28%2F67%2F25e58PICCfG_1024.gif,https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531117987122&di=7e5b5d850e2f029874af86e5eb64770d&imgtype=0&src=http%3A%2F%2Fpic15.nipic.com%2F20110809%2F2012891_160222469196_2.jpg";
            return (
                photo1 && photo1.length>0?
                        <div className="license-box">
                            {photo1.split(",").map((v,i) => {
                                return <a href="javascript:void(0);" className="img-list" title="营业执照" key={i}><img src={v} alt="" /></a>                                     
                            })}
                        </div>
                        
                        :'暂无'
                )
        }
        return (
            <div className="enterprise-list-info">
                <ul className="list-ul">
                    <li>
                        <div>
                            <span>企业编码：</span>
                            <span>{details.code}</span>
                        </div>

                    </li>
                    <li>

                        <div>
                            <span>企业名称：</span>
                            <span>{details.name}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>营业执照：</span>
                            <span>{details.license}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>法定代表人：</span>
                            <span>{details.legal}</span>
                        </div>
                    </li>
                    <li style={{width:'66%'}}>
                        <div>
                            <span>注册地址：</span>
                            <span>{details.province}{details.city}{details.county}{details.address}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>联系人：</span>
                            <span>{details.linkman}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>联系电话：</span>
                            <span>{details.tel}</span>
                        </div>
                    </li>
                    <li style={{width:'100%'}}>
                        <div>
                            <span>营业执照：</span>
                            <Photo img={details.photo} />
                        </div>

                    </li>
                </ul>

            </div>
        )
    }
}

export default SingleDetails;