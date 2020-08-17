import React from 'react'
import { Link } from 'react-router-dom'
import { FaMap } from 'react-icons/fa'
import { db } from '../../firebase'
import ButtonBase from '@material-ui/core/ButtonBase/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { FaDownload } from 'react-icons/fa'
import Box from '@material-ui/core/Box';


class MyListItem extends React.Component {
  state = {
    name: '',
    type: '',
    adress: '',
    location: '',
    fees: '',
    age: '',
    i1: '',
    i2: '',
    i3: '',
    id: '',
    fakePrice: '',
    uid: '',
    brached: false
  }

  constructor() {
    super()
    this.handleLike = this.handleLike.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = () => {
    window.Android.openFragment(this.state.id)
  }

  handleLike = ({ id, name }) => {
    if (this.props.uid != null) {
      db.collection("Users").doc(this.props.uid).collection("Liked").doc(this.state.id).set({ id: this.state.id, name: this.state.name })
    }
    else {
      console.log('Sign In')
    }
  }

  componentDidMount() {
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
    var _fakePrice = ""

    data.get().then(snapshot => {

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
      _fakePrice = snapshot.get('fakePrice')

      this.setState({ name: _name })
      this.setState({ type: _type })
      this.setState({ adress: _adress })
      this.setState({ fees: _fees })
      this.setState({ location: _location })
      this.setState({ i1: _i1 })
      this.setState({ i2: _i2 })
      this.setState({ i3: _i3 })
      this.setState({ age: _age })
      this.setState({ id: _id })
      this.setState({ fakePrice: _fakePrice })
    })
  }

  render() {
    if (this.state.name == null || this.state.type == null) {
      return (
        <div>
          <div style={{ backgroundColor: '#E6E6E6' }}>
            <div class='number'><FaDownload size='12' style={{ marginRight: '5px' }} /> Please Wait...</div>
            <div style={{ padding: '5px', maxWidth: '100%' }} >
              <div style={{ borderRadius: '10px', backgroundColor: 'white', padding: '20px' }} >
                <Skeleton variant="rect" width="100%" height={200} />
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
      <div class="animated fadeIn">
        <ButtonBase className="wrap" style={{flexDirection:"column"}} >
          <div class='item'>
            <Box boxShadow={3} style={{ paddingBottom: '10px', borderRadius: '5px' }} >
              <Link to={{
                pathname: '/classDisplay',
                state: {
                  classId: this.state.id
                }
              }} >
                <div class='showImage'>
                  {this.state.i1 ? (
                    <div class='alternateImg' >
                        <img src={this.state.i1} height='100%' style={{ marginRight: '2px' }}></img>
                        <img src={this.state.i2} height='100%' style={{ marginRight: '2px' }}></img>
                        <img src={this.state.i3} height='100%' style={{ marginRight: '2px' }}></img>
                    </div>
                  ) : (
                      <div style={{width:'100%',height:'55vw',display:'flex',justifyContent:'space-around',alignItems:'center'}} >
                        <img src={this.state.i2}  height='100%' ></img>
                      </div>
                    )}
                </div>

                <div style={{ display: 'flex', position: 'absolute', zIndex: '50' }} >
                  <div class='age'>
                    Age: {this.state.age}+
                      </div>
                  <div class='newType' >
                    {this.state.type}
                  </div>
                </div>
              </Link>
              <div class='container'>

                <Link to={"/class-display/"+this.state.id}>
                  <div class='name'>{this.state.name}</div>
                </Link>

                <div class='map'>
                  <div>
                    <div><a href={this.state.location}><FaMap size='15' color='#04BFBF' /></a></div>
                    <div>Map</div>
                  </div>
                </div>

              </div>

              <Link to={"/classDisplay/"+this.state.id}>
                <div class='type' style={{fontFamily:"Thin"}} >
                  {this.state.adress}
                </div>
                <hr color='#E6E6E6' style={{ margin: '5px 0px' }} ></hr>
                <div class='fees'>
                  <div>Starting Fees &#8377;{this.state.fees}</div>
                </div>
              </Link>
            </Box>
          </div>
        </ButtonBase>
      </div>
    )
  }
}
export default MyListItem;