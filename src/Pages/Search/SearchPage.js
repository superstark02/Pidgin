import React, { Component } from 'react'
import SimpleBottomNavigation from '../../Components/BottomNavBar'

export class SearchPage extends Component {
    render() {
        return (
            <div>
                <div className="wrap" >
                    <input placeholder="Search classes, courses.." className="home-search-box" ></input>
                </div>
            </div>
        )
    }
}

export default SearchPage
