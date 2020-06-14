import React from 'react'
import {FaArrowLeft} from 'react-icons/fa';
import {db} from '../firebase'
import {Button, Dialog } from '@material-ui/core';
import { Box } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import TodayRoundedIcon from '@material-ui/icons/TodayRounded';
import Grid from '@material-ui/core/Grid';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import TextField from '@material-ui/core/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



var cartButton;
export default class Course extends React.Component{
    
    state = {
        details:null,
        image:"",
        price:"",
        title:"",
        name:"",
        open:false,
        phone:'',
        device:'',
        id:'',
        email:null,
        time:null,
    }

    constructor(){
        super()
        this.goBack = this.goBack.bind(this);
    }

    checkout = (amount,orderId,email) => {
        if(this.state.email!==null||this.state.email!==''){
            window.Android.checkOut(amount,orderId,this.state.phone,email);
        }
    }

    handleClose = () => {
        this.setState({open:false})     
       }
    handleAdd = (courseId,title,price,image) => {
    this.setState({open:true,dialogCourseId:courseId,dialogTitle:title,courseFees:price,image:image})     
    }

    componentDidMount(){
        var docId = this.props.location.state.courseId
        var id = this.props.location.state.classId

        const phone = this.props.location.state.phone
        /*const device = window.Android.getId()
        this.setState({phone:phone})
        this.setState({device:device})*/

        const timestamp = Date.now()
        var time = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)
        this.setState({time:time})

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
                this.setState({id:snapshot.get("id")})
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
              <Button onClick={this.handleAdd} 
                style={{backgroundColor:'#043540',width:'100%',color:'white',fontWeight:'300',margin:'0px',padding:'10px 0px'}} >
                DEMO CLASS 
              </Button>
            </div>
          }
       
        return(
            <div style={{position:'absolute',top:'0',zIndex:'500',maxWidth:'100%',width:'100%',minHeight:'100%',backgroundColor:'white'}} >
        <Box boxShadow={3} style={{width:'100%'}} >
            <div style={{display:'flex',alignContent:'center',padding:'15px',width:'100%'}} >
                <FaArrowLeft color='#043540' size='14' style={{marginTop:'5px',marginRight:'15px'}} onClick={this.props.history.goBack} />
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
        <Dialog
            open={this.state.open}
            TransitionComponent={Transition}
            keepMounted
            fullScreen
            scroll='paper'
            onClose={this.handleClose}
            style={{top:'20%',borderRadius:'10px',fontFamily:'FiraSans'}}
        >    
            <DialogTitle id="alert-dialog-slide-title" ><div style={{fontSize:'15px'}} >Trial Class @ &#8377;10</div></DialogTitle>
            <DialogContent>
            <div style={{width:'100%',fontSize:'12px'}} >
                <div style={{display:'flex',justifyContent:'space-between',backgroundColor:'#f73378',color:"white",padding:'10px',alignItems:'center',borderRadius:'5px'}} >
                    <div style={{display:'flex',alignItems:'center'}} >
                        <div style={{marginRight:'10px'}} ><AccessTimeRoundedIcon/></div>
                        <div>Time</div>
                    </div>
                    <div>
                        1:00
                    </div>
                </div>

                <div style={{display:'flex',justifyContent:'space-between',padding:'10px',alignItems:'center',color:'#f50057'}} >
                    <div style={{display:'flex',alignItems:'center'}} >
                        <div style={{marginRight:'10px'}} ><TodayRoundedIcon/></div>
                        <div>Date</div>
                    </div>
                    <div>
                        1:00
                    </div>
                </div>

                <div style={{display:'flex',justifyContent:'space-between',backgroundColor:'#f73378',color:"white",padding:'10px',alignItems:'center',borderRadius:'5px'}} >
                    <div style={{display:'flex',alignItems:'center'}} >
                        <div style={{marginRight:'10px'}} ><AccessTimeRoundedIcon/></div>
                        <div>Duration</div>
                    </div>
                    <div>
                        1 hour
                    </div>
                </div>
            </div>

            <div style={{width:'100%',boxShadow:'2px 2px 10px',borderRadius:'10px',padding:'10px',marginTop:'20px'}}>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <MailOutlineRoundedIcon />
                </Grid>
                <Grid item style={{display:'flex',fontSize:'12px'}} alignItems="flex-end">
                    <TextField label="Email"  color='secondary' style={{width:'50%'}} value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}} />@gmail.com
                </Grid>
            </Grid>
            <div style={{fontSize:'10px',margin:'10px',marginTop:'20px'}} >
                This class will be conducted over Google Classrooms. Through this e-mail id.
            </div>
            <div style={{fontSize:'10px',margin:'10px'}} >
                The classroom-id and teacher's details will be provided after the payment.
            </div>
                
            </div>
          </DialogContent>
          <DialogActions style={{borderTop:'solid #f83b82 2px'}} >
            <Button onClick={this.handleClose} color="primary">
              CANCEL
            </Button>
            <Button color="primary" 
                onClick = {()=>{this.checkout(100*10, this.state.id+"+"+this.state.title+"+"+this.state.time+"+"+this.state.phone, this.state.email )}}
            >
              PROCEED TO PAY
            </Button>
        </DialogActions>
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
