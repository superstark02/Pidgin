import React from 'react'
import './App.css'
import wallpaper from './Images/Website.png'
import noForms from './Images/noFormsWebsite.png'
import oneForm from './Images/Website1.png'
import commingSoon from './Images/commingSoon.png'
import {motion } from 'framer-motion';

class SchoolPage extends React.Component{
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
            <div>
                <div class='appBar'>
                <div style={{marginBottom:'10px',fontSize:'20px'}}>
                    SCHOOLS
                </div>
                </div>
                <img src={wallpaper} width='100%' />
                <div class='richText' >
                    We introduce you to our
                </div>
                
                <div class='richText' >
                   <b>Common School Admission</b> 
                </div>

                <div class='richText' >
                    form.
                </div>
                <img src={noForms} width='100%' style={{marginTop:'50px',marginBottom:'50px'}} />
                <div class='richText1' >
                    Select schools.
                </div>
                <div class='richText1' >
                    Fill a common form.
                </div>
                <div class='richText1' >
                    Send to several schools.
                </div>
                <div class='richText1' >
                    Through app.
                </div>
                <div class='richText1' >
                    According to your time and convenience.
                </div>
                <img src={oneForm}  width='100%' style={{marginTop:'50px'}}  />

                <div class='richText1' >
                    No visiting several Schools.
                </div>
                <div class='richText1' >
                    Save your time.
                </div>
                <div class='richText' >
                    Also....
                </div>
    
                <div class='richText1' >
                    RELAX
                </div>

                <img src={commingSoon}  width='100%' style={{marginTop:'50px'}}  />
                <div style={{height:'40px'}} ></div>
            </div>
        )
    }
}
export default SchoolPage;