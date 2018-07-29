import React from 'react';
import { BrowserRouter as Router,Route,Switch,Redirect } from 'react-router-dom';
import App from './App';
import PrivateRoute from './utils/private-router';
import Login from './container/login/login';
import NotFound from './container/404';
import EntryDetail from './container/business/entryList/details';
import OutputDetail from './container/business/output/details';
import RejectDetail from './container/business/rejecting/details';
import RejectEdit from './container/business/rejecting/edit';
import SellAdd from './container/business/returnGoods/sellAdd';
import Print from './container/business/returnGoods/print';
import CollectDetail from './container/business/collectList/details';
import EnterpriseDetail from './container/info/enterprise/details';
import EnterpriseEdit from './container/info/enterprise/edit';
 import DangerEdit from './container/business/dangerList/edit';
import StaffEdit from './container/info/staff/edit';
import RoleEdit from './container/info/role/edit';
import RoleDetail from './container/info/role/details';

import afterSaleDetail from './container/business/returnGoods/details';
import sellDetail from './container/business/otherList/details';
import dangerDetail from './container/business/dangerList/details';
import buyDetail from './container/business/purchaseList/details';

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/m/business/entry" push/>}/>
            <Route path="/m" component={App}/>
            <Route path="/login" component={Login}/>
            <Route path="/404" component={NotFound}/>
            <PrivateRoute path="/entrydetail/:id" exact component={EntryDetail}/>
            <PrivateRoute path="/outputdetail/:id" exact component={OutputDetail}/>
            <PrivateRoute path="/rejectdetail/:id" exact component={RejectDetail}/>
            <PrivateRoute path="/rejectdetailout/:outid" exact component={RejectDetail}/>
            <PrivateRoute path="/rejectedit/:id" exact component={RejectEdit}/>
            <PrivateRoute path="/enterprisedetail/:id" exact component={EnterpriseDetail}/>
            <PrivateRoute path="/enterpriseedit/:id" exact component={EnterpriseEdit}/>
            <PrivateRoute path="/enterpriseadd" exact component={EnterpriseEdit}/>
            <PrivateRoute path="/staffedit/:id" exact component={StaffEdit}/>
            <PrivateRoute path="/staffadd" exact component={StaffEdit}/>
            
            <PrivateRoute path="/roleedit/:id" exact component={RoleEdit}/>
            <PrivateRoute path="/roleadd" exact component={RoleEdit}/>
            <PrivateRoute path="/roledetail/:id" exact component={RoleDetail}/>

            <PrivateRoute path="/sellAdd/:id" exact component={SellAdd}/>
            <PrivateRoute path="/print/:id" exact component={Print}/>
            <PrivateRoute path="/selldetail/:id" exact component={afterSaleDetail}/>
            <PrivateRoute path="/sellotherdetail/:id" exact component={sellDetail}/>
            <PrivateRoute path="/dangerdetail/:id" exact component={dangerDetail}/>
            <PrivateRoute path="/dangeraddit/:id" exact component={DangerEdit}/>
            <PrivateRoute path="/dangeradd" exact component={DangerEdit}/>
            <PrivateRoute path="/buydetail/:id" exact component={buyDetail}/>
            <Redirect from='*' to='/404'/>
        </Switch>
    </Router>
)