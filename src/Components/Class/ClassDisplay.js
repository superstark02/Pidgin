import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { db} from '../../firebase'
import Skeleton from '@material-ui/lab/Skeleton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Loading from '../Loading';
import Features from './ClassDisplay/features';
import Eligibilty from './ClassDisplay/eligibility';
import Courses from './ClassDisplay/courses';
import Faculty from './ClassDisplay/faculty';
import Note from './ClassDisplay/note';
import '../../CSS/Components/Class/ClassDisplay.css'

var name

class ClassesDisplay extends React.Component {

  state = {
    name: null,
    images: null,
    eligibility: null,
    qualifications: null,
    note: null,
    courses: null,
    offers: null,
    branches: null,
    age: null,
    id: '',
    woman: false,
    online: false,
    address: '',
    type: '',
    location: "",
    courseLength:0,
    loading: false,
  }

  componentDidMount() {
    name = this.props.match.params.id;
    this.setState({ id: name })

    this.setState({ loading: true })
    setInterval(() => { this.setState({ loading: false }) }, 1000);

    const data = db.collection('Classes').doc(name);
    data.get()
      .then(snapshot => {
        this.setState({ name: snapshot.get('name') })
        this.setState({ age: snapshot.get('age') })
        this.setState({ woman: snapshot.get('woman') })
        this.setState({ online: snapshot.get('online') })
        this.setState({ address: snapshot.get('address') })
        this.setState({ type: snapshot.get('type') })
        this.setState({ location: snapshot.get('location') })
      })

    const images = db.collection('Classes').doc(name).collection('Images');
    images.get()
      .then(snapshot => {
        const images = []
        snapshot.forEach(doc => {
          const data = doc.data()
          images.push(data)
        })
        this.setState({ images: images })
      })

    const eligibility = db.collection('Classes').doc(name).collection('Eligibility');
    eligibility.get()
      .then(snapshot => {
        const eligibility = []
        snapshot.forEach(doc => {
          const data = doc.data()
          eligibility.push(data)
        })
        this.setState({ eligibility: eligibility })
      })

    const qualifications = db.collection('Classes').doc(name).collection('Qualifications');
    qualifications.get()
      .then(snapshot => {
        const qualifications = []
        snapshot.forEach(doc => {
          const data = doc.data()
          qualifications.push(data)
        })
        this.setState({ qualifications: qualifications })
      })

    const note = db.collection('Classes').doc(name).collection('Note');
    note.get()
      .then(snapshot => {
        const note = []
        snapshot.forEach(doc => {
          const data = doc.data()
          note.push(data)
        })
        this.setState({ note: note })
      })

    const courses = db.collection('Classes').doc(name).collection('Courses');
    const add = db.collection('Classes').doc(name).collection('Courses');
    courses.get()
      .then(snapshot => {
        const courses = []
        const length = snapshot.size
        snapshot.forEach(doc => {
          const data = doc.data()
          add.doc(doc.id).update({ id: doc.id })
          courses.push(data)
        })
        this.setState({ courses: courses })
        this.setState({ courseLength: length })
      })

    const offers = db.collection('Classes').doc(name).collection('Offers');
    offers.get()
      .then(snapshot => {
        const offers = []
        snapshot.forEach(doc => {
          const data = doc.data()
          offers.push(data)
        })
        this.setState({ offers: offers })
      })

    const branches = db.collection('Classes').doc(name).collection('Branches');
    branches.get()
      .then(snapshot => {
        const offers = []
        snapshot.forEach(doc => {
          const data = doc.data()
          offers.push(data)
        })
        this.setState({ branches: offers })
      })
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }

    return (
      <div style={{ backgroundColor: 'white', position: 'absolute', zIndex: '300', maxWidth: '100%', width: '100%' }}>
        <div class='overlayContainer'>

          <div class='carouselContainer' style={{ height: '250px' }} >
            {
              this.state.images &&
              this.state.images.map(image => {
                if (image == null) {
                  return (
                    <Skeleton variant="rect" width={210} height={250} />
                  )
                }
                else {
                  return (
                    <div class="w3-animate-zoom"><img src={image.item} height='250px' width='auto' class='imageCarousel' /></div>
                  )
                }
              })
            }
          </div>

          <div class='overlayBlack' >
            <div onClick={this.props.history.goBack}><ArrowBackIcon fontSize='10px' style={{ margin: '15px' }} /></div>
          </div>
        </div>

        <div>
          <div class='displayTitle'>
            {this.state.name}
            <div class='mapIcon'>
              <a href={this.state.location} ><FaMapMarkerAlt color='#043540' /></a>
              <div style={{ fontSize: '10px' }} >Map</div>
            </div>
          </div>
        </div>

        <div class='class-display-address'>
          <div>{this.state.address}</div>
          <div style={{ display: 'flex' }} >
            <div class='displayAge'>
              Age: {this.state.age}+
            </div>
            <div class='displayType' >
              {this.state.type}
            </div>
          </div>
          <Divider />
        </div>

        <div class='carouselContainer'>
          {
            this.state.offers &&
            this.state.offers.map(offers => {
              return (
                <div class='offers' style={{ backgroundColor: '#FFFF' }}>
                  <div style={{ marginLeft: '30px' }} >{offers.title}</div>
                  <div style={{ marginLeft: '30px', marginTop: '5px', whiteSpace: 'normal', fontSize: '10px' }} >{offers.detail}</div>
                </div>
              )
            })
          }
        </div>

        <List subheader={<li />}>
          <Features women={this.state.woman} online={this.state.online} />

          <Eligibilty eligibility={this.state.eligibility} />

          <Courses courses={this.state.courses} courseLength={this.state.courseLength} id={this.state.id} />

          <Faculty qualifications={this.state.qualifications} />

          <Note note={this.state.note} />

          <div style={{ width: '100%', textAlign: 'center', color: 'lightgrey', fontSize: '10px', marginBottom: '10px' }} >
            Pidgin
          </div>
        </List>
        <div style={{ height: '60px' }} />
      </div>
    )
  }
}
export default ClassesDisplay;
