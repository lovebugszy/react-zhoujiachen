import { fetchPost } from "../fetch/fetch";
import api from './interface';
// 获取用户信息 
export const User = () => {
    let data = JSON.parse(decodeURI(sessionStorage.getItem('m-access-token')));
    if(data) {
        let type = data.type;
        let userid = data.id;
        let useraccount = data.account;
        let username = data.name;
        let user = {type,userid,useraccount,username};
        return user;
    }
}

// 动态接口封装
export const fetchDynamic = (orderCode,orderType,code) => {
    const params = {
        orderCode:orderCode,
        orderType:orderType,
        user:{
            code:code,
        }
    }
    return new Promise((resolve,reject) => {
        fetchPost(api.dynamic,params).then(res => {
            const code = res.code;
            if(code === '1000') {
                resolve(res);
            }
        })
    })
}