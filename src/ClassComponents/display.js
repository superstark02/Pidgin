import React from 'react';
import '../App.css';
import {FaMapMarkerAlt, FaClock, FaGlobe, FaStopwatch, FaCalendar, FaFemale, FaUser, FaUsers, FaChevronLeft, FaGraduationCap} from 'react-icons/fa';
import Slide from '@material-ui/core/Slide';
import {db, rdb} from '../firebase'
import trial from '../Images/trial.png'
import { Dialog, Button } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import Switch from '@material-ui/core/Switch';
import Chip from '@material-ui/core/Chip';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import image from '../Images/DialogImg.png'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

var name
var womenCell;
var onlinecell;

var women;
var online;

var cart;
var cartButton;

class ClassesDisplay extends React.Component{

openAnyActivity = (phone,url) =>{
  window.Android.openAnyActivity(phone,url);
}
  
  state = {
    name: null,
    images: null,
    eligibility: null,
    qualifications: null,
    note: null,
    courses: null,
    offers: null,
    age:null,
    id:'',
    woman:false,
    online:false,
    address:'',
    type:'',
    location:"",

    courseId:'',
    courseName:'',
    courseImage:'',
    courseFees:'',
    docId:'',
    courseLength:'',

    dialogTitle:'',
    dialogCourseId:'',
    image:'',

    value:0,
    trial:'course',
    individual:'individual',
    time:'',
    on:'',

    signed:false,
    showCart:false,
  }

  constructor(){
    super();
    this.state={
      open:false
    }
   this.exit = this.exit.bind(this)
   this.handleAdd = this.handleAdd.bind(this)
   this.handleClose = this.handleClose.bind(this)
   this.myFunction = this.myFunction.bind(this)
   this.handleCart = this.handleCart.bind(this)
   this.openAnyActivity = this.openAnyActivity.bind(this)
}

exit = () => {
  window.Android.exit();
}
handleAdd = (courseId,title,price,image) => {
 this.setState({open:true,dialogCourseId:courseId,dialogTitle:title,courseFees:price,image:image})     
}
handleClose = () => {
  this.setState({open:false})     
 }

handleChange = (event, newValue) => {
  this.setState({value:newValue});
};



handleTrial = (event) => {
  this.setState({trial:event.target.value})
}
handleIndividual = (event) => {
  this.setState({individual:event.target.value})
}
handleTime = (event) => {
  this.setState({time:event.target.value})
}
handleOnline = (event) => {
  this.setState({online:event.target.value})
}

handleCart = (name,fees,online,timing,individual,trial,image) => {
  if(this.state.signed!=null){
    rdb.ref().child("Users").child(this.state.signed).child("Cart").child(name).set({
      name:name,
      price:fees,
      online:online,
      timing:timing,
      individual:individual,
      trial:trial,
      image:image,
    })
    this.setState({showCart:true})
  }
  else{
    window.Android.verification();
  }
  this.setState({open:false})
}

myFunction = (docId) => {
  window.Android.openAnySubActivity(this.state.id, docId, "https://pidgin-ds.web.app/course")
}
  componentDidMount(){
    name = "CookeryExpressions"//window.Android.getClassId();
    this.setState({id:name})
    const id = "device"//window.Android.getId()
    const check = db.collection("DeviceId").doc(id)
      check.get().then(snapshot=>{
        this.setState({signed:snapshot.get("id")})
      })

    const data = db.collection('Classes').doc(name);    
     data.get()
      .then(snapshot=>{
          this.setState({name:snapshot.get('name')})
          this.setState({age:snapshot.get('age')})
          this.setState({woman:snapshot.get('woman')})
          this.setState({online:snapshot.get('online')})
          this.setState({address:snapshot.get('address')})
          this.setState({type:snapshot.get('type')})
          this.setState({location:snapshot.get('location')})
      })

    const images = db.collection('Classes').doc(name).collection('Images');    
      images.get()
      .then(snapshot=>{
        const images = []
        snapshot.forEach(doc=>{
          const data = doc.data()
          images.push(data)
        })
        this.setState({images:images})
      })

      const eligibility = db.collection('Classes').doc(name).collection('Eligibility');    
      eligibility.get()
      .then(snapshot=>{
        const eligibility = []
        snapshot.forEach(doc=>{
          const data = doc.data()
          eligibility.push(data)
        })
        this.setState({eligibility:eligibility})
      })

      const qualifications = db.collection('Classes').doc(name).collection('Qualifications');    
      qualifications.get()
      .then(snapshot=>{
        const qualifications = []
        snapshot.forEach(doc=>{
          const data = doc.data()
          qualifications.push(data)
        })
        this.setState({qualifications:qualifications})
      })

      const note = db.collection('Classes').doc(name).collection('Note');    
      note.get()
      .then(snapshot=>{
        const note = []
        snapshot.forEach(doc=>{
          const data = doc.data()
          note.push(data)
        })
        this.setState({note:note})
      })

      const courses = db.collection('Classes').doc(name).collection('Courses');    
      const add = db.collection('Classes').doc(name).collection('Courses');
      courses.get()
      .then(snapshot=>{
        const courses = []
        const length = snapshot.size
        snapshot.forEach(doc=>{
          const data = doc.data()
          add.doc(doc.id).update({id:doc.id})
          courses.push(data)
        })
        this.setState({courses:courses})
        this.setState({courseLength:length})
      })

      const offers = db.collection('Classes').doc(name).collection('Offers');    
      offers.get()
      .then(snapshot=>{
        const offers = []
        snapshot.forEach(doc=>{
          const data = doc.data()
          offers.push(data)
        })
        this.setState({offers:offers})
      })
  }

  render() {
    women = this.state.woman
    online = this.state.online
    if(online){
      onlinecell = <td><FaGlobe color='#353535' style={{marginBottom:'-2px',marginRight:'5px'}}/> Online Available</td>
    }

    if(women){
      womenCell = <td><FaFemale color='#353535' style={{marginBottom:'-2px',marginRight:'5px'}}/> Only For Woman</td>
    }

    if(this.state.showCart){
      cartButton = <div style={{position:'fixed',bottom:'0',width:'100%',padding:'10px',zIndex:'700'}} >
        <Button onClick={()=>this.openAnyActivity(this.state.signed,"https://pidgin-ds.web.app/cart")} 
          style={{backgroundColor:"#043540",width:'100%',color:'white',fontWeight:'300',margin:'0px',padding:'10px 0px'}} >
          SHOW CART
        </Button>
      </div>
    }

    return (
        <div style={{backgroundColor:'white',position:'absolute',zIndex:'300',maxWidth:'100%',width:'100%'}}>
        <div class='overlayContainer'>
       
              <div class='carouselContainer' style={{height:'250px'}} > 
                {
                  this.state.images&&
                  this.state.images.map(image=>{
                    if(image==null){
                      return(
                        <Skeleton variant="rect" width={210} height={250} />
                      )
                    }
                    else{
                      return(
                        <div class="w3-animate-zoom"><img src={image.item} height='250px' width='auto' class='imageCarousel'/></div>
                      )
                    }
                  })
                }       
              </div>    
      
        <div class='overlayBlack' >
          <div onClick={this.exit}><ArrowBackIcon fontSize='10px' style={{margin:'15px'}} /></div>
        </div>
        </div>
        <div>
       
        <div class='displayTitle'>
          {this.state.name}
          <div class='mapIcon'>
            <a href={this.state.location} ><FaMapMarkerAlt color='#043540'/></a>
            <div style={{fontSize:'10px'}} >Map</div>
          </div>
        </div>      
                        
        </div>
        <div class='displaySubtitle'>
          <div>{this.state.address}</div>
          <div style={{display:'flex'}} > 

            <div class='displayAge'>
                        Age: {this.state.age}+
            </div>
            <div class='displayType' >
                        {this.state.type}
            </div>

          </div>  
        <Divider/>
        </div>
        <div class='carouselContainer'>
          {
            this.state.offers&&
            this.state.offers.map(offers=>{
              return(
                <div class='offers' style={{backgroundColor:'#FFFF'}}>  
                      <div style={{marginLeft:'30px'}} >{offers.title}</div>
                      <div style={{marginLeft:'30px',marginTop:'5px',whiteSpace:'normal',fontSize:'10px'}} >{offers.detail}</div>
                </div>
                )
            })
          }
        </div>

        <List subheader={<li />}>
          <li>
          <ul style={{padding:'10px'}} >
              <ListSubheader style={{fontSize:'12px',backgroundColor:'white'}} >{`Features`}</ListSubheader>
              <table style={{width:'100%',marginBottom:'30px',fontFamily:'sans-serif'}}>
                <tr>
                  <td><FaClock color='#353535' style={{marginBottom:'-2px',marginRight:'5px'}}/> 2:00 pm to 8:00 pm</td>
                  <td><FaStopwatch  color='#353535'style={{marginBottom:'-2px',marginRight:'5px'}}/> 1hr/Class</td>
                </tr>
                <tr>
                  <td><FaCalendar  color='#353535' style={{marginBottom:'-2px',marginRight:'5px'}}/> 3 clases/week </td>
                  {onlinecell}
                </tr>
                <tr>
                  <td><FaUser color='#353535' style={{marginBottom:'-2px',marginRight:'5px'}}/> Group Classes Availible</td>
                  <td><FaUsers color='#353535' style={{marginBottom:'-2px',marginRight:'5px'}}/> Individual Classes Availible</td>
                </tr>
                <tr>
                {womenCell}
                <td><img src={trial} width="15px" height='15px' /> 1 Trial Class</td>
                </tr>
              </table>
            </ul>
          </li>
          <li style={{backgroundColor:'#04BF7B'}} >
            <ul style={{padding:'10px'}} >
              <ListSubheader style={{fontSize:'12px',backgroundColor:'#04BF7B'}} >{`Eligibility`}</ListSubheader>
              {
                this.state.eligibility&&
                this.state.eligibility.map(eligibility=>{
                  return(
                    <ListItem style={{padding:'0px 15px'}} >
                      <div style={{fontFamily:'FiraSans',fontSize:'13px',color:'white'}}>{eligibility.item}</div>
                    </ListItem>
                    )
                })
              }
            </ul>
          </li>
          <li>
            <ul style={{padding:'10px'}} >
              <ListSubheader style={{fontSize:'12px',backgroundColor:'white'}} >{`Courses (`+this.state.courseLength+`)`}</ListSubheader>
              {
                this.state.courses&&
                this.state.courses.map(course=>{
                  return(
                    <ListItem button style={{padding:'0px 15px'}} >
                      <div style={{display:'flex',margin:'10px 0px'}} >
                        <div>
                          <img src={course.image} width='70px' height='70px' style={{borderRadius:'10px'}} />
                        </div>
                        <div style={{marginLeft:'10px'}} onClick={()=>this.myFunction(course.id)} >
                          <div style={{color:'#043540',fontFamily:'FiraSans',fontSize:'13px',maxWidth:'76%'}} >{course.title}</div>
                          <div style={{color:'grey',fontSize:'11px'}}>&#8377; {course.price}</div>
                          <Divider/>
                           <div style={{fontSize:'8px',fontFamily:'sans-serif'}} >More Details <i class="fa fa-chevron-right" style={{fontSize:'5px',marginTop:'10px'}}></i></div>
                        </div>
                        <div style={{alignContent:'center',marginLeft:'auto', paddingLeft:'5px',right:'0',position:'absolute'}} >
                          <Button onClick={()=>this.handleAdd(course.id,course.title,course.price,course.image)}
                            variant="outlined" color="secondary" style={{borderRadius:'5px',fontSize:'8px',padding:'5px 0px'}}>
                              + ADD
                          </Button>
                        </div>
                      </div>
                    </ListItem>
                    )
                })
              }
            </ul>
          </li>
          <li style={{backgroundColor:'#04BF7B'}} >
            <ul style={{padding:'10px'}} >
              <ListSubheader style={{fontSize:'12px',backgroundColor:'#04BF7B'}} >{`Qualifications`}</ListSubheader>
              {
                this.state.qualifications&&
                this.state.qualifications.map(qualifications=>{
                  return(
                    <ListItem style={{padding:'10px 15px'}} >
                      <div style={{fontFamily:'FiraSans',fontSize:'13px',color:'white'}}>{qualifications.item}</div>
                    </ListItem>
                    )
                })
              }
            </ul>
          </li>
          <li style={{backgroundColor:'white'}} >
            <ul style={{padding:'10px'}} >
              <ListSubheader style={{fontSize:'12px',backgroundColor:'white'}} >{`Note From Teacher`}</ListSubheader>
              {
                this.state.note&&
                this.state.note.map(note=>{
                  return(
                    <ListItem style={{padding:'10px 15px'}} >
                      <div style={{fontFamily:'FiraSans',fontSize:'13px'}}>{note.item}</div>
                    </ListItem>
                    )
                })
              }
            </ul>
          </li>
          <div style={{width:'100%',textAlign:'center',color:'lightgrey',fontSize:'10px',marginBottom:'10px'}} >
              Pidgin
          </div>
        </List>
        
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          fullScreen
          scroll='paper'
          onClose={this.handleClose}
          style={{top:'20%',borderRadius:'10px'}}
        >
          <DialogTitle id="alert-dialog-slide-title" ><div  style={{fontSize:'12px'}}>{this.state.dialogTitle}</div></DialogTitle>
          <DialogContent>
            <div>
            <DialogContentText id="alert-dialog-slide-description">
              <div style={{display:'flex',justifyContent:'space-around',width:'100%'}} >
                <div>
                <ToggleButtonGroup size="small" style={{boxShadow:'2px 2px 18px #05F283'}} >
                  <ToggleButton value="left">
                    <PermIdentityOutlinedIcon/> Individual
                  </ToggleButton>
                  <ToggleButton value="center">
                    <PeopleAltTwoToneIcon/> Group
                  </ToggleButton>
                </ToggleButtonGroup>
                </div>
              </div>

                <FormControlLabel
                  control={<Switch/>}
                  style={{margin:'20px 0px'}}
                  label="I want a trial class"
                />

                <div style={{margin:'10px 0px'}} >
                  <Chip variant="outlined" label="8:00 AM" color="primary" icon={<WbSunnyIcon />} style={{margin:'5px',boxShadow:'2px 2px 10px #1976d2'}} />
                  <Chip variant="outlined" label="8:00 PM" color="primary" icon={<NightsStayIcon />} style={{margin:'5px',boxShadow:'2px 2px 10px #1976d2'}} />
                  <Chip variant="outlined" label="8:00 AM" color="primary" icon={<WbSunnyIcon />} style={{margin:'5px',boxShadow:'2px 2px 10px #1976d2'}} />
                  <Chip variant="outlined" label="8:00 PM" color="primary" icon={<NightsStayIcon />} style={{margin:'5px',boxShadow:'2px 2px 10px #1976d2'}} />
                </div>

                <FormControl component="fieldset" style={{marginBottom:'10px',marginTop:'10px'}}>
                  <FormLabel component="legend">Online/Offline</FormLabel>
                  <RadioGroup value={this.state.trial} onChange={this.handleTrial}>
                    <FormControlLabel value='Online' control={<Radio />} label="Online" />
                    <FormControlLabel value='Offline' control={<Radio />} label="Offline" />
                  </RadioGroup>
                </FormControl>
            </DialogContentText>
            </div>
          </DialogContent>

          <div style={{width:'100%',backgroundColor:'transparent'}}>
            <img width="100%" src={image} style={{backgroundColor:'transparent'}} />
          </div>

          <DialogActions style={{borderTop:'solid #f83b82 2px'}} >
            <Button onClick={this.handleClose} color="primary">
              CANCEL
            </Button>
            <Button onClick={()=>this.handleCart(this.state.dialogTitle,this.state.courseFees,this.state.online,this.state.time,this.state.individual,this.state.trial,this.state.image)} color="primary">
              ADD
            </Button>
        </DialogActions>
        </Dialog>
        {cartButton}
      </div>
    )
  }
}
export default ClassesDisplay;
