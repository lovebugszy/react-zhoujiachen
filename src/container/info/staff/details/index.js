import React,{ Component } from 'react';
//import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './style.scss';
import Header from '../../../../components/header';
import Title from '../../../../components/title';
import { fetchPost } from "../../../../fetch/fetch";
import api from '../../../../utils/interface';

import SingleDetails from './components/single-details'
//import { fetchDynamic } from '../../../../utils/utils';
//import Modal from '../../../../components/modal';

class StaffDetail extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id:props.match.params.id,
            details:{},
            businessList:[],
        }
    }

    componentDidMount () {
        this.fetchDetails();
        this.fetchSelectList();
    }
    // 请求企业列表
    fetchSelectList = () => {
        const params = {
            "subservice":"business",
            "params":{}
        }
        fetchPost(api.entrySelectList,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                this.setState({
                    businessList:res.data,
                })
            }
        })
    }
    // 用户详情
    fetchDetails = () => {
        const params = {
            subservice:"detail",
            params:{
                id:this.state.id
            }
        }
        fetchPost(api.allUser,params).then(res => {
            const code = res.code;
            console.log("res.data",res.data)
            if(code === '1000') {
                this.setState({
                    details:res.data
                })

            }
        })
    }

    render () {
        const {details,businessList} = this.state;
        console.log("details",details)
        return (
            <div className="m-output-detail-wrap">
                <Header/>
                <div className="m-output-detail-inner">
                    <Title title="员工详情" subTitle={{assgin1:'员工管理',assgin2:'员工详情',Link:'/m/info/staff'}}/>

                    <div className="output-detail-content">
                        <SingleDetails details={details} businessList={businessList} />
                        
                        <div>
                            <div className="enterp-btn-group ">
                                <Link className="m-global-button m-button-primary" style={{height:'38px',borderRadius:'5px',fontSize:'16px'}} to={`/staffedit/${details.id}`}>编辑</Link>
                                
                                    </div>
                                

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default StaffDetail;