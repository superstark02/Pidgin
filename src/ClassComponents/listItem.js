import React from 'react'
import {Link} from 'react-router-dom'
import {FaMap} from 'react-icons/fa'
import { db } from '../firebase'
import ButtonBase from '@material-ui/core/ButtonBase/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import {FaThumbsUp, FaDownload,} from 'react-icons/fa' 
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);


class MyListItem extends React.Component{
    state = {
        name:'',
        type:'',
        adress:'',
        location:'',
        fees:'',
        age:'',
        i1:'',
        i2:'',
        i3:'',
        id:'',
        uid:'',
    }

    constructor(){
      super()
      this.handleLike = this.handleLike.bind(this)
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange = () => {
      window.Android.openFragment(this.state.id)
    }

    handleLike = ({id,name}) => {
        if(this.props.uid!=null){
          db.collection("Users").doc(this.props.uid).collection("Liked").doc(this.state.id).set({id:this.state.id, name:this.state.name})
        }
        else{
          console.log('Sign In')
        }
    }

    componentDidMount(){
        const data = db.collection('Classes').doc(this.props.classID)
        var _name = ""
        var _type = ""
        var _adress = ""
        var _location = ""
        var _fees = ""
        var _i1 = ""
        var _i2 = ""
        var _i3 = ""
        var _id = ""
        var _age = ""

        data.get().then(snapshot=>{
            _name = snapshot.get('name')
            _type = snapshot.get('type')
            _adress = snapshot.get('address')
            _location = snapshot.get('location')
            _fees = snapshot.get('fees')
            _age = snapshot.get('age')
            _i1 = snapshot.get('i1')
            _i2 = snapshot.get('i2')
            _i3 = snapshot.get('i3')
            _id = snapshot.get('id')
            
            this.setState({name:_name})
            this.setState({type:_type})
            this.setState({adress:_adress})
            this.setState({fees:_fees})
            this.setState({location:_location})
            this.setState({i1:_i1})
            this.setState({i2:_i2})
            this.setState({i3:_i3})
            this.setState({age:_age})
            this.setState({id:_id})
        })
    }

    render(){
      if(this.state.name==null||this.state.type==null){
        return(
          <div>
            <div style={{backgroundColor:'#E6E6E6'}}>
                <div class='number'><FaDownload size='12' style={{marginRight:'5px'}}/> Please Wait...</div>
                  <div style={{padding:'5px',maxWidth:'100%'}} >
                    <div style={{borderRadius:'10px',backgroundColor:'white',padding:'20px'}} >
                      <Skeleton variant="rect" width="100%" height={200}  />
                      <Typography variant="h3">
                        <Skeleton />
                      </Typography>
                      <Typography variant="h5">
                        <Skeleton />
                      </Typography>
                    </div>
                  </div>
              </div>
          </div>
        )
      }
        return (
              <div class="w3-animate-zoom">
                <ButtonBase style={{textAlign:'left',maxWidth:'100%',width:'100%',padding:'0px 5px'}}>
                  <div class='item'>

                    <div class='showImage' onClick={this.handleChange}>
                    {this.state.i1 ? (
                      <div class='alternateImg' ><img src={this.state.i1} height='200px' style={{marginRight:'2px'}}></img></div>
                    ) : (
                      <div><Skeleton variant="rect" width="100%" height={200}  /></div>
                    )}
                      <img src={this.state.i2} height='200px' style={{marginRight:'2px'}}></img>
                      <img src={this.state.i3} height='200px' style={{marginRight:'2px'}}></img>
                    </div>

                    <div style={{display:'flex',position:'absolute',zIndex:'50'}} >
                      <div class='age'>
                        Age: {this.state.age}+
                      </div>
                      <div class='newType' >
                        {this.state.type}
                      </div>
                    </div>

                    <div class='container'>

                      <div class='name' onClick={this.handleChange} >{this.state.name}</div>

                      <div class='map'>

                        <div>
                          {/*<div style={{marginTop:'2px',marginRight:'10px'}} onClick={()=>this.handleLike(this.state.id,this.state.name)} >
                              <StyledRating
                                defaultValue={0}
                                precision={1}
                                max={1}
                                icon={<FavoriteIcon fontSize="inherit" />}
                              />
                          </div>*/}
                        </div>
                        <div>
                          <div><a href={this.state.location}><FaMap size='15'color='#04BFBF'/></a></div>
                          <div>Map</div>
                        </div>

                      </div>
                    </div>
                        
                    
                    <div class='type' onClick={this.handleChange}>
                      {this.state.adress}
                    </div>
                    <hr color='#E6E6E6' style={{margin:'5px 0px'}} ></hr>
                    <div class='fees'>
                      <div onClick={this.handleChange} >Starting Fees  &#8377;{this.state.fees}</div>
                    </div>
                        
                  </div>
                  </ButtonBase> 
                </div>
        )
    }
}
export default MyListItem;