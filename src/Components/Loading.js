import React from 'react'
import Loader from 'react-loader-spinner'

export default class Loading extends React.Component{
    render(){
        return(
            <div style={{position:'fixed',top:'0',right:'0',left:'0',bottom:'0',display:'flex',justifyContent:'space-around',alignItems:'center',zIndex:'500',backgroundColor:'white'}} >    
                <Loader
                     type="TailSpin"
                     color="#043540"
                     height={30}
                     width={30}
                     timeout={3000} 
                />
            </div>
        );
    }
}