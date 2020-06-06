import React from 'react'
import {FaArrowLeft} from 'react-icons/fa';
import {db} from '../firebase'
import wa from '../Images/waButton.png'
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
        var docId = window.Android.getDocId()
        var id = window.Android.getClassId()

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
       
        return(
            <div style={{overflowY:'hidden'}} >
        <div class='overlayBlack'>
            <ArrowBackIcon fontSize='10px' style={{margin:'15px'}} onClick={this.goBack}/>
        </div>
        <div  style={{width:'100%'}} >
            <img src={this.state.image} style={{width:'100%'}} />
        </div>
        
        <div style={{position:'absolute',top:'0',marginTop:'100px',backgroundColor:'white',width:'100%',
            borderRadius:'30px', padding:'10px',overflowY:'scroll',minHeight:'90%',zIndex:'500' }}>
            <div style={{borderRadius:'30px 30px 0px 0px',width:'100%',border:'solid 1px #043540',color:'#043540',padding:'10px'}} >
                <div style={{textAlign:'center',fontSize:'16px'}} >{this.state.title}</div>
                <div  style={{textAlign:'center',fontSize:'13px'}} >&#8377; {this.state.price}</div>
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
