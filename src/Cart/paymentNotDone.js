import React from 'react'
import img from '../Images/payunsec.jpg'
import Button from '@material-ui/core/Button';

export default class PaymentNotDone extends React.Component{
    render(){
        return(
            <div style={{position:'absolute',zIndex:'500',minHeight:'100%',backgroundColor:"#0e223b",maxWidth:'100%'}} >
                <img src={img} alt='s' width="100%" />
                <div style={{width:"100%",display:'flex',justifyContent:'space-around',marginTop:'20px'}} >
                    <Button variant="contained" color="secondary" onClick={()=>window.Android.exit()} >
                        RETRY
                    </Button>
                </div>
            </div>
        )
    }
}