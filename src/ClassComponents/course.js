import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { db } from '../firebase'
import { Box } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



var cartButton;
export default class Course extends React.Component {

    state = {
        details: null,
        image: "",
        price: "",
        title: "",
        name: "",
        open: false,
        phone: '',
        device: '',
        id: '',
    }

    componentDidMount() {
        var docId = this.props.location.state.courseId
        var id = this.props.location.state.classId

        const phone = this.props.location.state.phone
        this.setState({ phone: phone })

        const timestamp = Date.now()
        var time = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp)
        this.setState({ time: time })

        const classes = db.collection('Classes').doc(id)
        classes.get().then(snapshot => {
            this.setState({ name: snapshot.get("name") })
        })

        const course = db.collection('Classes').doc(id).collection('Courses').doc(docId)
        course.get()
            .then(snapshot => {
                this.setState({ title: snapshot.get("title") })
                this.setState({ price: snapshot.get("price") })
                this.setState({ image: snapshot.get("image") })
                this.setState({ id: snapshot.get("id") })
            })

        const note = db.collection('Classes').doc(id).collection('Courses').doc(docId).collection('details')
        note.get()
            .then(snapshot => {
                const details = []
                snapshot.forEach(doc => {
                    const data = doc.data()
                    details.push(data)
                })
                this.setState({ details: details })
            })
    }

    render() {
        return (
            <div style={{ position: 'absolute', top: '0', zIndex: '500', maxWidth: '100%', width: '100%', minHeight: '100%', backgroundColor: 'white' }} >
                <Box boxShadow={3} style={{ width: '100%' }} >
                    <div style={{ display: 'flex', alignContent: 'center', padding: '15px', width: '100%' }} >
                        <FaArrowLeft color='#043540' size='14' style={{ marginTop: '5px', marginRight: '15px' }} onClick={this.props.history.goBack} />
                        <div class='titleC' >{this.state.title}</div>
                    </div>
                </Box>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', minHeight: '60%', marginTop: '10px', padding: '20px' }} >
                    <img alt="s" src={this.state.image} style={{ borderRadius: '5%', maxWidth: '100%', width: '60%' }} />
                </div>

                <div style={{ backgroundColor: 'white', width: '100%', padding: '10px', minHeight: '90%' }}>
                    <hr color='#043540' size='4' ></hr>
                    <div style={{ fontFamily: 'FiraSans' }} >What you will learn...</div>
                    <div style={{ padding: '10px', fontSize: '12px' }} >
                        {
                            this.state.details &&
                            this.state.details.map(details => {
                                return (
                                    <div style={{ margin: '5px 0px', fontFamily: 'FiraSans', minHeight: '10px' }} >{details.item}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <div style={{ padding: '10px', width: '100%', color: 'grey', fontSize: '10px', textAlign: 'center', backgroundColor: 'white' }} >
                    Pidgin
                </div>

                <div style={{ height: '60px' }} />
            </div>
        )
    }
}
