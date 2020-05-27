import React from 'react'
import ReactAvatar from 'react-avatar';
import { Link } from 'react-router-dom';
import {FaArrowLeft} from 'react-icons/fa';
import wa from '../Images/waButton.png'

export default class Course extends React.Component{
    goBack(){
        this.props.history.goBack();
      }
    render(){
        return(
            <div  style={{backgroundColor:'white',position:'absolute',zIndex:'300',maxWidth:'100%',width:'100%'}}>
                <div>
                    <Link to='/' ><button style={{backgroundColor:'transparent',paddingLeft:'0px',paddingTop:'0px'}}
                    onClick={this.goBack} >
                    <FaArrowLeft color='#043540' size='20' class='backIcon'/></button></Link>
                </div>
                <div  style={{textAlign:'center'}} >
                    <ReactAvatar src={this.props.location.state.image} round='50%' size='60'/>
                </div>
                
                <div  style={{textAlign:'center'}} >{this.props.location.state.title}</div>
                <div  style={{textAlign:'center',fontSize:'13px'}} >&#8377; {this.props.location.state.price}</div>
                <div>{this.props.location.state.details}</div>
                <div style={{position:'fixed',bottom:'0',paddingBottom:'20px',width:'100%',maxWidth:'100%',color:'white',textAlign:'center',backgroundColor:'white'}} >
                    <a href={'https://wa.me/919910197196?text=I%20would%20like%20to%20join%20'+this.props.location.state.name+'%20with%20'+this.props.location.state.title+'%20course.'} >
                    <button style={{margin:'20px',color:'green',backgroundColor:'white',fontSize:'18px',border:'solid green 1px', borderRadius:'10px'}}>
                        <div style={{display:'flex'}}>
                            <img src={wa} width='30px' />
                            <div style={{alignSelf:'center',marginLeft:'5px'}} >Chat And Enroll</div>
                        </div>
                    </button>
                    </a>
                </div>
            </div>
        )
    }
}