import React, { useState } from 'react'
import {db} from '../firebase'
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import './Images.css'
import Skeleton from '@material-ui/lab/Skeleton';

const chevronWidth = 40;

class Images extends React.Component{
    state = {
        images:null
      }

      componentDidMount(){
        const data = db.collection('ImagesClassesContent');    
         data.get()
          .then(snapshot=>{
            const images = []
            snapshot.forEach(doc=>{
              const data = doc.data()
              images.push(data)
            })
            this.setState({images:images})
          })
      }
    
    
    render(){
      if(this.state.images==null){
        return <Skeleton variant="rect" width={210} height={190} animation="wave" style={{margin:'10px'}} />
      }
        return(
           <div>
              <div class='resposive' >
                <div class='coverCarousel'>
                
                    {
                          this.state.images&&
                          this.state.images.map(images=>{
                            return(
                              <img src={images.image} class='image'/>
                            )
                          })
                    }
                
                </div>
            </div>
           </div>
        )
    }
}
export default Images;