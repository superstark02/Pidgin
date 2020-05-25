import React from 'react'
import uc from './Images/underConstruction.jpg'
import {motion } from 'framer-motion';

class HelpPage extends React.Component{
    render(){
        const pageVariants ={
            initial:{
                opacity: 0,
               
                
            },
            in:{
                opacity:1,
                
            },
            out:{
                opacity: 0,
                
            }
        }

        return(
            <div style={{backgroundColor:'#f1f3f2',overflowY:'hidden'}}>
                <div style={{width:'100%',height:'100%',backgroundColor:'#f1f3f2'}}>
                <img src={uc}  width='100%' style={{marginTop:'50px'}}  />
                </div>
                <div style={{width:'100%',height:'500px',backgroundColor:'#f1f3f2'}}>
                </div>
            </div>
        )
    }
}
export default HelpPage;