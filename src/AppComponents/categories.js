import React from 'react'
import './categories.css'
import {db} from '../firebase'
import {FaStar, FaBolt, FaBoxes } from 'react-icons/fa';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from 'react-router-dom';

class Categories extends React.Component{

    state = {
        images:null
      }

      componentDidMount(){
        const data = db.collection('ImagesClassesTrending');    
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
        while(this.state.images == null){
            return <div>
            <div>
                <div class='topCat'>
                    <div style={{paddingTop:'2px',marginRight:'5px'}}>
                        <FaBoxes color='#043540' style={{marginTop:'0px'}}/>
                        </div>
                    Search By Categories
                </div>
                <div class='containerCat' >
                    <div class='avatarCat' style={{margin:'5px 0px'}} > <Skeleton animation="wave" height={110} variant="rect" width={110} /> </div>
                    <div class='avatarCat' style={{margin:'5px 0px'}} > <Skeleton animation="wave" height={110} variant="rect" width={110} /> </div>
                    <div class='avatarCat' style={{margin:'5px 0px'}} > <Skeleton animation="wave" height={110} variant="rect" width={110} /> </div>
                    <div class='avatarCat' style={{margin:'5px 0px'}} > <Skeleton animation="wave" height={110} variant="rect" width={110} /> </div>
                    <div class='avatarCat' style={{margin:'5px 0px'}} > <Skeleton animation="wave" height={110} variant="rect" width={110} /> </div>
                    <div class='avatarCat' style={{margin:'5px 0px'}} > <Skeleton animation="wave" height={110} variant="rect" width={110} /> </div>
                </div>
            </div>
        </div> 
        }
      
        return(
            <div>
                <div>
                    <div class='topCat'>
                        <div style={{paddingTop:'2px',marginRight:'5px'}}>
                            <FaBoxes color='#043540' style={{marginTop:'0px'}}/>
                            </div>
                        Search By Categories
                    </div>
                    <div class='containerCat'>
                    {
                        this.state.images&&
                        this.state.images.map(images=>{
                            return(
                                <Link to={{
                                    pathname:'/search',
                                    type:images.type
                                }} >
                                <div class='avatarCat'>
                                    <div class="w3-container w3-center w3-animate-zoom" style={{padding:'0px'}} ><img src={images.image} class='imageCat' /></div>
                                </div>
                                </Link>
                            )
                        })
                    }
                   
                    </div>
                </div>
            </div>
        )
    }
}
export default Categories;

