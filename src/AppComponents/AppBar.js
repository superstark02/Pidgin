import React, { Fragment } from 'react'
import {FaSearch, FaQuestionCircle} from 'react-icons/fa';
import './AppBar.css'
import { Link } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Divider, Box, Button } from '@material-ui/core';
import {db} from '../firebase.js'

var phone
class MyAppBar extends React.Component{
state = {
    phone:null,
    button:'',
}

    componentDidMount(){
        /*const deviceId = window.Android.getId()
        db.collection("DeviceId").doc(deviceId).get().then(snapshot=>{
            const data = snapshot.get("id")
            this.setState({phone:data})
        })*/
        phone = <FaQuestionCircle style={{fontSize:'25px',color:'black',marginTop:'5px'}} />
        this.setState({button:phone})
    }

    render() {
        
        if(this.state.phone===null){
            this.setState({phone:"WELCOME"})
            phone = <Button variant='filled' color='secondary'>Sign In</Button>
            this.setState({button:phone})
        }

        return (
          <Fragment>
              <div class='title'>
                <div class='orange'>
                    <Box boxShadow={3} >
                    <div style={{fontSize:'15px',padding:'5px 15px',color:'black',display:'flex'}}>
                        <AccountCircleOutlinedIcon style={{fontSize:'25px',color:'black',marginTop:'5px'}} />
                        <div>
                            <div style={{marginLeft:'5px'}} >{this.state.phone}</div>
                            <div style={{display:'block',fontSize:'10px',color:'black',marginLeft:'5px'}} >Not Signed In</div>
                        </div>
                        <div style={{marginLeft:'auto'}} >
                           <Link to='/help' >{this.state.button}</Link>
                        </div>
                    </div>
                    </Box>
                    <Divider/>
                    <Link to={{
                        pathname:'/search',
                        uid: this.props.uid,
                    }} >
                    <div class='searchBar'> 
                        <div styl={{marginRight:'4px'}}><FaSearch size='15' color='grey' /></div>
                        <div class='hint'>Search music, art, gyms....</div>
                    </div>
                    </Link>
                </div>
            </div>
          </Fragment>
        )
    }
}
export default MyAppBar;