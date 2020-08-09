import React, { Component } from 'react'
import getCollection from '../../Database/getCollection'
import Skeleton from '@material-ui/lab/Skeleton';
import '../../CSS/Components/Home/Categories.css'

export class Categories extends Component {

    state = {
        images: null
    }

    componentDidMount() {
        getCollection("ImagesClassesTrending").then(result => {
            this.setState({ images: result })
        })
    }

    render() {

        while (this.state.images == null) {
            return <div>
                <div>
                    <div className="home-heading">
                        Top By Categories
                    </div>
                    <div className="wrap" style={{flexWrap:"wrap"}}  >
                        <div class='home-categories-box'> <Skeleton animation="wave" height={100} variant="rect" width={100} /> </div>
                        <div class='home-categories-box'> <Skeleton animation="wave" height={100} variant="rect" width={100} /> </div>
                        <div class='home-categories-box'> <Skeleton animation="wave" height={100} variant="rect" width={100} /> </div>
                        <div class='home-categories-box'> <Skeleton animation="wave" height={100} variant="rect" width={100} /> </div>
                        <div class='home-categories-box'> <Skeleton animation="wave" height={100} variant="rect" width={100} /> </div>
                        <div class='home-categories-box'> <Skeleton animation="wave" height={100} variant="rect" width={100} /> </div>
                    </div>
                </div>
            </div>
        }

        return (
            <div>
                <div>
                    <div className="home-heading">
                        Top By Categories
                    </div>
                    <div className="wrap" style={{flexWrap:"wrap"}} >
                        {
                            this.state.images&&
                            this.state.images.map(item=>{
                                return (
                                    <div class='home-categories-box' >
                                        <div className="categories-label" >
                                            {item.type}
                                        </div>
                                        <img src={item.image} className="home-categories-image"  ></img>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Categories
