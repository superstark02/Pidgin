import React from 'react'
import { FaArrowLeft} from "react-icons/fa";
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function exit(){
    window.Android.exit()
}

export default class EnrollmentForm extends React.Component{
    render(){
        return(
            <div style={{minHeight:'100%',position:'absolute',zIndex:'500',backgroundColor:'white',width:'100%',maxWidth:'100%'}} >
                <div style={{display:'flex',alignContent:'center',padding:'15px'}} >
                    <FaArrowLeft color='#043540' size='14' style={{marginTop:'5px',marginRight:'15px'}} onClick={exit} />
                    <div class='titleC' >Enroll</div>
                </div>
                <Divider/>

                <Typography style={{fontSize:'12px',marginTop:'20px',color:'grey',marginLeft:'15px',marginBottom:'-10px'}}>General</Typography>
                <Divider variant="inset" />
                <div style={{padding:'20px 20px'}} > 
                    <TextField id="outlined-search" required color="secondary" label="Name Of The Institution" type="search" variant="outlined"
                        style={{width:'100%',marginBottom:'10px'}} />
                    <TextField id="outlined-search" required color="secondary" label="Type of classes. Ex. Music, Cooking etc." type="search" variant="outlined"
                        style={{width:'100%',marginBottom:'10px'}} />
                </div>

                <Typography style={{fontSize:'12px',marginTop:'20px',color:'grey',marginLeft:'15px',marginBottom:'-10px'}}>About</Typography>
                <Divider variant="inset" />
                <div style={{padding:'20px 20px'}} > 
                    <TextField id="outlined-search" label="Phone Number" required color="secondary" type="search" variant="outlined"
                        style={{width:'100%',marginBottom:'10px'}} />
                    <TextField
                    id="outlined-textarea"
                    label="Adress of the Institution."
                    placeholder="Adress of the Institution."
                    multiline
                    variant="outlined"
                    color="secondary"
                    required
                    style={{width:'100%',marginBottom:'10px'}}
                    />
                </div>

                <div style={{padding:'30px 30px',position:'fixed',bottom:'0',width:'100%'}}> 
                    <Button variant="outlined" color="secondary" style={{width:'100%'}}>
                        SUBMIT
                    </Button>
                </div>
            </div>
        )
    }
}