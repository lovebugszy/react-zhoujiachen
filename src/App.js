import React,{ Component } from 'react';
import Header from './components/header';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom'
import Routes from './routes';
import SiderCustom from './components/siderCustom'

const {Content} = Layout;

class App extends Component {
    render () {
        return (
            <div className="App" style={{minHeight:'100vh'}}>
                <Layout>
                    <Header/>
                    <Content style={{height:'calc(100vh - 60px)'}}>
                        <Layout style={{background:'#fff',height:'100%'}}>
                            <SiderCustom/>
                            <Content style={{background:'#f5f6fa',padding:"0 30px 30px 30px",minWidth:'1300px'}}>
                                {Routes()}
                            </Content>
                        </Layout>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default withRouter(App);
