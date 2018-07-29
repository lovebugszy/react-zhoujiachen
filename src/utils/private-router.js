import React from 'react';
import { Route,withRouter } from 'react-router-dom';

/* 需要登录授权的route组件*/
class PrivateRoute extends React.Component {
    componentWillMount () {
        let isAuthenticated = sessionStorage.getItem("m-access-token");
        this.setState({isAuthenticated:isAuthenticated})
        if(!isAuthenticated) {
            const {history} = this.props;
            history.replace("/login");
        }
    }

    render () {
        let {component:Component,path = "/",exact = false,strict = false} = this.props;
        return this.state.isAuthenticated ? (
            <Route path={path} exact={exact} strict={strict} render={(props) => ( <Component {...props} /> )}/>
        ) : ('');
    }
}

export default withRouter(PrivateRoute)