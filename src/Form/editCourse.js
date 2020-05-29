import React from 'react'
import {db} from '../firebase.js'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Detail } from './clientFormInpput.js';
import { FaPlus,FaTrashAlt } from 'react-icons/fa';
import Fab from '@material-ui/core/Fab';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Dialog } from '@material-ui/core'
import { ClientInput, Details} from './clientFormInpput'
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default class Adapter extends React.Component{
    render(){
        return(
            <Edit id={this.props.location.state.id} docId={this.props.location.state.docId}
               t={this.props.location.state.title} p={this.props.location.state.price} image={this.props.location.state.image} />
        )
    }
}

function Edit ({id,docId,t,p,image}) {
    const [detail,setDetail] = React.useState([])
    const [open,setOpen] = React.useState(false)
    const [openS,setOpenS] = React.useState(false)
    const [openD,setOpenD] = React.useState(false)
    const [newDetail,setNewDetail] = React.useState()

    const handleClose = () => {
        setOpen(false);
      };

    const handleDelete = () => {
        db.collection("Classes").doc(id).collection('Courses').doc(docId).delete()
        setOpenD(true)
    };

    const handleDetail = () => {
        setOpen(true);
    };


    const addDetail = () => {
        setOpen(false);
        db.collection("Classes").doc(id).collection('Courses').doc(docId).collection('details').add({item:newDetail});
        setOpenS(true);
    };  

    const handleCloseSnackbaar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenS(false);
    };

    const [title,setTitle] = React.useState(t)
    const [price,setPrice] = React.useState(p)

    React.useEffect(() => {
        const fetchDetails = async () => {
            const data = db.collection("Classes").doc(id).collection('Courses').doc(docId).collection('details').get()
            setDetail((await data).docs.map(doc => ({...doc.data(), id: doc.id})))
        }
        fetchDetails()
    },[])
    
        return(
            <div style={{position:'absolute',zIndex:'500',top:'0',backgroundColor:'white',height:'1000px',width:'100%',overflowY:'scroll'}} >
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
                            <img src={image} width='100px' height='100px' style={{borderRadius:'50%'}} />
                        </div>
                        <div style={{marginLeft:'10px'}}>
                            <FormHelperText>Title Of The Course</FormHelperText>
                            <div><input class='clientInput' 
                                value={title} onChange={(e)=>{setTitle(e.target.value)}} /></div>
                            <FormHelperText>Price Of The Course</FormHelperText>
                            <div><input class='clientInput' 
                                value={price} onChange={(e)=>{setPrice(e.target.value)}} /></div>
                        </div>
                    </div>
                </div>  
                <div style={{margin:'10px',fontFamily:'FiraSansItalic',maxWidth:'100%'}} >Details: Syllabus covered, duration, benefits, etc... </div>
                <div style={{width:'100%'}} >
                {
                    detail.map(spell=>(
                        <Detail spell={spell} id={id} docId={docId}/>
                    ))
                }
                </div>

                <div style={{position:'fixed',bottom:'0',right:'0',margin:'4px 10px'}} >
        
                    <Fab color="primary" variant='extended' onClick={handleDetail} style={{margin:'10px 0px',fontSize:'10px',padding:'10px'}} >
                        <FaPlus size='10' style={{marginRight:'5px'}} />
                        ADD DETAIL
                    </Fab>
                    <div>
                        <Fab color="secondary" variant='extended' style={{margin:'2px 0px',fontSize:'10px',padding:'10px'}} onClick={handleDelete} >
                            <FaTrashAlt size='10' style={{marginRight:'5px'}}/>
                            DELETE THIS COURSE
                        </Fab>
                    </div>
                </div>

                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                <DialogTitle id="alert-dialog-slide-title">{"Add Detail"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <FormHelperText>Write content.</FormHelperText>
                            <textarea class="clientInput" style={{width:'100px',height:'80px'}}
                                value={newDetail} onChange={(e)=>{setNewDetail(e.target.value)}} />

                            <FormHelperText style={{color:'red'}}>*Please reload the webpage after adding to see changes.</FormHelperText>
                        </DialogContentText>
                    </DialogContent>
                        <DialogActions>
                            <Button  color="primary" onClick={addDetail}>
                                ADD
                            </Button>
                            <Button  color="primary" onClick={handleClose}>
                                CLOSE
                            </Button>
                        </DialogActions>
                </Dialog>
                <Snackbar open={openS} autoHideDuration={6000} onClose={handleCloseSnackbaar}>
                    <Alert onClose={handleCloseSnackbaar} severity="success">
                    Successfully Added!
                    </Alert>
                </Snackbar>
                <Snackbar open={openD} autoHideDuration={6000} onClose={handleCloseSnackbaar}>
                    <Alert onClose={handleCloseSnackbaar} severity="error">
                    Removed!
                    </Alert>
                </Snackbar>

            </div>
        )
}

