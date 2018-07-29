import React,{ Component } from 'react';
import { withRouter } from "react-router-dom";
import './style.scss';
import Title from '../../components/title';
import QueryPanel2 from '../../components/query-panel2';
import api from '../../utils/interface'
//import LargeQueryContent from './components/large-query-content';
import TabItem from './components/tab-item';
import { fetchPost } from "../../fetch/fetch";
import { Pagination } from 'antd';
import Message from "../../components/message";

class StoreInfoList extends Component {
    constructor () {
        super();
        this.state = {
            content:0,
            selectList:[],          // 选择企业列表
            count:0,                // 总条数
            businessId:'',          // 企业id
            search:'',              // 请输入单号/来源单号/供应商名称
            pageindex:1,            // 当前页
            pageSize:10,             // 当前条数
            sOrderList:[],         // 数据列表
            newOrderList:[],        //检索后的列表
            lastList:[],            //分页后的数据
        }
    }

    componentDidMount () {
        this.fetchSelectList();
        this.fetchData();
    }
    //条件检索
    searchKey = (list) => {
        let newArr=[];
        for(let v of list){
            if(v.customName.indexOf(this.state.search) >= 0 || v.barcode.indexOf(this.state.search) >= 0 || v.customCode.indexOf(this.state.search) >= 0){
                newArr.push(v);
            }
        }
        
       this.setState({
            newOrderList:newArr,
            count:newArr.length,
       })
       this.pageList()
    }
    //分页后的数据
    pageList = () => {
        let arrStart = 0,arrEnd;
        if (this.state.pageindex > 1) {
            arrStart = Number(this.state.pageSize) * (Number(this.state.pageindex) - 1);
            arrEnd = Number(arrStart) + Number(this.state.pageSize);
            if (arrEnd > this.state.newOrderList.length)
                arrEnd = this.state.newOrderList.length;
        } else {
            arrStart = 0;
            arrEnd = this.state.pageSize;
        }
        this.setState({
            lastList:this.state.newOrderList.slice(arrStart, arrEnd),
        })
        
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
                    selectList:res.data
                })
            }
        })
    }

    // 请求数据列表
    fetchData = () => {
        const params = {
            
                //"search":this.state.search,
                "storeCode":"JX",
                "page":this.state.pageindex,
                "size":this.state.pageSize,
                "businessId":this.state.businessId
            
        }

        fetchPost(api.Storedetail,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                this.setState({
                    sOrderList:res.data,
                    count:res.data.length
                })
                this.searchKey(this.state.sOrderList);
            }
        })
    };

    // 导出请求
    exports = () => {
        const params = {
            "type":"dcInOrder",
            "serviceName":"instorage",
            "param":{
                "subservice":"queryorder",
                "params":{
                    "search":this.state.search,
                    "servType":this.state.servType,
                    "storename":this.state.storename,
                    "startcreatetime":this.state.startcreatetime,
                    "endcreatetime":this.state.endcreatetime,
                    "orderStatus":this.state.orderStatus,
                    "businessId":this.state.businessId
                }
            }
        }
        fetchPost(api.exports,params).then(res => {
            const code = res.code;
            if(code === "1000") {
                this.setState({
                    sOrderList:res.data.inOrderList,
                    count:res.data.count
                })
            }
        })
    }

    // 点击查询
    handleQuery = (v) => {
        this.setState({
            search:v.oddNumber,   // 请输入单号/来源单号/供应商名称
            //startcreatetime:v.date[0],
            //endcreatetime:v.date[1],
            businessId:v.enterprise.id,
        },() => {
            this.fetchData();
        })
    }

    // 点击导出
    handleExports = (v) => {
        this.setState({
            search:v.oddNumber,              // 请输入单号/来源单号/供应商名称
            startcreatetime:v.date[0],     // 开始日期
            endcreatetime:v.date[1],       // 结束日期
            businessId:v.enterprise
        },() => {
            this.exports()
        })
    }

    render () {
        //const navList = ['全部','待审核','退货中','已完成','已取消'];
        return (
            <div className="m-entry-wrap">
                <Title title="库存信息"/>
                <QueryPanel2 onQuery={this.handleQuery} 
                            onExports={this.handleExports}
                            
                            selectList={this.state.selectList} 
                            placeholder="请输入自编码/商品识别码/商品条码"
                            />
                <div className="m-entry-list-wrap">
                    <TabItem sOrderList={this.state.lastList}
                            />
                        
                    <div className="page-wrap clearfix">
                        <Pagination showSizeChanger
                                    onShowSizeChange={(current,pageSize) => {
                                        this.setState({pageSize:pageSize},() => {
                                            this.pageList()
                                        })
                                    }}
                                    onChange={(v) => {
                                        this.setState({pageindex:v},() => {
                                            this.pageList()
                                        })
                                    }}
                                    defaultCurrent={1}
                                    total={this.state.count}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(StoreInfoList)