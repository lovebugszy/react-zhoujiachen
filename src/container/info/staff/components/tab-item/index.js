import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import './style.scss';
import Empty from '../../../../../components/empty';
//import Modal from '../../../../../components/modal';
//import RadioList from './components/radioList';

class TabItem extends Component {

    state = {
        visible: false,
        id:"",
        status:"",
    }
    onForbidden = (id,status) => {
        this.setState({
          visible: true,
          id:id,
          status:status,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });

        const {onForbidden} = this.props;
        onForbidden && onForbidden(this.state.id,this.state.status);

    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
    }
    // 重置
    onResetP = (id) => {
        const {onResetP} = this.props;
        onResetP && onResetP(id);
    }
    // 禁用启用
    // onForbidden = (id,status) => {
    //     const {onForbidden} = this.props;
    //     onForbidden && onForbidden(id,status);
    // }
    

    render () {
        const {staffList} = this.props;
        const trs = staffList.map((v,i) => {
            switch (v.status) {
                case 0:
                    v.status = '禁用';
                    break;
                case 1:
                    v.status = '启用';
                    break;
                    default:
            }
            return (
                <tr key={i} className={v.status === '禁用'?'forbid':''}>
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
                        <p>{v.mobile}</p>

                    </td>
                    <td className="td">
                        <p>{v.position}</p>
                        
                    </td>
                    <td className="td">
                        <p >{v.status}</p>
                    </td>
                    <td className="td">
                        <p>{v.remark}</p>
                    </td>
                    <td className="td">
                        <p>{v.opDate}</p>
                    </td>
                    
                    <td className="td" style={{padding:'0 30px',textAlign:'center',color:'#3385df'}}>
                        <div>
                            <p className="edit"><Link to={`/staffedit/${v.id}`}/></p>
                            <p className="reset" onClick={() => this.onResetP(v.id)}></p>
                            <p className="forbidden" onClick={() => this.onForbidden(v.id,v.status)}/>
                        </div>
                    </td>
                </tr>
            )
        })
        return (
            <div className="m-table-list-wrap">
                <table border="1" style={{border:'none'}}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>账号</th>
                        <th>姓名</th>
                        <th>联系方式</th>
                        <th>职位</th>
                        <th>状态</th>
                        <th>备注</th>
                        <th>更新时间</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {trs.length > 0 ? trs : <Empty/>}
                    </tbody>
                </table>
                <Modal className="w300"
                  title="提示"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <p style={{textAlign:'center'}}>确定要{this.state.status === '禁用'?'启用':'禁用'}吗？</p>
                </Modal>
                
            </div>
        )
    }
}

export default TabItem;