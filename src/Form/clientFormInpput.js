import React from 'react'
import {db} from '../firebase.js'
import FormHelperText from '@material-ui/core/FormHelperText';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import temp from '../Images/buttonIcon.png'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

export const ClientInput = ({spell,id}) => {
    const [titleCourse,settitleCourse] = React.useState(spell.title);
    const [image,setImage] = React.useState(spell.image);
    const [priceCourse,setpriceCourse] = React.useState(spell.price);

    const handleInput = (e) => {
        setpriceCourse(e.target.value)
        db.collection("Classes").doc(id).collection("Courses").doc(spell.id).update({price:e.target.value})
    }

    const handleInputTitle = (e) => {
        settitleCourse(e.target.value)
        db.collection("Classes").doc(id).collection("Courses").doc(spell.id).update({title:e.target.value})
    }

    return <div style={{display:'flex',marginBottom:'20px'}}  >
        {/*<Link to={{
                pathname:'/courseEdit',
                state:{
                    id:id,
                    docId:spell.id,
                    image:image,
                    title:titleCourse,
                    price:priceCourse
                }
            }}>*/}
                <div>
                    <img src={temp} width='50px' height='50px' style={{borderRadius:'50%',marginTop:'15px'}} />
                </div>
                <div style={{marginLeft:'10px'}}>
                    <div style={{fontSize:"10px",color:'grey'}} >Name Of the Course</div>
                    <input value={titleCourse} onChange={(e)=>handleInputTitle(e)} />
                    <div>   
                        <div style={{fontSize:"10px",color:'grey'}} >Price:</div>
                        &#8377;<input value={priceCourse} onChange={(e)=>handleInput(e)}/>
                    </div>
                </div>
            </div>
}

export const ClientInputNotes = ({spell,id}) => {
    const [note,setNote] = React.useState(spell.item);
    const [open, setOpen] = React.useState(false);

    const onUpdate = () =>  {
        db.collection('Classes').doc(id).collection('Note').doc(spell.id).set({item:note});
    }

    const onDelete = () =>  {
        db.collection('Classes').doc(id).collection('Note').doc(spell.id).delete();
        setOpen(true);
        window.location.reload();
    }

    const handleCloseSnackbaar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    return <div style={{width:'100%'}}>
                <div style={{margin:'10px 10px',width:'100%'}}>
                    <textarea style={{width:'100%',height:'150px',marginRight:'-20px',padding:'5px'}} value={note} onChange={(e)=>{setNote(e.target.value)}}/>
                    <div>
                        <button onClick={onUpdate}>Update</button><button onClick={onDelete}>Delete</button>
                    </div>
                </div> 
                <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbaar}>
                    <Alert onClose={handleCloseSnackbaar} severity="error">
                        Removed!
                    </Alert>
                </Snackbar>   
            </div>
    
}

export const ClientInputQualifications = ({spell,id}) => {
    const [qualification,setQualification] = React.useState(spell.item);
    const [open, setOpen] = React.useState(false);

    const onUpdate = () =>  {
        db.collection('Classes').doc(id).collection('Qualifications').doc(spell.id).set({item:qualification});
    }

    const onDelete = () =>  {
        db.collection('Classes').doc(id).collection('Qualifications').doc(spell.id).delete();
        setOpen(true);
        window.location.reload();
    }

    const handleCloseSnackbaar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    return <div>
                <div style={{marginRight:'10px',marginBottom:'10px'}}>
                    <textarea style={{width:'100%',height:'150px',marginRight:'-20px',padding:'5px'}} value={qualification} onChange={(e)=>{setQualification(e.target.value)}}/>
                    <div>
                        <button onClick={onUpdate}>Update</button> <button onClick={onDelete}>Delete</button>
                    </div>
                </div>  
                <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbaar}>
                    <Alert onClose={handleCloseSnackbaar} severity="error">
                        Removed!
                    </Alert>
                </Snackbar> 
            </div>
}



export const Detail = ({spell,id,docId}) => {
    const [detail,setDetail] = React.useState(spell.item);
    const [open, setOpen] = React.useState(false);
    const [openU, setOpenU] = React.useState(false);

    const onUpdate = () =>  {
        db.collection('Classes').doc(id).collection('Courses').doc(docId).collection('details').doc(spell.id).set({item:detail});
        setOpenU(true);
    }

    const onDelete = () =>  {
        db.collection('Classes').doc(id).collection('Courses').doc(docId).collection('details').doc(spell.id).delete();
        setOpen(true);
        window.location.reload();
    }

    const handleCloseSnackbaar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
        setOpenU(false);
      };

    return <div style={{zIndex:'500'}}>
                <div style={{marginBottom:'10px',maxWidth:'100%',padding:'0px 10px'}}>
                    <textarea style={{width:'87%',height:'100px',maxWidth:'100%',padding:'5px',borderRadius:'5px'}} 
                        value={detail} onChange={(e)=>{setDetail(e.target.value)}}/>
                    <div>
                        <button onClick={onUpdate}>Update</button> <button onClick={onDelete}>Delete</button>
                    </div>
                </div>  
                <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbaar}>
                    <Alert onClose={handleCloseSnackbaar} severity="error">
                        Removed!
                    </Alert>
                </Snackbar> 
                <Snackbar open={openU} autoHideDuration={6000} onClose={handleCloseSnackbaar}>
                    <Alert onClose={handleCloseSnackbaar} severity="success">
                        Updated
                    </Alert>
                </Snackbar>
            </div>
}

