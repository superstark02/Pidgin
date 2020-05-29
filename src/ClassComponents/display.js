import React from 'react';
import '../App.css';
import {FaMapMarkerAlt, FaChalkboardTeacher, FaPencilRuler, FaInfoCircle,FaArrowLeft, FaChevronDown, FaClock, FaGlobe, FaStopwatch, FaCalendar, FaFemale, FaUser, FaUsers, FaChevronLeft, FaGraduationCap} from 'react-icons/fa';
import ReactAvatar from 'react-avatar';
import Slide from '@material-ui/core/Slide';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import DialogTitle from '@material-ui/core/DialogTitle';
import {db} from '../firebase'
import trial from '../Images/trial.png'
import {motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Dialog } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

var title
var name
var womenCell;
var onlinecell;

var women;
var online;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class ClassesDisplay extends React.Component{
  
  state = {
    classes: null,
    images: null,
    eligibility: null,
    qualifications: null,
    note: null,
    courses: null,
    offers: null,
    id:'',

    courseId:'',
    courseName:'',
    courseImage:'',
    courseFees:'',
    courseDetails:'',
    docId:''
  }

  constructor(){
    super();
    this.state={
      open:false
    }
   this.goBack = this.goBack.bind(this);
   this.handleClickOpen = this.handleClickOpen.bind(this)
   this.handleClose = this.handleClose.bind(this)
}

handleClickOpen = () => {
  this.setState({open:true})
};
handleClose = () => {
  this.setState({open:false})
};

goBack(){
  this.props.history.goBack();
}


  componentDidMount(){
    name = this.props.location.state.docName;
    this.setState({id:name})
    const data = db.collection('Classes').doc(name).collection('Information');    
     data.get()
      .then(snapshot=>{
        const classes = []
        snapshot.forEach(doc=>{
          const data = doc.data()
          classes.push(data)
        })
        this.setState({classes:classes})
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
        snapshot.forEach(doc=>{
          const data = doc.data()
          add.doc(doc.id).update({id:doc.id})
          courses.push(data)
        })
        this.setState({courses:courses})
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
    women = this.props.location.state.woman
    online = this.props.location.state.online
    if(online){
      onlinecell = <td><FaGlobe color='#353535' style={{marginBottom:'-2px',marginRight:'5px'}}/> Online Available</td>
    }

    if(women){
      womenCell = <td><FaFemale color='#353535' style={{marginBottom:'-2px',marginRight:'5px'}}/> Only For Woman</td>
    }

    const pageVariants ={
      initial:{
          opacity: 0, 
          y:'-100%'
      },
      in:{
          opacity:1,
          y:0
      },
      out:{
          opacity: 0,
          y:'200%'
      }
  }

  const pageTransitions  = {
    transition:'linear',
  }
    
    return (
        <motion.div initial='initial' animate='in' exit='out' variants={pageVariants} transition={pageTransitions}
          style={{backgroundColor:'white',position:'absolute',zIndex:'300',maxWidth:'100%',width:'100%'}}>
        <div class='overlayContainer'>
        {
          this.state.classes&&
          this.state.classes.map(classes=>{
            return(
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
            )
          })
        }
        <div class='overlayBlack'>
          <FaArrowLeft color='#FFFF' size='20' class='backIcon' onClick={this.goBack} /></div>
        </div>
        <div>
        {
          this.state.classes&&
          this.state.classes.map(classes=>{
             return(
                   <div class='displayTitle'>
                      {this.props.location.state.name}
                      <div class='mapIcon'>
                        <FaMapMarkerAlt color='#043540'/>
                        <div style={{fontSize:'10px'}} >Map</div>
                      </div>
                   </div>      
                 )
              })
        }               
        </div>
        <div class='displaySubtitle'>
          <div>{this.props.location.state.address}</div>
          <div style={{display:'flex'}} > 

            <div class='displayAge'>
                        Age: {this.state.age}+
            </div>
            <div class='displayType' >
                        {this.props.location.state.type}
            </div>

          </div>  
          <hr size='1' color='#E6E6E6' ></hr>
          <table style={{width:'100%',marginBottom:'30px'}}>
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


        <hr color='#E6E6E6' size='4' style={{margin:'0px'}}/>

        <div style={{backgroundColor:'#04BF7B',paddingTop:'5px'}}>
        <div class='displaySubtitle2'>
          <FaInfoCircle color='#043540' size='20' style={{marginRight:'10px'}}/>Eligibility Criteria
        </div>
        <div class='displaySubtitle'>
          <div class='eligibility'style={{backgroundColor:'#04BF7B'}}>
          <div class='list'>
        {
          this.state.eligibility&&
          this.state.eligibility.map(eligibility=>{
            return(
                <li>{eligibility.item}</li>
              )
          })
        }
        </div>
        </div>
        </div>
        </div>

        <hr color="#E6E6E6" ></hr>
        <div class='displaySubtitle2'><FaGraduationCap color='#043540' size='20' style={{margin:'10px',marginTop:'0px'}}/>  Courses</div>
        <div class='courseDisplay'>
        {
          this.state.courses&&
          this.state.courses.map(course=>{
            return(
              <div>   
               <Link to={{
                 pathname:'/course',
                 state:{
                   title: course.title,
                   price: course.price,
                   image: course.image,
                   name: this.props.location.state.name,
                   id:this.props.location.state.docName,
                   docId:course.id,
                 }
               }}>
                <div class="displayContainer">
                  {course.title}<br/>&#8377;{course.price}

                   <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
                      <div class='bottom' ><i class="fa fa-chevron-right"></i></div>

                      <div class="w3-card" style={{borderRadius:'50%',width:'60px',alignSelf:'flexEnd'}} >
                        <ReactAvatar src={course.image} round='50%' size='60'/>
                      </div>
                   </div>
                </div>
               </Link>
                <div style={{width:'40px'}}></div>
              </div>
              )
          })
        }
        
        </div>
        

        <ExpansionPanel defaultExpanded={true} disabled={false} elevation={0} style={{border:'none', boxShadow:'none'}}>
          <ExpansionPanelSummary expandIcon={<FaChevronDown size='15' color="#043540"/>}>
            <div class='displaySubtitle2'>
              <FaChalkboardTeacher color='#043540' size='20' style={{marginRight:'10px'}}/>  About Faculty
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <div class='qualifications'>
            {
              this.state.qualifications&&
              this.state.qualifications.map(qualifications=>{
                return(
                  <ul>
                    <li>
                    {qualifications.item}
                    </li>
                  </ul>
                  )
              })
            }
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        
       

        
        <ExpansionPanel defaultExpanded={true} elevation={0} style={{border:'none', boxShadow:'none'}}>
          <ExpansionPanelSummary expandIcon={<FaChevronDown size='15' color="#043540"/>}>
            <div class='displaySubtitle2'>
              <FaPencilRuler color='#043540' size='20' style={{marginRight:'10px'}}/> Note From Teacher
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div class='qualifications'>
            {
              this.state.note&&
              this.state.note.map(note=>{
                return(
                  <ul>
                    <li>
                    {note.item}
                    </li>
                  </ul>
                  )
              })
            }
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <div style={{height:'60px'}} ></div>

      </motion.div>
    )
  }
}
export default ClassesDisplay;
