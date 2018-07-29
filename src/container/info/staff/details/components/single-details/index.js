import React,{ Component } from 'react';
import './style.scss';

class SingleDetails extends Component {
    render () {
        const {details,businessList} = this.props;
        const powerList=details.businessId;
        const newPowerArr=[];
        if(powerList && businessList){
            for(let v of powerList){
                for(let m of businessList){
                    if(v === m.id){
                        newPowerArr.push(m.name)
                    }
                }
            }
        }

        //营业执照
        const Lis = () => {
            return newPowerArr && newPowerArr.map((element,i) =>

            <li key={i}>
                <div>
                    <span>{element}</span>
                </div>
            </li>);

          };
        return (
            <div className="m-staff-detail-wrap">
                <div className="staff-detail-content">
                    <div className="detail-staff-info">

                        <div className="staff-info-content">
                            <div className="staff-con-info">
                                <div className="bor-r pr100" style={{height:'100%'}}>
                                    <p className="user-title">用户信息</p>
                                    <ul className="list-ul">
                                        <li>
                                            <div>
                                                <span className="label">账号：</span>
                                                <span>{details.account}</span>
                                            </div>

                                        </li>
                                        <li>

                                            <div>
                                                <span className="label">姓名：</span>
                                                <span>{details.name}</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <span className="label">联系方式：</span>
                                                <span>{details.mobile}</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <span className="label">角色：</span>
                                                <span>{details.role?details.role.roleName : ''}</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <span className="label">备注：</span>
                                                <span>{details.remark}</span>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            <div className="staff-con-info">
                                <div className="pl100" style={{height:'100%'}}>
                                    <p className="cus-title">用户信息</p>
                                    <ul className="list-ul">
                                       {Lis()}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default SingleDetails;