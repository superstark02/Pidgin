import React from 'react';
import {FaThumbsUp,} from 'react-icons/fa'  
import {rdb} from '../firebase'
import './list.css'
import ListItemWeb from './listItemWeb';

var length;
var lat
  class ClassListWeb extends React.Component{
    state = {
        classes:null,
        name:"null",
        latitude:0,
        longitude:0,
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

        var userId = 'Location'
        const d = rdb.ref().child(userId);    
        d.on('value',(snapshot)=>{
          var words = snapshot.val();
          length = snapshot.numChildren()
          var newState = [];
          console.log(words)
          for(var i = 0; i<length-1; i++){
            for(var j = 0; j <length-1-i; j++){
              var distance1 = this.calculateDistance(this.state.latitude, this.state.longitude, words[j].lat, words[j].lon)
              var distance2 = this.calculateDistance(this.state.latitude, this.state.longitude, words[j+1].lat, words[j+1].lon)
              if(distance1>distance2){
                var temp = words[j]
                words[j] = words[j+1]
                words[j+1] = temp 
              }
            }
            newState.push({id: words[i].id});
          }
          this.setState({words:newState})
        });
      }
      
      render(){
        if(this.state.latitude == 0||this.state.words==null){
          return <div></div>
        }
        else{
          return(
            <div>
            <div class='number'><FaThumbsUp size='12' style={{marginRight:'5px'}}/> Found {length} Pidgin classes around you.</div>
              <div style={{padding:'0px 20px'}}>
                      {  
                         this.state.words.map(images=>{
                          return <ListItemWeb classID={images.id} uid={this.props.userId} />
                        })
                      }
                     
                </div>
          </div>
        )
        }
      }
  }
  export default ClassListWeb;