import React,{ Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import { menus } from '../utils/menus';
import SiderMenu from './siderMenu';
import $ from 'jquery';
import Siderslide from './siderslide';

const {Sider} = Layout;

class SiderCustom extends Component {
    state = {
        collapsed:false,
        mode:'inline',
        openKey:'',
        selectedKey:'',
        firstHide:true,        // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
    };

    componentDidMount () {
        this.setMenuOpen(this.props); 

    }

    componentWillReceiveProps (nextProps) {
        this.onCollapse(nextProps.collapsed);
        this.setMenuOpen(nextProps)
    }

    setMenuOpen = props => {
        const {pathname} = props.location;
        this.setState({
            openKey:pathname.substr(0,pathname.lastIndexOf('/')),
            selectedKey:pathname
        });
    };
    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            firstHide:collapsed,
            mode:collapsed ? 'vertical' : 'inline',
        });
    };
    menuClick = e => {
        this.setState({
            selectedKey:e.key
        });
    };
    openMenu = v => {
        this.setState({
            openKey:v[v.length - 1],
            firstHide:false,
        })
    };


    
    render () {
        return (<div>
            <Sider
                trigger={null}
                breakpoint="lg"
                collapsed={this.props.collapsed}
                
                theme="light"
                id="sidera">
                <SiderMenu
                    menus={menus}
                    onClick={this.menuClick}
                    theme="light"
                    mode="inline"
                    selectedKeys={[this.state.selectedKey]}
                    openKeys={this.state.firstHide ? null : [this.state.openKey]}
                    onOpenChange={this.openMenu}
                />   
            </Sider>
            <Siderslide/></div>
        )
    }

       
    
   
}

export default withRouter(SiderCustom);