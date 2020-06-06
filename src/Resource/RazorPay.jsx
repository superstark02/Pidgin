import React from 'react'
import Divider from '@material-ui/core/Divider';
import { FaArrowLeft, FaRegMeh } from "react-icons/fa";
import { Box } from '@material-ui/core';

function exit(){
    window.Android.exit()
}

export default class Checkout extends React.Component{
    render(){
        return(
            <div style={{position:'absolute',top:'0',width:'100%',minHeight:'100%',backgroundColor:'white',zIndex:'300'}} >
                <div style={{display:'flex',alignContent:'center',padding:'15px'}} >
                    <FaArrowLeft color='#043540' size='14' style={{marginTop:'5px',marginRight:'15px'}} onClick={exit} />
                </div>
                <div style={{width:'100%',display:'flex',justifyContent:'space-around',marginTop:'20%'}} >
                    <Box boxShadow={3} style={{width:'80%',padding:'10px'}} >
                        <div style={{fontWeight:'500',fontSize:'18px',color:'#262626'}} >
                            CHECKOUT
                        </div>
                    </Box>
                </div>
                
            </div>
        )
    }
}