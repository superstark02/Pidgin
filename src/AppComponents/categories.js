import React from 'react'
import './categories.css'
import {db} from '../firebase'
import {FaStar, FaBolt, FaBoxes, FaChevronCircleRight } from 'react-icons/fa';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from 'react-router-dom';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';

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
                   
                    <GridList cellHeight={110} style={{padding:'10px',backgroundColor:'white'}} cols={3}>
                    <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
                        <ListSubheader component="div">
                            Search By Categories
                        </ListSubheader>
                    </GridListTile>
                        {   this.state.images&&
                            this.state.images.map((tile) => (
                            <GridListTile key={tile.type} cols={tile.cols || 1}>
                                <div class="w3-container w3-center w3-animate-zoom" style={{padding:'0px'}} >
                                    <img src={tile.image} alt={tile.type}  height='130px' />
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
export default Categories;

