import React from 'react'
import {db} from '../firebase'
import './topPicks.css'
import ReactAvatar from 'react-avatar';
import {FaStar } from 'react-icons/fa';
import ribbon from '../Images/ribbon.png'
import { Link } from 'react-router-dom';

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
                                <Link to={{
                                    pathname:'/classDisplay',
                                    state:{
                                        docName: images.id,
                                        name: images.name,
                                        type:images.type,
                                        address:images.adress,
                                    }
                                }} >
                                    <button style={{backgroundColor:'transparent',padding:'7px 3px',margin:'0px',maxWidth:'100%',textAlign:'left'}} >
                                    <div class='avatarTop'>
                                        <ReactAvatar src={images.image} size='60' class='avatar' round='50%' style={{zIndex:'-100'}}/>
                                    </div>
                                    <div class='ribbon'>{images.type}</div>
                                    <div class='namePick'>{images.name}</div>
                                    </button>
                                </Link>
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