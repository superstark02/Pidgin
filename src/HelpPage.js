import React from 'react'
import { FaUser } from 'react-icons/fa';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined';
import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import icon from './Images/listIcon.png'
import Button from '@material-ui/core/Button';
import { db } from './firebase'
import iconB from './Images/buttonIcon.png'

function myFunction () {
    window.Android.verification();
}

class HelpPage extends React.Component{

    constructor(){
        super()
        this.openAnyActivity = this.openAnyActivity.bind(this)
    }

    openAnyActivity = (phone,url) =>{
        window.Android.openAnyActivity(phone,url);
    }

    state = {
        phone:null
    }
    componentDidMount(){
        const deviceId = window.Android.getId()
        const data = db.collection("DeviceId").doc(deviceId)
        data.get().then(snapshot=>{
            this.setState({phone:snapshot.get('id')})
        })
    }
    render(){
        if(this.state.phone==null){
            return(
                <div>
                    <div class='title'>
                        <div class='orange'>
                            <div style={{marginBottom:'10px',fontSize:'20px'}}>
                                HELP
                            </div>
                        </div>
                    </div>

                    <div style={{position:'absolute',top:'50%',width:'100%',textAlign:'center'}} >
                    <Button style={{borderColor:'#04BF7B',color:'#04BF7B'}}  onClick={myFunction}
                        variant="outlined" color="primary" startIcon={<img src={iconB} width='20px' height='20px'/>} >
                        Sign In
                    </Button>
                    </div>
                </div>
            )
        }

        return(
            <div>
                <div class='title'>
                        <div class='orange'>
                            <div style={{marginBottom:'10px',fontSize:'20px'}}>
                                HELP
                            </div>
                        </div>
                </div>

                <ListItem alignItems="flex-start" button >
                    <ListItemAvatar>
                        <Avatar alt="UserImg" src={<FaUser/>} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={this.state.phone}
                        secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                        >
                            e-mail id
                        </Typography>
                    </React.Fragment>
                }
                    />
                </ListItem>
                <Typography style={{fontSize:'12px',marginTop:'20px',color:'grey',marginLeft:'15px',marginBottom:'-10px'}}>Account</Typography>
                <Divider variant="inset" />
                <br/>

                <ListItem alignItems="flex-end" button onClick={()=>this.openAnyActivity(this.state.phone,'https://pidgin-ds.web.app/on_going')} >
                    <ListItemAvatar>
                        <PlayCircleOutlineOutlinedIcon fontSize='inherit' color='inherit' style={{color:'grey',marginLeft:'15px'}} />
                    </ListItemAvatar>
                    <Typography style={{fontSize:'12px'}}>On Going Classes </Typography>
                    
                </ListItem>

                <ListItem alignItems="flex-end" button >
                    <ListItemAvatar>
                        <CreditCardOutlinedIcon fontSize='inherit' color='inherit' style={{color:'grey',marginLeft:'15px'}} />
                    </ListItemAvatar>
                    <Typography style={{fontSize:'12px'}}>Your Payments </Typography>
                    
                </ListItem>

                <ListItem alignItems="flex-end" button >
                    <ListItemAvatar>
                        <FavoriteBorderOutlinedIcon fontSize='inherit' color='inherit' style={{color:'grey',marginLeft:'15px'}} />
                    </ListItemAvatar>
                    <Typography style={{fontSize:'12px'}}>Liked Classes </Typography>
                    
                </ListItem>

                <Typography style={{fontSize:'12px',marginTop:'20px',color:'grey',marginLeft:'15px',marginBottom:'-10px'}}>Team Up</Typography>
                <Divider variant="inset" />
                <br/>
                
                <ListItem alignItems="flex-end" button >
                    <ListItemAvatar>
                        <img src={icon} width='17px' height='17px' style={{marginLeft:'15px',marginTop:'-10px'}} />
                    </ListItemAvatar>
                    <Typography style={{fontSize:'12px'}}>Put Your Class On Pidgin </Typography>
                    
                </ListItem>

                <Typography style={{fontSize:'12px',marginTop:'20px',color:'grey',marginLeft:'15px',marginBottom:'-10px'}}>Help</Typography>
                <Divider variant="inset" />
                <br/>

                <ListItem alignItems="flex-end" button >
                    <ListItemAvatar>
                        <HelpOutlineOutlinedIcon fontSize='inherit' color='inherit' style={{color:'grey',marginLeft:'15px'}} />
                    </ListItemAvatar>
                    <Typography style={{fontSize:'12px'}}>Help </Typography>
                    
                </ListItem>

            </div>
        )
    }
}
export default HelpPage;