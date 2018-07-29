import React,{ Component } from 'react';
import './style.scss';
import MyInput from '../../../../../components/input';
//import Select from '../../../../../components/select';
import { Select } from 'antd';

const Option = Select.Option;

class SignContentAllReject extends Component {
    state = {
        signRemark:'',
        dealWay:'',
        reason:'',     // 拒收原因
    };

    // 签收说明
    handleTextChange = (v) => {
        console.log(this.state)
        this.setState({signRemark:v},() => {
            const {onChange} = this.props;
            onChange && onChange(this.state);
        })
    }

    render () {
        const {onChange} = this.props;
        const opts = refuseArr.map((v,i) => {
            return <Option key={i} value={v.id}>{v.name}</Option>
        })
        const opts1 = methodArr.map((v,i) => {
            return <Option key={i} value={v.id}>{v.name}</Option>
        })
        return (
            <div className="sign-content-abnormal-wrap">
                <div className="sign-content-abnormal-inner">
                    <div className="input-wrap clearfix">
                        <span>拒收原因：</span>
                        <Select defaultValue={this.state.reason} placeholder="请选择拒收原因" style={{width:'500px',height:'34px',float:'left'}} 
                        onChange={(v) => {
                                    this.setState({
                                        reason:v
                                    },() => {
                                        onChange && onChange(this.state)
                                    })
                                }}>
                          {opts}
                        </Select>

                    </div>
                    <div className="input-wrap clearfix">
                        <span>处理方式：</span>
                        
                        <Select defaultValue={this.state.reason} placeholder="请选择处理方式" style={{width:'500px',height:'34px',float:'left'}} 
                        onChange={(v) => {
                                    this.setState({
                                        dealWay:v
                                    },() => {
                                        onChange && onChange(this.state)
                                    })
                                }}>
                          {opts1}
                        </Select>

                    </div>
                    <div className="input-wrap clearfix">
                        <span>签收说明：</span>
                        <MyInput type="textarea"
                                 placeholder="您最多可输入200字"
                                 style={{width:'calc(100% - 80px)',float:'left'}}
                                 onInputChange={(v) => {
                                     this.setState({
                                         signRemark:v
                                     },() => {
                                         onChange && onChange(this.state)
                                     })
                                 }}/>
                    </div>
                </div>
            </div>
        )
    }
}

const refuseArr = [
    {name:'部分出库情况处理',id:'部分出库情况处理'},
    {name:'客户取消订单',id:'客户取消订单'},
    {name:'其他',id:'其他'},
]

const methodArr = [
    {name:'按仓配计出库费，记退货入库费',id:'按仓配计出库费，记退货入库费'},
    {name:'按仓配计出库费，不记退货入库费',id:'按仓配计出库费，不记退货入库费'},
    {name:'按自提计出库费，不记退货入库费',id:'按自提计出库费，不记退货入库费'},
    {name:'按自提计出库费，记退货入库费',id:'按自提计出库费，记退货入库费'},
    {name:'不计出库和退货入库费用',id:'不计出库和退货入库费用'},
]
export default SignContentAllReject