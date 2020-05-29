import React from 'react'
import {db} from '../firebase'
import './topPicks.css'
import ReactAvatar from 'react-avatar';
import {FaStar } from 'react-icons/fa';
import ribbon from '../Images/ribbon.png'
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { ButtonBase } from '@material-ui/core';

class TopPicks extends React.Component{
    state = {
        images:null
      }

      componentDidMount(){
        const data = db.collection('ImagesClassesTopPicks');    
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
            return(
                <div class='responsive'>
                <div class='topPicks'>
                    <div style={{paddingTop:'2px',marginRight:'5px'}}>
                        <FaStar color='#043540' style={{marginTop:'0px'}}/>
                        </div>
                    Top Picks
                </div>
                <div class='containerTop'>

                <div class='avatarTop'>
                    <Skeleton variant="circle" animation="wave"  width={60} height={60} />
                </div>
                <div class='namePick'><Typography variant="body2">
                        <Skeleton animation="wave"/>
                    </Typography>
                </div>

                <div class='avatarTop'>
                    <Skeleton variant="circle" animation="wave"  width={60} height={60} />
                </div>
                <div class='namePick'><Typography variant="body2">
                        <Skeleton animation="wave"/>
                    </Typography>
                </div>

                <div class='avatarTop'>
                    <Skeleton variant="circle" animation="wave"  width={60} height={60} />
                </div>
                <div class='namePick'><Typography variant="body2">
                        <Skeleton animation="wave"/>
                    </Typography>
                </div>
                            
                <div style={{width:'30px'}} />
                </div>
            </div>
            )
        }
        return(
            <div class='responsive'>
                <div class='topPicks'>
                    <div style={{paddingTop:'2px',marginRight:'5px'}}>
                        <FaStar color='#043540' style={{marginTop:'0px'}}/>
                        </div>
                    Top Picks
                </div>
                <div class='containerTop'>
                {
                          this.state.images&&
                          this.state.images.map(images=>{
                            return(
                                <ButtonBase>
                                <Link to={{
                                    pathname:'/classDisplay',
                                    state:{
                                        docName: images.id,
                                        name: images.name,
                                        type:images.type,
                                        address:images.adress,
                                    }
                                }} >
                                   
                                    <div class='avatarTop'>
                                        <ReactAvatar src={images.image} size='60' class='avatar' round='50%' style={{zIndex:'-100'}}/>
                                    </div>
                                    <div class='ribbon'>{images.type}</div>
                                    <div class='namePick'>{images.name}</div>
                                </Link>
                                </ButtonBase>
                            )
                          })
                }
                <div style={{width:'30px'}} />
                </div>
            </div>
        )
    }
}
export default TopPicks;