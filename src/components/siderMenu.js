import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';


// 菜单栏icon
const Icon = (props) => {
    const src = require(`../images/${props.src}.png`);
    return <img src={src} alt={props.title} style={{marginRight:'16px',width:'16px',height:'16px'}}/>
};
const renderMenuItem = ({key,title,icon,link,...props}) =>
    <Menu.Item
        key={key || link}
        {...props}>
        <Link to={link || key}>
            {icon && <Icon src={icon} title={title}/>}
            <span className="nav-text">{title}</span>

        </Link>
    </Menu.Item>;


const renderSubMenu = ({key,title,icon,link,sub,...props}) =>
    <Menu.SubMenu
        key={key || link}
        title={<span>{icon && <Icon src={icon}/>}<span className="nav-text">{title}</span></span>}
        {...props}>
        {sub && sub.map(item => renderMenuItem(item))}
    </Menu.SubMenu>;

export default ({menus,...props}) => {

    return <div>
    <Menu {...props}>
        {menus && menus.map(item =>
            item.sub && item.sub.length ? renderSubMenu(item) : renderMenuItem(item)
        )}                
    </Menu>
    
         </div>
        }