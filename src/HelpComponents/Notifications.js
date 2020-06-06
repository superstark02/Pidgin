import React from 'react'
import Divider from '@material-ui/core/Divider';
import { FaArrowLeft, FaRegMeh } from "react-icons/fa";
import './components.css'
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';

function exit(){
    window.Android.exit()
}

export default class Notifications extends React.Component{
    render(){
        return(
            <div style={{position:'absolute',top:'0',width:'100%',minHeight:'100%',backgroundColor:'white',zIndex:'300'}} >
                <div style={{display:'flex',alignContent:'center',padding:'15px'}} >
                    <FaArrowLeft color='#043540' size='14' style={{marginTop:'5px',marginRight:'15px'}} onClick={exit} />
                    <div class='titleC' >Notifications</div>
                </div>
                <Divider/>
                <div style={{textAlign:'center',top:'40%',position:'absolute',width:'100%'}} >
                    <NotificationsActiveOutlinedIcon style={{fontSize:'100px',color:'#d7d7d7'}}/>
                    <div style={{fontFamily:'FiraSans',color:'#d7d7d7'}} >No On Going Classes</div>
                </div>
            </div>
        )
    }
}