import React from "react";
import {db} from '../firebase'
import {FaStar, FaBolt, FaBoxes } from 'react-icons/fa';
import './categories.css'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

class CategoriesWeb extends React.Component{
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
                <CssBaseline />
                <Container maxWidth="sm" fixed>
                <Typography component="div" style={{ backgroundColor: 'white'}}>
                <div class='containerCat'>
                    {
                        this.state.images&&
                        this.state.images.map(images=>{
                            return(
                                <div class='avatarCat'>
                                    <img src={images.image} class='categoryImageWeb' />
                                </div>
                            )
                        })
                    }
                   
                </div>
                </Typography>
                </Container>     
            </div>
        )
    }
}
export default CategoriesWeb;