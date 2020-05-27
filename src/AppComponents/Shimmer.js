import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import Image, { Shimmer } from 'react-shimmer'

class MyShimmer extends React.Component{
    render(){
        return(
           <div style={{width:'100%',zIndex:'100',textAlign:"center",padding:'10px'}} >
            <div style={{height:'70px',width:'100%'}}>
                <Image fallback={<Shimmer width={900} height={600} />} />
            </div>
           </div>
        )
    }
}
export default MyShimmer;