import React,{ Component } from 'react';
import { withRouter } from 'react-router';
import './style.scss';
import logo from '../../images/icon_logo.png';
import userIcon from '../../images/icon_user.png';
import Modal from '../../components/modal';

class Header extends Component {

    constructor (props) {
        super(props)
        this.state = {
            openModal:false,
            userInfo:{}
        }
    }

    componentDidMount () {
        const userInfo = JSON.parse(decodeURI(sessionStorage.getItem('m-access-token')));
        console.log(userInfo)
        this.setState({
            userInfo:userInfo
        })
    }

    handleLogout = () => {
        this.setState({
            openModal:true
        })
    }

    handleOk = () => {
        sessionStorage.clear();
        this.props.history.push("/login");
    }

    render () {
        return (
            <header className="header-wrap">
                <div className="header-inner">
                    <div className="logo">
                        <img src={logo} alt=""/>
                    </div>
                    <div className="admin-fr fr">
                        <img src={userIcon} alt="" className="username"/>
                        <i className="user-name">您好，{this.state.userInfo.account}</i>
                        <div className="logout" onClick={this.handleLogout}/>
                    </div>
                    <div>
                        <Modal buttonFlag 
                               openModal={this.state.openModal}
                               style={{width:'380px',height:'220px'}}
                               content={<p style={{textAlign:'center'}}>确定要退出？</p>}
                               onOkClick={this.handleOk}/>
                    </div>
                </div>
            </header>
        )
    }
}

export default withRouter(Header)