import React from 'react'
import {FaArrowLeft} from 'react-icons/fa';
import {db} from '../firebase'
import {Button, Dialog } from '@material-ui/core';
import { Box } from '@material-ui/core';

var cartButton;
export default class Course extends React.Component{
    
    state = {
        details:null,
        image:"",
        price:"",
        title:"",
        name:""
    }

    constructor(){
        super()
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount(){
        var docId = "0"//window.Android.getDocId()
        var id = "DelhiBackereiSchule"//window.Android.getClassId()

        const classes = db.collection('Classes').doc(id)
        classes.get().then(snapshot=>{
            this.setState({name:snapshot.get("name")})
        })

        const course = db.collection('Classes').doc(id).collection('Courses').doc(docId)
        course.get()
            .then(snapshot=>{
                this.setState({title:snapshot.get("title")})
                this.setState({price:snapshot.get("price")})
                this.setState({image:snapshot.get("image")})
            })

        const note = db.collection('Classes').doc(id).collection('Courses').doc(docId).collection('details')    
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
        window.Android.exit();
      }
    render(){
        if(true){
            cartButton = <div style={{position:'fixed',bottom:'0',width:'100%',padding:'10px',zIndex:'700',backgroundColor:'white',boxShadow:'2px 2px 10px'}} >
              <Button onClick={()=>this.openAnyActivity(this.state.signed,"https://pidgin-ds.web.app/cart" )} 
                style={{backgroundColor:'#043540',width:'100%',color:'white',fontWeight:'300',margin:'0px',padding:'10px 0px'}} >
                DEMO CLASS 
              </Button>
            </div>
          }
       
        return(
            <div style={{position:'absolute',top:'0',zIndex:'500',maxWidth:'100%',width:'100%',minHeight:'100%',backgroundColor:'white'}} >
        <Box boxShadow={3} style={{width:'100%'}} >
            <div style={{display:'flex',alignContent:'center',padding:'15px',width:'100%'}} >
                <FaArrowLeft color='#043540' size='14' style={{marginTop:'5px',marginRight:'15px'}} onClick={this.goBack} />
                <div class='titleC' >{this.state.title}</div>
            </div>
        </Box>
        <div  style={{width:'100%',display:'flex',justifyContent:'space-around',minHeight:'25%',marginTop:'10px',padding:'20px'}} >
            <img src={this.state.image}  style={{borderRadius:'5%',maxWidth:'100%',width:'60%' }} />
        </div>
        
        <div style={{backgroundColor:'white',width:'100%',padding:'10px',minHeight:'90%'}}>
            <hr color='#043540' size='4' ></hr>
            <div style={{fontFamily:'FiraSans'}} >What you will learn...</div>
            <div style={{padding:'10px',fontSize:'12px'}} >
            {
                this.state.details&&
                this.state.details.map(details=>{
                    return(
                            <div style={{margin:'5px 0px',fontFamily:'FiraSans',minHeight:'10px'}} >{details.item}</div>    
                        )
                    })
            }      
            </div>
        </div>
        <div style={{padding:'10px',width:'100%',color:'grey',fontSize:'10px',textAlign:'center',backgroundColor:'white'}} >Pidgin</div>
        {cartButton}
        <div style={{height:'60px'}} />
        <Dialog>    
            
        </Dialog>
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
