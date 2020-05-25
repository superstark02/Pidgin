import React from 'react'
import './AppBar.css'

class AppBarWeb extends React.Component{
    render(){
        return(
            <div class='appBarWebsite' >
                <div style={{marginLeft:'auto',paddingRight:'5px'}} >
                    <button style={{backgroundColor:'white',color:'#043540'}} class='appButton'>About Us</button>
                </div>
                <div style={{marginLeft:'1px',paddingRight:'30px'}} >
                    <button style={{backgroundColor:'white',color:'#043540'}} class='appButton'>Contact Us</button>
                </div>
            </div>
        )
    }
}
export default AppBarWeb;