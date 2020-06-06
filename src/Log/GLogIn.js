import React from 'react'
import { GoogleLogin } from 'react-google-login';
import { Divider} from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

export default class MyGoogleLogIn extends React.Component{
    state = {
        name:''
    }

   

    responseGoogle = (response) => {
        console.log(response)
    }

    render(){
        return(
            <div style={{minHeight:'100%',backgroundColor:'white',zIndex:'500',width:'100%',position:'absolute',textAlign:'center'}} >
                <div style={{marginTop:'50%',fontSize:'25px',marginBottom:'15px'}}>WELCOME</div>
                <div>Please Sign In</div>

                <Divider style={{margin:'0px 40px'}} />
                <div>
                <GoogleLogin
                    clientId="651681146366-ig807p9gaa5rosu4aq9ice08cl69sk66.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={(e)=>this.responseGoogle(e)}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'} 
                />
                </div>
                <CancelOutlinedIcon style={{position:'absolute',top:'0',left:'0',margin:'15px'}} />
            </div>
        )
    }
}