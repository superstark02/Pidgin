import React from 'react'
import { ClientInput,ClientInputNotes, ClientInputQualifications } from './clientFormInpput'
import MyHeader from './Haeding'
import {db} from '../firebase.js'
import { Route } from 'react-router-dom'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import { FaChevronDown } from 'react-icons/fa';
import Typography from '@material-ui/core/Typography';
import { Dialog } from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

var name

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function Child({match}){
    name = match.params.id;
    const [spells,setSpells] = React.useState([])
    const [note,setNote] = React.useState([])
    const [qualfications,setqualfications] = React.useState([])

    const [newTitle,setNewTitle] = React.useState('')
    const [newPrice,setNewPrice] = React.useState('')
    const [newDetails,setNewDetails] = React.useState('')

    const [openCourse, setOpenCourse] = React.useState(false);
    const handleCourse = () => {
        setOpenCourse(true);
      };
    const handleCloseCourse = () => {
        setOpenCourse(false);
        db.collection('Classes').doc(name).collection('Courses').add({title:newTitle,price:newPrice,details:newDetails});
    };

    const [openNote, setOpenNote] = React.useState(false);
    const handleNote = () => {
        setOpenNote(true);
    };
    const handleCloseNote = () => {
        setOpenNote(false);
        db.collection('Classes').doc(name).collection('Note').add({item:newTitle});
    };

    const [openQualification, setOpenQualification] = React.useState(false);
    const handleQualification = () => {
        setOpenQualification(true);
    };
    const handleCloseQualification = () => {
        setOpenQualification(false);
        db.collection('Classes').doc(name).collection('Qualifications').add({item:newTitle});
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

    React.useEffect(() => {
        const fetchData = async () => {
            const data = db.collection("Classes").doc(name).collection('Courses').get()
            setSpells((await data).docs.map(doc => ({...doc.data(),id: doc.id})))
        }
        fetchData()
        const fetchDataNote = async () => {
            const data = db.collection("Classes").doc(name).collection('Note').get()
            setNote((await data).docs.map(doc => ({...doc.data(), id: doc.id})))
        }
        fetchDataNote()
        const fetchDataQualification = async () => {
            const data = db.collection("Classes").doc(name).collection('Qualifications').get()
            setqualfications((await data).docs.map(doc => ({...doc.data(), id: doc.id})))
        }
        fetchDataQualification()
        
    },[])


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

    return(
        <div style={{backgroundColor:'white',position:'absolute',zIndex:'300',maxWidth:'100%',width:'100%'}} >
            <MyHeader/>
            <div class='name'>{name}</div>
            <div style={{textAlign:'center'}}>General</div>
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
            </FormControl>

            <div style={{textAlign:'center'}}>Courses</div>
            <hr></hr>

            <ExpansionPanel>
                <ExpansionPanelSummary
                expandIcon={<FaChevronDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>Show Your Courses</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                <div>
                <ol>
                {
                    spells.map(spell=>(
                        <li>
                           <ClientInput spell={spell} id={name} />  
                        </li>
                    ))
                }
                </ol>
                </div>
                </ExpansionPanelDetails>
                </ExpansionPanel>
                <div style={{textAlign:'center'}} ><button onClick={handleCourse} >ADD A COURSE</button></div> 


                <ExpansionPanel>
                    <ExpansionPanelSummary
                    expandIcon={<FaChevronDown />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>Note to Students</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <div>
                    <ol>
                    {
                        note.map(spell=>(
                            <li>
                                <ClientInputNotes spell={spell}  id={name}/>
                            </li>
                        ))
                    }
                    </ol>
                    </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel> 
                <div style={{textAlign:'center'}} ><button onClick={handleNote}>ADD A NOTE</button></div> 

                <ExpansionPanel>
                    <ExpansionPanelSummary
                    expandIcon={<FaChevronDown />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>Your Qualifications</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <div>
                    <ol>
                    {
                        qualfications.map(spell=>(
                            <li>
                                <ClientInputQualifications spell={spell} id={name} />
                            </li>
                        ))
                    }
                    </ol>
                    </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel> 
                <div style={{textAlign:'center'}} ><button onClick={handleQualification}>ADD A QUALIFICATION</button></div> 
                <div style={{height:'60px'}} ></div>

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

                            <FormHelperText>Details about the course: syllabus topics covered etc..</FormHelperText>
                            <textarea value={newDetails} onChange={(e)=>{setNewDetails(e.target.value)}} />
                            <FormHelperText>This input field is expandable. You increase it's size.</FormHelperText>
                            <FormHelperText style={{color:'red'}}>*Please reload the webpage after adding to see changes.</FormHelperText>
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleCloseCourse} color="primary">
                            ADD
                        </Button>
                    </DialogActions>
                </Dialog>

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
                            <textarea class="clientInput" value={newTitle} onChange={(e)=>{setNewTitle(e.target.value)}} />
                            <FormHelperText>This input field is expandable. You increase it's size.</FormHelperText>
                            <FormHelperText style={{color:'red'}}>*Please reload the webpage after adding to see changes.</FormHelperText>
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleCloseNote} color="primary">
                            ADD
                        </Button>
                    </DialogActions>
                </Dialog>


                <Dialog
                    open={openQualification}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseQualification}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Add Note"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <FormHelperText>Write Your Qualification</FormHelperText>
                            <textarea class="clientInput" value={newTitle} onChange={(e)=>{setNewTitle(e.target.value)}} />
                            <FormHelperText>This input field is expandable. You increase it's size.</FormHelperText>
                            <FormHelperText style={{color:'red'}}>*Please reload the webpage after adding to see changes.</FormHelperText>
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleCloseQualification} color="primary">
                            ADD
                        </Button>
                    </DialogActions>
                </Dialog>

                
        </div>
    )
}

export default class ClientForm extends React.Component{

    render(){
        return(
            <div style={{backgroundColor:'white',position:'absolute',zIndex:'300',maxWidth:'100%',width:'100%'}} >
                <Route path='/:id' component={Child}></Route>
            </div>
        )
    }
}