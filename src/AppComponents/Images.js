import React, { useState } from 'react'
import {db} from '../firebase'
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import './Images.css'
import MyShimmer from './Shimmer';
import Loader from 'react-loader-spinner';

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
        return <center><Loader type="TailSpin" width='50' color='#043540'/></center>
      }
        return(
           <div>
              <div class='resposive' >
                <div class='coverCarousel'>
                <Carousel
                    infinite
                    autoPlay={3000}
                    stopAutoPlayOnHover={true}
                    animationSpeed={500}
                    centered
                >
                    {
                          this.state.images&&
                          this.state.images.map(images=>{
                            return(
                             <img src={images.image} class='image'/>
                            )
                          })
                    }
                </Carousel>
                </div>
            </div>
           </div>
        )
    }
}
export default Images;