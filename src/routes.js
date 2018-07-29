import React from 'react';
import { Route,Switch,Redirect } from 'react-router-dom';
import PrivateRoute from './utils/private-router';
import EntryList from './container/business/entryList';
import Output from './container/business/output';
import SignIn from './container/business/output/sign-in';
import Receipt from './container/business/output/receipt';
import InventInfo from './container/inventoryManagement/inventInfo';
import Rejecting from './container/business/rejecting';
import CollectList from './container/business/collectList';
import CollectDetails from './container/business/collectList/details';

import Enterprise from './container/info/enterprise';
import Warehouse from './container/info/warehouse';
import WarehouseEdit from './container/info/warehouse/edit';
import Staff from './container/info/staff';
import Role from './container/info/role';
import reportEntryList from './container/detailed/entry';
import reportOutList from './container/detailed/output';
import reportJectList from './container/detailed/rejecting';
import reportSellList from './container/detailed/returnGoods';
import reportOtherList from './container/detailed/otherList';
import reportDangerList from './container/detailed/dangerList';
import reportStoreList from './container/detailed/waredetail';

import afterSaleList from './container/business/returnGoods';
import sellOtherList from './container/business/otherList';
import DangerList from './container/business/dangerList';
import BuyList from './container/business/purchaseList';
import SellAdd from './container/business/returnGoods/sellAdd';
import Print from './container/business/returnGoods/print';

import inorderList from './container/statistics/entry';
import outorderList from './container/statistics/output';
import sellReportList from './container/statistics/returnGoods';
import otherReportList from './container/statistics/otherList';
import dangerReportList from './container/statistics/dangerList';

import StoryList from './container/report/storyList';
import DeliveryList from './container/report/deliveryList';


import NotFound from './container/404';
// demo路由 事后删除
import Steps1 from './container/demo/steps'
import Steps2 from './container/demo/steps-vertical'
import Uploads from './container/demo/upload'
import ModalDemo from './container/demo/modal-demo'
import Inputs from './container/demo/input'

const Routes = () => {
    return (
        <div>
            <Switch>
                {/*<Route path="/m/business/entry" component={EntryList}/>*/}
                <PrivateRoute exact path="/m/business/entry" component={EntryList}/>
                <PrivateRoute exact path="/m/business/output" component={Output}/>
                <PrivateRoute exact path="/m/business/output/signin/:id" component={SignIn}/>
                <PrivateRoute exact path="/m/business/output/receipt/:id" component={Receipt}/>
                <PrivateRoute exact path="/m/business/output/receiptedit/:reid" component={Receipt}/>
                <Route path="/m/inventoryManagement/inventInfo" component={InventInfo}/>
                <PrivateRoute exact path="/m/business/rejecting" component={Rejecting}/>
                <PrivateRoute exact path="/m/business/collectList" component={CollectList}/>
                <PrivateRoute exact path="/m/business/collectList/details/:id" component={CollectDetails}/>
                <PrivateRoute exact path="/m/info/enterprise" component={Enterprise}/>
                <PrivateRoute exact path="/m/info/warehouse" component={Warehouse}/>
                <PrivateRoute exact path="/m/info/warehouse/edit/:id" component={WarehouseEdit}/>
                <PrivateRoute exact path="/m/info/warehouse/add" component={WarehouseEdit}/>
                
                <PrivateRoute exact path="/m/info/staff" component={Staff}/>
                <PrivateRoute exact path="/m/info/role" component={Role}/>

                <PrivateRoute exact path="/m/business/returnGoods" component={afterSaleList}/>
                <PrivateRoute exact path="/m/business/returnGoods/sellAdd/:id" component={SellAdd}/>
                <PrivateRoute exact path="/m/business/returnGoods/print/:id" component={Print}/>
                <PrivateRoute exact path="/m/business/otherList" component={sellOtherList}/>
                <PrivateRoute exact path="/m/business/dangerList" component={DangerList}/>
                <PrivateRoute exact path="/m/business/purchaseList" component={BuyList}/>

                <PrivateRoute exact path="/m/report/storyList" component={StoryList}/>
                <PrivateRoute exact path="/m/report/deliveryList" component={DeliveryList}/>

                <PrivateRoute exact path="/m/detailed/entry" component={reportEntryList}/>
                <PrivateRoute exact path="/m/detailed/output" component={reportOutList}/>
                <PrivateRoute exact path="/m/detailed/rejecting" component={reportJectList}/>
                <PrivateRoute exact path="/m/detailed/returnGoods" component={reportSellList}/>
                <PrivateRoute exact path="/m/detailed/otherList" component={reportOtherList}/>
                <PrivateRoute exact path="/m/detailed/dangerList" component={reportDangerList}/>
                <PrivateRoute exact path="/m/detailed/waredetail" component={reportStoreList}/>

                <PrivateRoute exact path="/m/statistics/entry" component={inorderList}/>
                <PrivateRoute exact path="/m/statistics/output" component={outorderList}/>
                <PrivateRoute exact path="/m/statistics/returnGoods" component={sellReportList}/>
                <PrivateRoute exact path="/m/statistics/otherList" component={otherReportList}/>
                <PrivateRoute exact path="/m/statistics/dangerList" component={dangerReportList}/>


                {/*以下为demo路由*/}
                <Route path="/m/demo/step1" component={Steps1}/>
                <Route path="/m/demo/step2" component={Steps2}/>
                <Route path="/m/demo/upload" component={Uploads}/>
                <Route path="/m/demo/modal" component={ModalDemo}/>
                <Route path="/m/demo/input" component={Inputs}/>
                <Route path="/404" component={NotFound}/>
                <Redirect from='*' to='/404'/>
            </Switch>
        </div>
    )
};
export default Routes