import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// 对国际化组件转化语言
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn'; 

import Page from './pages';
import './style/public.scss';
import './style/normalize.css';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers/index'

let store = createStore(reducer);

store.subscribe(() => {
    console.log(store)
});
// 获取默认值
// console.log(store.getState());
// store.dispatch({
//     type:'ADD_TODO',
//     text:'Use Redux'
// });
// // 触发actions后
// console.log(store.getState());
ReactDOM.render(
    <Provider store={store}>
        <LocaleProvider locale={zh_CN}>
            <Page/>
        </LocaleProvider>
    </Provider>,document.getElementById('root'));

registerServiceWorker();