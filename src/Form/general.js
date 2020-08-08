import React from "react";
import {ClientInputNotes} from './clientFormInpput'
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import {db} from '../firebase.js'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import { Dialog } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function Alert(props) {
return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const General = ({name})=>{
    const [note,setNote] = React.useState([])
    const [newTitle,setNewTitle] = React.useState('')

    const [openNote, setOpenNote] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleNote = () => {
        setOpenNote(true);
    };
    const handleCloseNote = () => {
        setOpenNote(false);
    };
    const  addNote = () => {
        setOpenNote(false);
        db.collection('Classes').doc(name).collection('Note').add({item:newTitle});
        setOpen(true);
        window.location.reload();
    }

    const handleCloseSnackbaar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    


    const [general,setGeneral] = React.useState({
        timings:'',
        age:0,
        fees:0,
    })
    const [state, setState] = React.useState({
        online: false,
        group: false,
        individual: false,
        trial:false,
      });


    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const onSubmitBool = () => {
        db.collection('Classes').doc(name).update({online:state.online, trial:state.trial, group:state.group, individual:state.individual})
    }

    const onSubmitTimings = () => {
        db.collection('Classes').doc(name).update({timings:general.timings})
    }

    const onSubmitFees = () => {
        db.collection('Classes').doc(name).update({fees:general.fees})
    }

    const onSubmitAge = () => {
        db.collection('Classes').doc(name).update({age:general.age})
    }

    React.useEffect(() => {
        const fetchDataNote = async () => {
            const data = db.collection("Classes").doc(name).collection('Note').get()
            setNote((await data).docs.map(doc => ({...doc.data(), id: doc.id})))
        }
        fetchDataNote()
    },[])


    return(
        <div>
            <div style={{textAlign:'center'}}>General</div>
            <div class='name'>{name}</div>
            <hr></hr>

            <div style={{marginLeft:'10px',fontSize:'10px'}}>Please provide a range</div>
            <div>
                <input class='clientInput' placeholder='Timings For Your Classes, ex: 2pm to 7pm' onChange={(e)=>{setGeneral({timings:e.target.value})}}/>
                <button onClick={onSubmitTimings} >Update</button>
            </div>

            <div style={{marginLeft:'10px',fontSize:'10px'}}>Minimum Fees</div>
            <div>
                <input class='clientInput'  type='number' placeholder='Starting Fees' onChange={(e)=>{setGeneral({fees:e.target.value})}}/>
                <button onClick={onSubmitFees} >Update</button>
            </div>

            <div style={{marginLeft:'10px',fontSize:'10px'}}>Please provide a number</div>
            <div>
                <input class='clientInput' type='number' placeholder='Minimum Age Of Student' onChange={(e)=>{setGeneral({age:e.target.value})}}/>
                <button onClick={onSubmitAge} >Update</button>
            </div>
                
            <FormControl component="fieldset" style={{marginLeft:'10px'}} >
                <FormHelperText>Some of your Features...</FormHelperText>
                <FormGroup>
                    <FormControlLabel
                    control={<Switch checked={state.online} onChange={handleChange} name="online" />}
                    label="Oniline Classes"
                    />
                    <FormControlLabel
                    control={<Switch checked={state.group} onChange={handleChange} name="group" />}
                    label="Group Classes"
                    />
                    <FormControlLabel
                    control={<Switch checked={state.individual} onChange={handleChange} name="individual" />}
                    label="Individual Classes"
                    />
                     <FormControlLabel
                    control={<Switch checked={state.trial} onChange={handleChange} name="trial" />}
                    label="Trial Class"
                    />
                </FormGroup>
                <button onClick={onSubmitBool}>Update</button>
                <FormHelperText>Please do not share this url with anyone.</FormHelperText>
                <FormHelperText>You may update this information anytime.</FormHelperText>

                <div style={{width:'100%'}} >
                {
                    note.map(spell=>(
                        <ClientInputNotes spell={spell} id={name} />
                    ))
                }
                </div>
                <div style={{textAlign:'center'}} ><button onClick={handleNote}>ADD A NOTE</button></div> 
                <Dialog
                open={openNote}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseNote}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                >
                <DialogTitle id="alert-dialog-slide-title">{"Add Note"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <FormHelperText>Write Your Note</FormHelperText>
                        <textarea style={{width:'100%',height:'150px',marginRight:'-20px',padding:'5px'}} class="clientInput" value={newTitle} onChange={(e)=>{setNewTitle(e.target.value)}} />
                        <FormHelperText>This input field is expandable. You increase it's size.</FormHelperText>
                        <FormHelperText style={{color:'red'}}>*Please reload the webpage after adding to see changes.</FormHelperText>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={addNote} color="primary">
                        ADD
                    </Button>
                    <Button onClick={handleCloseNote} color="primary">
                        CANCEL
                    </Button>
                </DialogActions>
                </Dialog>

                <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbaar}>
                    <Alert onClose={handleCloseSnackbaar} severity="success">
                    Successfully Added!
                    </Alert>
                </Snackbar>

            </FormControl>
        </div>
    )
} 