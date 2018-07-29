import React from 'react';
import $ from 'jquery';
import btn_hide_normal from '../images/btn_hide_normal.png';
import btn_hide_hover from '../images/btn_hide_hover.png';
import btn_show_normal from '../images/btn_show_normal.png';
import btn_show_hover from '../images/btn_show_hover.png';
const slide1 = () =>{
    var isHide = true;
    
        if(isHide){
            $('.ant-layout-sider.ant-layout-sider-light').css({display:'none'});
            $('#button-close').hide();
            $('#button-open').show();
        }else{
            $('.ant-layout-sider-light').animate({right:'-=180px'});
        }
        isHide = !isHide;   
};
const slide2 = () =>{
    var isHiden = true;
    
        if(isHiden){
            $('.ant-layout-sider.ant-layout-sider-light').css({display:'block'});
            $('#button-open').hide();
            $('#button-close').show();
        }else{
            $('.ant-layout-sider-light').animate({right:'-=180px'});
        }
        isHiden = !isHiden;   
};
class Siderslide extends React.Component {
	constructor(props) {
		super(props);
	}
	render(){
		return (
			<div>
				<div onClick={slide1} id='button-close' style={{position:'absolute',left:'180px',
        top:'50%',marginTop:'-30px'}}><img src={btn_hide_normal} alt=''/></div>

        <div style={{position:'absolute',left:'0',top:'50%',marginTop:'-30px',display:'none'}} onClick={slide2}
         id='button-open'><img src={btn_show_normal} alt=''/></div> 

			</div>
			)
	}
    conponentDidMount(){
        $('#button-close').hover(function(){
            $('#button-close').children('img').fadeOut()
        })
    }
}
export default Siderslide