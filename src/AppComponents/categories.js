import React from 'react'
import './categories.css'
import {db} from '../firebase'
import {FaStar, FaBolt, FaBoxes } from 'react-icons/fa';

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
                                <div class='avatarCat'>
                                    <img src={images.image} class='imageCat' />
                                </div>
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