import React from 'react';
import {FaThumbsUp, FaDownload,} from 'react-icons/fa'  
import {rdb} from '../../firebase'
import '../../CSS/Components/Home/ClassList.css'
import MyListItem from './ListItem';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

var length;

class ClassList extends React.Component{
  state = {
      classes:null,
      name:"null",
      latitude:0,
      longitude:0,
      word:null,
    }
    
    constructor(props){
      super(props);
      this.state = {
        words: [],
      }
    }

    position = async () => {
      await navigator.geolocation.getCurrentPosition(
        position => this.setState({ 
          latitude: position.coords.latitude, 
          longitude: position.coords.longitude
        }), 
        err => console.log(err)
      );
    }

    calculateDistance(lat1, lon1, lat2, lon2){
      var p = 0.017453292519943295;
      var c = Math.cos;
      var asin = Math.asin
      var sqrt = Math.sqrt
      var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
      return 12742 * asin(sqrt(a));
    }

    componentDidMount(){
      this.position();

      const d = rdb.ref().child('Location');    
      d.on('value',(snapshot)=>{
        var words = snapshot.val();
        this.setState({word:words})

        length = snapshot.numChildren()
        this.setState({length:length})
        var newState = [];
        for(let word in words){
          newState.push({id:words[word].id})
      }

        this.setState({words:newState})
      });
      
    }
    
    render(){
      if(length==null){
        return <div>
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
      }
      else{
        return(
          <div>
            <div style={{backgroundColor:'white'}}>
                <div class='number'><FaThumbsUp size='12' style={{marginRight:'5px'}}/> Found {length} Pidgin classes around you.</div>
                    {  
                        this.state.words.map(images=>{
                        return <MyListItem classID={images.id}/>
                      })
                    }  
              </div>
        </div>
      )
      }
    }
}
export default ClassList;