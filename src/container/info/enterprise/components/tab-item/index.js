import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
//import MyButton from '../../../../../components/button';
import Empty from '../../../../../components/empty';
//import Modal from '../../../../../components/modal';
//import RadioList from './components/radioList';

class TabItem extends Component {

    state = {
        id:'',
        code:'',
    }
    // 调用删除接口
    onDel = (id) => {
        const {onDel} = this.props;
        onDel && onDel(id);
    }
    // 重置密码
    
    onResetP = (id,code) => {
        const {onResetP} = this.props;
        onResetP && onResetP(id,code);
    }

    render () {
        const {enterpriseList} = this.props;

        const trs = enterpriseList.map((v,i) => {

            return (
                <tr key={i}>
                    <td className="td">
                        <p>{v.code}</p>
                        
                    </td>
                    <td className="td">
                        <p>{v.name}</p>
                    
                    </td>
                    <td className="td">
                        <p>{v.legal}</p>
                        
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
                        <p>{v.license}</p>
                    </td>
                    <td className="td">
                        <p>{v.opDate}</p>
                    </td>
                    <td className="td">
                        <p><Link to={`/enterprisedetail/${v.id}`}>详情查看</Link></p>
                    </td>
                    
                    <td className="td" style={{padding:'0 10px',textAlign:'center',color:'#3385df'}}>
                        <div>
                            <p className="edit"><Link to={`/enterpriseedit/${v.id}`}/></p>
                            <p className="reset" onClick={() => this.onResetP(v.id,v.code)}></p>
                            
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

                        <th>企业编码</th>
                        <th>企业名称</th>
                        <th>法定代表人</th>
                        <th>地址</th>
                        <th>联系人</th>
                        <th>联系电话</th>
                        <th>营业执照</th>
                        <th>更新日期</th>
                        <th>详情</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {trs.length > 0 ? trs : <Empty/>}
                    </tbody>
                </table>
                
            </div>
        )
    }
}

export default TabItem;