import React from 'react'
import { db } from '../firebase'
import './topPicks.css'
import ReactAvatar from 'react-avatar';
import { FaStar, FaChevronRight } from 'react-icons/fa';
import ribbon from '../Images/ribbon.png'
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { ButtonBase, Box, Divider } from '@material-ui/core';
import topPicks from '../Images/quality (2).png'

class TopPicks extends React.Component {
    state = {
        images: null
    }

    componentDidMount() {
        const data = db.collection('ImagesClassesTopPicks');
        data.get()
            .then(snapshot => {
                const images = []
                snapshot.forEach(doc => {
                    const data = doc.data()
                    images.push(data)
                })
                this.setState({ images: images })
            })
    }


    render() {
        if (this.state.images == null) {
            return (
                <div class='responsive'>
                    <div class='topPicks'>
                        <img src={topPicks} height='20px' width='20px' style={{ marginTop: '3px', marginLeft: '-10px', marginRight: '10px' }} />Top Picks
                </div>
                    <div class='containerTop'>

                        <div class='avatarTop'>
                            <Skeleton variant="circle" animation="wave" width={60} height={60} />
                        </div>
                        <div class='namePick'><Typography variant="body2">
                            <Skeleton animation="wave" />
                        </Typography>
                        </div>

                        <div class='avatarTop'>
                            <Skeleton variant="circle" animation="wave" width={60} height={60} />
                        </div>
                        <div class='namePick'><Typography variant="body2">
                            <Skeleton animation="wave" />
                        </Typography>
                        </div>

                        <div class='avatarTop'>
                            <Skeleton variant="circle" animation="wave" width={60} height={60} />
                        </div>
                        <div class='namePick'><Typography variant="body2">
                            <Skeleton animation="wave" />
                        </Typography>
                        </div>

                        <div style={{ width: '30px' }} />
                    </div>
                </div>
            )
        }
        return (
            <div class='responsive'>
                <div class='topPicks'>
                    <img src={topPicks} height='20px' width='20px' style={{ marginTop: '3px', marginLeft: '-10px', marginRight: '10px' }} /> Top Picks
                </div>
                <div class='containerTop'>
                    {
                        this.state.images &&
                        this.state.images.map(images => {
                            return (
                                <ButtonBase>
                                    <Link to={{
                                        pathname:'/classDisplay',
                                        state:{
                                            classId:images.id
                                        }
                                    }}>
                                    <Box boxShadow={1}
                                        style={{ width: '250px', height: '100px', marginRight: '25px', backgroundColor: 'white', borderRadius: '5px', display: 'flex' }}>
                                        <div>
                                            <Box boxShadow={3} >
                                                <img src={images.image} width='100px' height='100px'
                                                    style={{ marginLeft: '-10px', marginTop: '-10px', backgroundColor: 'white', borderRadius: '10px' }} />
                                            </Box>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '100%' }} >
                                            <div style={{ padding: '6px', color: '#043540', fontFamily: 'FiraSans' }} >
                                                {images.name}
                                            </div>

                                            <div style={{ width: '100%', fontSize: '10px' }} >
                                                <Divider />
                                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', alignContent: 'center' }} >
                                                    <div>{images.type}</div>
                                                    <div><FaChevronRight size='10' style={{ marginTop: '5px' }} /></div>
                                                </div>
                                            </div>
                                        </div>
                                    </Box>
                                    </Link>
                                </ButtonBase>
                            )
                        })
                    }
                    <div style={{ width: '30px' }} />
                </div>
            </div>
        )
    }
}
export default TopPicks;