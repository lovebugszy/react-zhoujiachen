import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { Radio } from 'antd';
import './style.scss';
import Empty from '../../../../../../components/empty';
import MyButton from '../../../../../../components/button';
import MyModal from '../../../../../../components/modal';
import RadioAfterSaleList from '../components/radio-after-sale-list';
const RadioGroup = Radio.Group;
class TabItem extends Component {

    state = {
        visible: false,
        id:"",
        roleId:'',
        rolelist1:[],
    }
    
    // 选择取消原因回调
    handleRadio = (e) => {
        
        this.setState({
            roleId:e,
        })
        
    }
    onChangeRole = (id) => {
        
        this.setState({
          visible: true,
          id:id,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });

        const {onChangeRole} = this.props;
        onChangeRole && onChangeRole(this.state.id,this.state.roleId);

    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
    }

    render () {
        const {roleUser,rolelist1} = this.props;
        console.log("单选",rolelist1)
        console.log("用户列表",roleUser)
        const trs = roleUser.map((v,i) => {
            return (
                <tr key={i}>
                    <td className="td">
                        <p>{i+1}</p>
                        
                    </td>
                    <td className="td">
                        <p>{v.account}</p>
                        
                    </td>
                    <td className="td">
                        <p>{v.name}</p>
                    
                    </td>
                    <td className="td">
                        <p>{v.role.roleName}</p>

                    </td>
                    
                    
                    <td className="td" style={{padding:'0 30px',textAlign:'center',color:'#3385df'}}>
                        <p className="margin">
                                    <MyButton className="m-button-primary"
                                              HtmlValue="变更角色"
                                              HtmlType="button"
                                              style={{height:'28px',borderRadius:'2px'}}
                                              onClick={() => this.onChangeRole(v.id,'覆盖签收')}/>
                                </p>
                        
                        
                    </td>
                </tr>
            )
        })
        
        const Options = () => {
            return rolelist1.map((v,i) =>
                <label className="radio-line-warp" htmlFor={v.id} key={i} style={{display:'block'}}>
                    <span style={{width:'60%',display:'inline-block'}}><input type="radio" id={v.id} value={v.id} name="radio" className="input-radio" onChange={this.handleRadio} />
                
                    {v.roleName}</span>
                    <span style={{width:'40%',display:'inline-block'}}>{v.remark}</span>
                </label>
                )
              
          }
       
        
        return (
            <div className="m-table-role--wrap">
                <table border="1" style={{border:'none'}}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>账号</th>
                        <th>姓名</th>
                        <th>角色</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {trs.length > 0 ? trs : <Empty/>}
                    </tbody>
                </table>
                <div className="_m-modal-wrap">
                    <MyModal modalTitle="变更角色"
                                         style={{width:'500px',height:'80%'}}
                                         openModal={this.state.visible}
                                         buttonFlag
                                         onCancelClick={this.handleCancel}
                                         onOkClick={this.handleOk}>
                        
                            <div style={{marginTop:'20px'}}>
                                <RadioAfterSaleList list={rolelist1} onClick={this.handleRadio}/>
                            </div>
                            
                    
                    </MyModal>
                </div>

                
                
            </div>
        )
    }
}

export default TabItem;