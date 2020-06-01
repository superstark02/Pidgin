import React from 'react';
import '../App.css';
import {FaMapMarkerAlt, FaClock, FaGlobe, FaStopwatch, FaCalendar, FaFemale, FaUser, FaUsers, FaChevronLeft, FaGraduationCap} from 'react-icons/fa';
import Slide from '@material-ui/core/Slide';
import {db} from '../firebase'
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
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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

class ClassesDisplay extends React.Component{
  
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

    courseId:'',
    courseName:'',
    courseImage:'',
    courseFees:'',
    docId:'',
    courseLength:'',

    dialogTitle:'',
    dialogCourseId:'',

    value:0,
  }

  constructor(){
    super();
    this.state={
      open:false
    }
   this.exit = this.exit.bind(this)
   this.handleAdd = this.handleAdd.bind(this)
   this.handleClose = this.handleClose.bind(this)
   this.handleChangeIndex = this.handleChangeIndex.bind(this)
}

exit = () => {
  window.Android.exit();
}
handleAdd = (courseId,title) => {
 this.setState({open:true,dialogCourseId:courseId,dialogTitle:title})     
}
handleClose = () => {
  this.setState({open:false})     
 }

handleChangeIndex = (index) => {
  this.setState({value:index});
};

handleChange = (event, newValue) => {
  this.setState({value:newValue});
};
  componentDidMount(){
    name = 'CookeryExpressions'//window.Android.getClassId();
    this.setState({id:name})
    const data = db.collection('Classes').doc(name);    
     data.get()
      .then(snapshot=>{
          this.setState({name:snapshot.get('name')})
          this.setState({age:snapshot.get('age')})
          this.setState({woman:snapshot.get('woman')})
          this.setState({online:snapshot.get('online')})
          this.setState({address:snapshot.get('address')})
          this.setState({type:snapshot.get('type')})
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
            <FaMapMarkerAlt color='#043540'/>
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
                    <ListItem style={{padding:'0px 15px'}} >
                      <div style={{display:'flex',margin:'10px 0px'}} >
                        <div>
                          <img src={course.image} width='70px' height='70px' style={{borderRadius:'10px'}} />
                        </div>
                        <div style={{marginLeft:'10px'}} >
                          <div style={{color:'#043540',fontFamily:'FiraSans',fontSize:'13px',maxWidth:'76%'}} >{course.title}</div>
                          <div style={{color:'grey',fontSize:'11px'}}>&#8377; {course.price}</div>
                          <Divider/>
                           <div style={{fontSize:'8px',fontFamily:'sans-serif'}} >More Details <i class="fa fa-chevron-right" style={{fontSize:'5px',marginTop:'10px'}}></i></div>
                        </div>
                        <div style={{alignContent:'center',marginLeft:'auto', paddingLeft:'5px',right:'0',position:'absolute'}} >
                          <Button onClick={()=>this.handleAdd(course.id,course.title)}
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
        </List>
        <div style={{height:'60px'}} ></div>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
        >
          <DialogTitle id="alert-dialog-slide-title" ><div  style={{fontSize:'12px'}}>{this.state.dialogTitle}</div></DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label="Individual Classes" {...a11yProps(0)} />
                <Tab label="Group Classes" {...a11yProps(1)} />
              </Tabs>
            </AppBar>

            <SwipeableViews
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabPanel value={this.state.value} index={0}>
                Item One
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
                Item Two
              </TabPanel>
            </SwipeableViews>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              CANCEL
            </Button>
            <Button onClick={this.handleClose} color="primary">
              ADD
            </Button>
        </DialogActions>
        </Dialog>
      </div>
    )
  }
}
export default ClassesDisplay;
