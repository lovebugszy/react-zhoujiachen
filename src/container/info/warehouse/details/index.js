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


class EnterpriseDetail extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id:props.match.params.id,
            details:{},
            //code:'',
            //businessId:'',
            openModal:false,
        }
    }

    componentDidMount () {
        this.fetchDetails()
    }
    
    //编辑跳转
    // contextTypes: {
    //     router: React.PropTypes.object
    // }
    // 订单详情
    fetchDetails = () => {
        const params = {
            subservice:"businessInfo",
            params:{
                id:this.state.id
            }
        }
        fetchPost(api.Enterprise,params).then(res => {
            const code = res.code;
            console.log(res.data)
            if(code === '1000') {
                this.setState({
                    //code:res.data.businessCode,
                    //businessId:res.data.businessId,
                    details:res.data,
                })
            }
        })
    }

    render () {
        const {details} = this.state;
        console.log(details)
        return (
            <div className="m-output-detail-wrap">
                <Header/>
                <div className="m-output-detail-inner">
                    <Title title="企业详情" subTitle={{assgin1:'企业管理',assgin2:'企业详情',Link:'/m/info/enterprise'}}/>

                    <div className="output-detail-content">
                        <SingleDetails details={details} />
                        
                        <div>
                            <div className="enterp-btn-group ">
                                <Link className="m-global-button m-button-primary" style={{height:'38px',borderRadius:'5px',fontSize:'16px'}} to={`/enterpriseedit/${details.id}`}>编辑</Link>
                                
                                    </div>
                                

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default EnterpriseDetail;