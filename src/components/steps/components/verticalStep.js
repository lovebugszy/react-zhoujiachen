import React,{ Component } from 'react';
import './ver-step.scss';

/*
* time,         时间 数组 [0] ->年月日 [1] -> 时分秒
* operationTitle,        当前title
* remark,       备注
* operationContent,      内容描述
* photoList,    图片列表 
* operator     操作人 
* 
* 全部必传
* */
class Step extends Component {
    constructor (props) {
        super(props)
        this.state = {
            imgSrc:'',
        }
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            imgSrc:nextProps.openImgFlag
        })
    }

    openImg = (v) => {
        this.setState({
            imgSrc:v
        })
    }

    closeImg = () => {
        this.setState({
            imgSrc:''
        })
    }

    render () {
        const {time,operationTitle,remark,operationContent,photoList,operator,statusType,active,outStatus} = this.props
        const photoListItem = photoList && photoList.map((v,i) => {
            return <li key={i}><img src={v} alt="v" onClick={() => this.openImg(v)}/></li>
        })
        const remarks = remark ? <p className="m-step-desc"><i>备注：</i>{remark}</p> : '';
        return (
            <div className={`m-step-item-ver`}>
                <div className="m-step-time-wrap fl">
                    <p className="time1">{time[0]}</p>
                    <p className="time2">{time[1]}</p>
                </div>
                <div className="line-status">
                    <span className={`status fl status-type${statusType} ${active} out-status${outStatus}`}/>
                    <div className="content fl">
                        <p className="m-step-title">{operationTitle}</p>
                        {remarks}
                        <div className="m-step-content">
                            {operationContent}
                        </div>
                        <ul className="m-photo-list">
                            {photoListItem}
                        </ul>
                    </div>
                    <div className="operation fl">
                        <span>操作人 :</span>
                        <span> {operator}</span>
                    </div>
                    <div style={{clear:'both'}}/>
                </div>
                <div className={`m-open-img-wrap ${this.state.imgSrc ? 'block' : ''}`}>
                    <span onClick={this.closeImg}/>
                    <img src={this.state.imgSrc} className="openImg block" alt=""/>
                </div>
            </div>
        )
    }
}

export default Step;