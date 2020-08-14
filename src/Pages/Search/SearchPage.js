import React, { Component } from 'react'
import getCollection from '../../Database/getCollection'
import MyListItem from '../../Components/Home/ListItem'

export class SearchPage extends Component {

    state = {
        classes:null,
        search:""
    }

    //for search input
    updateSearch(event){
        this.setState({search:event.target.value})
        //this.clearFilter()
    }

    componentDidMount(){
        getCollection("Classes").then(snap=>{
            this.setState({classes:snap})
        })
    }

    render() {
        let filteredClass = this.state.classes

        //search by text
        if(this.state.search!=null&&this.state.classes!=null){
            filteredClass = this.state.classes.filter(
                (classes)=>{
                    return classes.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 
                }
            );
        }

        return (
            <div>
                <div className="wrap" style={{position:"sticky",top:"0", zIndex:"1",backgroundColor:"white"}} >
                    <input placeholder="Search classes, courses.." className="home-search-box" onChange={this.updateSearch.bind(this)}  ></input>
                </div>
                <div>
                    {
                        filteredClass&&
                        filteredClass.map(item=>{
                            return(
                                <MyListItem classID={item.id} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default SearchPage
