import React from "react";
import FormHelperText from '@material-ui/core/FormHelperText';
import {db} from '../firebase.js'
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Dialog } from '@material-ui/core'
import { ClientInputQualifications} from './clientFormInpput'
import Button from '@material-ui/core/Button';
import { FaPlus } from 'react-icons/fa';
import Fab from '@material-ui/core/Fab';import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function Alert(props) {
return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Qualification = ({name})=>{

    const [qualfications,setqualfications] = React.useState([])

    const [newTitle,setNewTitle] = React.useState('')
    const [open, setOpen] = React.useState(false);

    const [openQualification, setOpenQualification] = React.useState(false);
    
    const handleQualification = () => {
        setOpenQualification(true);
    };
    const handleCloseQualification = () => {
        setOpenQualification(false);
    };
    const  addQualification = () => {
        setOpenQualification(false);
        db.collection('Classes').doc(name).collection('Qualifications').add({item:newTitle});
        setOpen(true);
        window.location.reload();
    }

    const handleCloseSnackbaar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };


    const [spells,setSpells] = React.useState([])

    React.useEffect(() => {
        const fetchDataQualification = async () => {
            const data = db.collection("Classes").doc(name).collection('Qualifications').get()
            setqualfications((await data).docs.map(doc => ({...doc.data(), id: doc.id})))
        }
        fetchDataQualification()
    },[])

    return(
        <div>
            {
                qualfications.map(spell=>(
                    <ClientInputQualifications spell={spell} id={name} />
                ))
            }
            <div style={{height:'60px'}} ></div>
            <Dialog
                    open={openQualification}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseQualification}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                <DialogTitle id="alert-dialog-slide-title">{"Add Something About You"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <FormHelperText>You may write achievements, qualfications etc...</FormHelperText>
                        <textarea style={{width:'100%',height:'150px',marginRight:'-20px',padding:'5px'}}
                         class="clientInput" value={newTitle} onChange={(e)=>{setNewTitle(e.target.value)}} />
                        <FormHelperText style={{color:'red'}}>*Please reload the webpage after adding to see changes.</FormHelperText>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={addQualification} color="primary">
                        ADD
                    </Button>
                    <Button onClick={handleCloseQualification} color="primary">
                        CANCEL
                    </Button>
                </DialogActions>
            </Dialog>
            <Fab color="secondary"style={{position:'fixed',bottom:'0',right:'0',margin:'10px'}} onClick={handleQualification} >
                <FaPlus/>
            </Fab>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbaar}>
                <Alert onClose={handleCloseSnackbaar} severity="success">
                Successfully Added!
                </Alert>
            </Snackbar>

        </div>
    )
} 