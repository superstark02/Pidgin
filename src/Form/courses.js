import React from "react";
import FormHelperText from '@material-ui/core/FormHelperText';
import {db} from '../firebase.js'
import { FaPlus } from 'react-icons/fa';
import Fab from '@material-ui/core/Fab';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Dialog } from '@material-ui/core'
import { ClientInput, Details} from './clientFormInpput'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export const Course = ({name})=>{

    const [newTitle,setNewTitle] = React.useState('')
    const [newPrice,setNewPrice] = React.useState('')
    const [newDetails,setNewDetails] = React.useState('')

    const [spells,setSpells] = React.useState([])

    const [openCourse, setOpenCourse] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleCourse = () => {
        setOpenCourse(true);
      };
    const handleCloseCourse = () => {
        setOpenCourse(false);
    };
    const addCourse = () => {
        setOpenCourse(false);
        db.collection('Classes').doc(name).collection('Courses').add({title:newTitle,price:newPrice});
        setOpen(true);
    };

    const handleCloseSnackbaar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    

    React.useEffect(() => {
        const fetchData = async () => {
            const data = db.collection("Classes").doc(name).collection('Courses').get()
            setSpells((await data).docs.map(doc => ({...doc.data(),id: doc.id})))
        }
        fetchData()        
    },[])

    return(
        <div style={{backgroundColor:'white',height:'600px', overflowY:'scroll'}} >
            <div style={{textAlign:'center'}}>Courses</div>
            <hr></hr>

            {
                spells.map(spell=>(
                    <ClientInput spell={spell} id={name}/>
                ))
            }
            
            <Fab color="secondary" variant='extended' style={{position:'fixed',bottom:'0',right:'0',margin:'10px'}} onClick={handleCourse} >
                <FaPlus/>
                  ADD COURSE
            </Fab>
            <Dialog
                    open={openCourse}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseCourse}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                <DialogTitle id="alert-dialog-slide-title">{"Add Course"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <FormHelperText>Name of the course</FormHelperText>
                        <input class="clientInput" value={newTitle} onChange={(e)=>{setNewTitle(e.target.value)}} />

                        <FormHelperText>Price of the course</FormHelperText>
                        <input class="clientInput" value={newPrice} onChange={(e)=>{setNewPrice(e.target.value)}} />

                        <FormHelperText style={{color:'red'}}>*Please reload the webpage after adding to see changes.</FormHelperText>
                    </DialogContentText>
                </DialogContent>
                    <DialogActions>
                        <Button  color="primary" onClick={addCourse}>
                            ADD
                        </Button>
                        <Button  color="primary" onClick={handleCloseCourse}>
                            CLOSE
                        </Button>
                    </DialogActions>
            </Dialog>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbaar}>
                <Alert onClose={handleCloseSnackbaar} severity="success">
                Successfully Added!
                </Alert>
            </Snackbar>


        </div>
    )
} 

{/*export function EditCourse(id,docId) {
    const [detail,setDetail] = React.useState([])
    React.useEffect(() => {
        const fetchDataNote = async () => {
            const data = db.collection("Classes").doc(id).collection('Courses').doc(docId).collection('details').get();
            setDetail((await data).docs.map(doc => ({...doc.data(), id: doc.id})))
        }
        fetchDataNote()
    },[])


    return <div style={{zIndex:'500',backgroundColor:'white',position:'absolute'}} >
            <AppBar position="static" color='#043540' style={{backgroundColor:'#043540',color:'white',maxWidth:'100%'}}>
                <Toolbar>
                    <Typography variant="h7" align='center' style={{fontWeight:'300'}}>
                        Edit Course
                    </Typography>
                </Toolbar>
            </AppBar>
            <div style={{padding:'20px 10px',maxWidth:'100%'}}>
                <div style={{display:'flex',marginLeft:'10px'}}>
                    <div>
                        <img  width='100px' height='100px' style={{borderRadius:'50%'}} />
                    </div>
                    <div style={{marginLeft:'10px'}}>
                        <div><input class='clientInput' 
                            onChange={(e)=>{this.setState({title:e.target.value})}}/></div>
                        <div><input class='clientInput' 
                            onChange={(e)=>{this.setState({price:e.target.value})}}/></div>
                    </div>
                </div>
            </div>  
            <div style={{margin:'10px',fontFamily:'FiraSansItalic',maxWidth:'100%'}} >Details: Syllabus covered, duration, benefits, etc... </div>
            {
                 detail.map(spell=>(
                    <Details spell={spell} id={id} docID={docId} />
                ))
            }
        </div>
}*/}