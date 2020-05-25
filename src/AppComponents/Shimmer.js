import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

class Shimmer extends React.Component{
    render(){
        return(
           <div style={{width:'100%',zIndex:'100',height:'50px',textAlign:"center"}} >
                <Loader
            type="TailSpin"
            color="#043540"
            height={30}
            width={30}
            timeout={1000} //3 secs
            />
           </div>
        )
    }
}
export default Shimmer;