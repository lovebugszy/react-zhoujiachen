import React,{ Component } from 'react';
import './style.scss';
import { Input } from 'antd';
import MyButton from '../../../../../../components/button';

class SingleEdit extends Component {
    constructor (props) {
        super(props)
        this.state = {
            code:'',
            name:'',
            license:'',
            legal:'',
            address:'',
            province:'',
            city:'',
            county:'',
            linkman:'',
            tel:'',
            photo:'',
        }
        console.log(props.code)
    }

    componentDidMount () {
        
    }

    handleCodeChange = (e) =>{
        this.setState({
            code:e.target.value
        })
    }
    render () {
        const {details} = this.props;
        
        return (
            
            
        )
    }
}

export default SingleEdit;