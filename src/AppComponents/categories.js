import React from 'react'
import './categories.css'
import {db} from '../firebase'
import {FaChevronCircleRight } from 'react-icons/fa';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from 'react-router-dom';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import icon from '../Images/open-menu.png'

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
                    <img src={icon} height='17px' width='17px' style={{marginTop:'3px',marginLeft:'-10px',marginRight:'10px'}} />
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
                        <img src={icon} height='17px' width='17px' style={{marginTop:'3px',marginLeft:'-10px',marginRight:'10px'}} />
                        Search By Categories
                    </div>
                    <div style={{width:"100%"}} >
                    <GridList cellHeight={100} style={{padding:'10px',backgroundColor:'white'}} cols={3}>      
                        {   this.state.images&&
                            this.state.images.map((tile) => (
                            <GridListTile key={tile.type} cols={tile.cols || 1}>
                                <Link to={{pathname:'/search',type:tile.type}} > 
                                <div class="w3-container w3-center w3-animate-zoom" style={{padding:'0px'}} >
                                <img src={tile.image} alt={tile.type}  width='100%' />
                                </div>
                                <GridListTileBar
                                title={tile.type}
                                actionIcon={
                                    <IconButton>
                                        <FaChevronCircleRight color='white' size='10' />
                                    </IconButton>
                                }
                                />
                                </Link>
                            </GridListTile>
                        ))}
                    </GridList>
                    </div>
                </div>
            </div>
        )
    }
}
export default Categories;

