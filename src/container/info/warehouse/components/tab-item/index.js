import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import './style.scss';
//import MyButton from '../../../../../components/button';
import Empty from '../../../../../components/empty';
//import Modal from '../../../../../components/modal';
//import RadioList from './components/radioList';

class TabItem extends Component {

    state = {
        id:'',
        visible: false,
    }
    // 调用删除接口
    
    onDel = (id) => {
        console.log("删除",id)
        this.setState({
          visible: true,
          id:id,
        });
    }
    onEdit = (id) => {
        const {onEdit} = this.props;
        onEdit && onEdit(id);
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
        const {mestoreList} = this.props;

        const trs = mestoreList.map((v,i) => {

            return (
                <tr key={i}>
                    <td className="td" style={{width:'30px'}}>
                        <p>{i+1}</p>
                        
                    </td>
                    <td className="td">
                        <p>{v.code}</p>
                        
                    </td>
                    <td className="td">
                        <p>{v.name}</p>
                    
                    </td>
                    
                    <td className="td">
                        <p>{v.province}{v.city}{v.province}{v.county}{v.address}</p>

                    </td>
                    <td className="td">
                        <p >{v.linkman}</p>
                    </td>
                    <td className="td">
                        <p>{v.tel}</p>
                    </td>
                    <td className="td">
                        <p>是否自有仓</p>
                    </td>
                    <td className="td">
                        <p>{v.updateTime}</p>
                    </td>

                    <td className="td" style={{padding:'0 10px',textAlign:'center',color:'#3385df'}}>
                        <div>
                            <p className="edit" onClick={() => this.onEdit(v.id)}></p>
                            <p className="del" onClick={() => this.onDel(v.id)}></p>
                            
                        </div>
                    </td>
                </tr>
            )
        })
        return (
            <div className="m-table-list-wrap enterprise-list">
                <table border="1" style={{border:'none'}}>
                    <thead>
                    <tr>
                        <th></th>
                        <th>仓库编码</th>
                        <th>仓库名称</th>
                        <th>仓库地址</th>
                        <th>联系人</th>
                        <th>联系电话</th>
                        <th>是否自有仓</th>
                        <th>更新日期</th>
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
                  <p style={{textAlign:'center'}}>确定要删除该仓库吗？</p>
                </Modal>
            </div>
        )
    }
}

export default TabItem;