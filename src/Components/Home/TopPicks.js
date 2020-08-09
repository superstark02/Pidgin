import React from 'react'
import { db } from '../../firebase'
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { ButtonBase, Box, Divider } from '@material-ui/core';
import '../../CSS/Components/Home/TopPicks.css'

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
                    <div className="home-heading">
                        Top Picks
                    </div>
                    <div class='wrap'>

                        <div class='avatarTop'  style={{margin:"10px"}} >
                            <Skeleton variant="circle" animation="wave" width={60} height={60} />
                        </div>

                        <div class='avatarTop' style={{margin:"10px"}} >
                            <Skeleton variant="circle" animation="wave" width={60} height={60} />
                        </div>

                        <div class='avatarTop'style={{margin:"10px"}} >
                            <Skeleton variant="circle" animation="wave" width={60} height={60} />
                        </div>

                        <div style={{ width: '30px' }} />
                    </div>
                </div>
            )
        }
        return (
            <div class='responsive'>
                <div className="home-heading">
                    Top Picks
                </div>
                <div class='containerTop'>
                    {
                        this.state.images &&
                        this.state.images.map(item => {
                            return (
                                <ButtonBase>
                                    <div className="top-picks-item" >
                                        <div>
                                            <img src={item.image} className="top-picks-image" ></img>
                                        </div>
                                        <div className="top-picks-name" >
                                            {item.name}
                                        </div>
                                        <div className="top-picks-type" >
                                            {item.type}
                                        </div>
                                    </div>
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