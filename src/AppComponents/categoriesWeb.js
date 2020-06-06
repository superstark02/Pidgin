import React from "react";
import {db} from '../firebase'
import {FaStar, FaBolt, FaBoxes } from 'react-icons/fa';
import './categories.css'
import CssBaseline from '@material-ui/core/CssBaseline';
import {FaChevronCircleRight } from 'react-icons/fa';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';

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
            <div style={{textAlign:'center',width:'100%',display:'flex',justifyContent:'space-around'}} >
                <div style={{width:'450px',right:'40%'}}>
                    <GridList cellHeight={150} style={{backgroundColor:'white'}} cols={3}>      
                        {   this.state.images&&
                            this.state.images.map((tile) => (
                            <GridListTile key={tile.type} cols={tile.cols || 1}>
                                <div class="w3-container w3-center w3-animate-zoom" style={{padding:'0px',margin:'0px'}} >
                                    <img src={tile.image} alt={tile.type}  height='150px' />
                                </div>
                                <GridListTileBar
                                title={tile.type}
                                actionIcon={
                                    <IconButton>
                                        <FaChevronCircleRight color='white' size='10' />
                                    </IconButton>
                                }
                                />
                            </GridListTile>
                        ))}
                    </GridList>  
                </div> 
            </div>
        )
    }
}
export default CategoriesWeb;