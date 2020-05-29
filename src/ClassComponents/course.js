import React from 'react'
import {FaArrowLeft} from 'react-icons/fa';
import {db} from '../firebase'
import wa from '../Images/waButton.png'
import Fab from '@material-ui/core/Fab';
import { FormHelperText } from '@material-ui/core';

export default class Course extends React.Component{
    
    state = {
        details:null
    }

    constructor(){
        super()
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount(){
        const note = db.collection('Classes').doc(this.props.location.state.id).collection('Courses').doc(this.props.location.state.docId).collection('details')    
        note.get()
        .then(snapshot=>{
            const details = []
            snapshot.forEach(doc=>{
            const data = doc.data()
            details.push(data)
            })
            this.setState({details:details})
        })
    }

    goBack(){
        this.props.history.goBack();
      }
    render(){
       
        return(
            <div style={{overflowY:'hidden'}} >
        <div class='overlayBlack'>
            <FaArrowLeft color='#FFFF' size='20' class='backIcon' onClick={this.goBack} />
        </div>
        <div  style={{width:'100%'}} >
            <img src={this.props.location.state.image} style={{width:'100%'}} />
        </div>
        
        <div style={{position:'absolute',top:'0',marginTop:'100px',backgroundColor:'white',width:'100%',
            borderRadius:'30px', padding:'10px',overflowY:'scroll',minHeight:'90%',zIndex:'500' }}>
            <div style={{borderRadius:'30px 30px 0px 0px',width:'100%',border:'solid 1px #043540',color:'#043540',padding:'10px'}} >
                <div style={{textAlign:'center',fontSize:'16px'}} >{this.props.location.state.title}</div>
                <div  style={{textAlign:'center',fontSize:'13px'}} >&#8377; {this.props.location.state.price}</div>
            </div>
            <hr color='#043540' size='4' ></hr>
            <div style={{fontFamily:'FiraSansItalic'}} >What you will learn...</div>
            <div>
                <ol style={{fontSize:'12px',fontWeight:'200'}} >
            {
                this.state.details&&
                this.state.details.map(details=>{
                    return(
                            <li style={{margin:'5px 0px',fontFamily:'FiraSans'}} >{details.item}</li>    
                        )
                    })
            }      
                </ol>
            <a href={'https://wa.me/919910197196?text=I%20would%20like%20to%20join%20'+this.props.location.state.name+'%20with%20'+this.props.location.state.title+'%20course.'} >
            <Fab variant="extended" style={{position:'fixed',bottom:'0',backgroundColor:'white',right:'0',margin:'20px'}}>
                <img src={wa} width='30px' style={{marginRight:'5px'}} />
                ENROLL
            </Fab> 
            </a> 
            </div>
        </div>
    </div>
        )
    }
}

{/*
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
*/}
