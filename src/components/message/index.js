// import React,{ Component } from 'react';
import Message from './components/message';

let MessageInstance = 0;
let getMessageInstance = (info,tip) => {
    MessageInstance = MessageInstance || Message.newInstance({
        info,
        tip,
    });
}

export default {
    open (info,tip,time = 2000) {
        getMessageInstance(info,tip);
        setTimeout(() => {
            this.close()
        },time);
    },
    close () {
        if(MessageInstance) {
            MessageInstance.destroy();
            MessageInstance = null;
        }
    }
};