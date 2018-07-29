import { User } from '../utils/utils';
import Message from "../components/message";

const baseApi = 'http://47.96.31.179:9999/manage2.0';
// const baseApi = 'http://192.168.1.54:2001'
// post 请求
export const fetchPost = (url,data = {},contentType = 'application/json;charset=UTF-8') => {
    if(data.user) {
        data.user = Object.assign(User(),data.user)
    } else {
        data.user = User();
    }
    return new Promise((resolve,reject) => {
        const options = {
            method:'post',
            mode:'cors',
            headers:{
                'Content-Type':contentType
            },
            body:JSON.stringify(data)
        };
        fetch(`${baseApi}${url}`,options).then(res => {
            res.json().then(res => {
                if(res.code === '1000') {
                    // Message.open('success',res.message,100000);
                } else {
                    Message.open('error',res.message,2000);
                }
                // 后期全局错误信息在这里处理
                resolve(res)
            })
        }).catch(err => {
            reject(err)
        })
    })
}
// get 请求
export const fetchGet = (url,data = {}) => {
    let kv = '';
    for(let key in data) {
        if(data.hasOwnProperty(key)) {
            kv += `${key}=${data[key]}&`
        }
    }
    kv = kv.substring(0,kv.length - 1);
    return new Promise((resolve,reject) => {
        const options = {
            method:'get',
            mode:'cors',
            headers:{
                'Content-Type':'application/json;charset=UTF-8'
            }
        };
        const urls = Object.keys(data).length > 0 ? `${baseApi}${url}?${kv}` : `${baseApi}${url}`
        fetch(urls,options).then(res => {
            res.json().then(res => resolve(res))
        }).catch(err => {
            reject(err)
        })
    })
}