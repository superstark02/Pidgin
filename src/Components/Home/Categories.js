import React, { Component } from 'react'
import getCollection from '../../Database/getCollection'
import Skeleton from '@material-ui/lab/Skeleton';

export class Categories extends Component {

    state = {
        images:null
    }

    componentDidMount(){
        getCollection("ImagesClassesTrending").then(result=>{
            this.setState({images:result})
        })
    }

    render() {

        while(this.state.images == null){
            return <div>
            <div>
                <div class='topCat'>
                    Top By Categories
                </div>
                <div class='containerCat' >
                    <div class='avatarCat' style={{margin:'5px 0px'}} > <Skeleton animation="wave" height={110} variant="rect" width={110} /> </div>
                    <div class='avatarCat' style={{margin:'5px 0px'}} > <Skeleton animation="wave" height={110} variant="rect" width={110} /> </div>
                    <div class='avatarCat' style={{margin:'5px 0px'}} > <Skeleton animation="wave" height={110} variant="rect" width={110} /> </div>
                    <div class='avatarCat' style={{margin:'5px 0px'}} > <Skeleton animation="wave" height={110} variant="rect" width={110} /> </div>
                    <div class='avatarCat' style={{margin:'5px 0px'}} > <Skeleton animation="wave" height={110} variant="rect" width={110} /> </div>
                    <div class='avatarCat' style={{margin:'5px 0px'}} > <Skeleton animation="wave" height={110} variant="rect" width={110} /> </div>
                </div>
            </div>
        </div> 
        }

        return (
            <div>
                
            </div>
        )
    }
}

export default Categories
