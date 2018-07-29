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
    onDel = (id,status) => {
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

        const {onDel} = this.props;
        onDel && onDel(this.state.id);

    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
    }

    render () {
        const {roleList} = this.props;
        const trs = roleList.map((v,i) => {
            return (
                <tr key={i}>
                    <td className="td">
                        <p>{i+1}</p>
                        
                    </td>
                    <td className="td">
                        <p>{v.roleName}</p>
                        
                    </td>
                    <td className="td">
                        <p>{v.remark}</p>
                    
                    </td>
                    <td className="td">
                        <p>{v.updateDate}</p>

                    </td>
                    <td className="td">
                        <p>{v.updateBy}</p>
                        
                    </td>
                    
                    <td className="td">
                        <p><Link to={`/roledetail/${v.id}`}>查看</Link></p>
                    </td>
                    <td className="td" style={{padding:'0 30px',textAlign:'center',color:'#3385df'}}>
                        {v.type !== 9 ?
                            <div>
                                <p className="edit"><Link to={`/roleedit/${v.id}`}/></p>
                                <p className="forbidden" onClick={() => this.onDel(v.id)}/>
                            </div>:''
                        }
                        
                    </td>
                </tr>
            )
        })
        return (
            <div className="m-table-role--wrap">
                <table border="1" style={{border:'none'}}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>角色名称</th>
                        <th>备注</th>
                        <th>更新日期</th>
                        <th>更新人员</th>
                        <th>角色用户</th>
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
                  <p style={{textAlign:'center'}}>确定要删除该角色吗？</p>
                </Modal>
                
            </div>
        )
    }
}

export default TabItem;