import React from 'react'
import {Link} from 'react-router-dom'
import {FaMap} from 'react-icons/fa'
import { db } from '../firebase'
import ButtonBase from '@material-ui/core/ButtonBase/ButtonBase';

class ListItem extends React.Component{
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
        woman:false
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
        var _woman = false
        var _online = false
        var _uid = this.props.uid
        this.setState({uid:_uid})

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

            _woman = snapshot.get('women')
            _online = snapshot.get('online')
            
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

            this.setState({woman:_woman})
            this.setState({online:_online})
        })
    }

    render(){
        return (
                <ButtonBase style={{textAlign:'left',maxWidth:'100%',padding:'0px 5px'}}>
                <div class='item'>
                <Link to={{
                pathname:'/classDisplay',
                state:{
                  docName: this.state.id,
                  name: this.state.name,
                  location: this.state.location,
                  uid: this.state.uid,
                  type: this.state.type,
                  woman: this.state.woman,
                  online: this.state.online,
                  address: this.state.adress
                }
              }}
              >
                  <div class='showImage'>
                    <img src={this.state.i1} height='200px' style={{marginRight:'2px'}}></img>
                    <img src={this.state.i2} height='200px' style={{marginRight:'2px'}}></img>
                    <img src={this.state.i3} height='200px' style={{marginRight:'2px'}}></img>
                  </div>
                </Link>
                  <div style={{display:'flex',position:'absolute',zIndex:'50'}} >
                    <div class='age'>
                      Age: {this.state.age}+
                    </div>
                    <div class='newType' >
                      {this.state.type}
                    </div>
                  </div>
                    <div class='container'>

                  <Link to={{
                    pathname:'/classDisplay',
                    state:{
                      docName: this.state.id,
                      name: this.state.name,
                      location: this.state.location,
                      uid: this.state.uid,
                      type: this.state.type,
                      woman: this.state.woman,
                      online: this.state.online,
                      address: this.state.adress
                    }
                  }}
                  >
                    <div class='name'>{this.state.name}</div>
                  </Link>
                      <div class='map'>
                        <a href={this.state.location}><FaMap size='15'color='#04BFBF' /></a>
                        <div>Map</div>
                        </div>
                    </div>
                    
                    <Link to={{
                      pathname:'/classDisplay',
                      state:{
                        docName: this.state.id,
                        name: this.state.name,
                        location: this.state.location,
                        uid: this.state.uid,
                        type: this.state.type,
                        woman: this.state.woman,
                        online: this.state.online,
                        address: this.state.adress
                      }
                    }}
                    >
                      <div class='type'>
                        {this.state.adress}
                      </div>
                      <hr color='#E6E6E6'></hr>
                      <div class='fees'>
                        <div>Starting Fees  &#8377;{this.state.fees}</div>
                      </div>
                    </Link>
                    
                </div>
                </ButtonBase> 
        )
    }
}
export default ListItem;