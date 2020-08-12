import React, { Component } from 'react'
import MyAppBar from '../../Components/NavBar'
import SimpleBottomNavigation from '../../Components/BottomNavBar'
import '../../CSS/Pages/Home.css'
import Categories from '../../Components/Home/Categories'
import TopPicks from '../../Components/Home/TopPicks'
import ClassList from '../../Components/Home/ClassList'
import SearchPage from '../Search/SearchPage'

export class HomePage extends Component {

    state = {
        page: "Home"
    }

    changePage = (newPage) => {
        this.setState({ page: newPage })
    }

    render() {
        return (
            <div>
                <div style={{position:"absolute",top:"0",width:"100%",minHeight:"100vh"}} >
                {
                    this.state.page === "Home" ? (
                        <div>
                            
                        </div>
                    ): this.state.page === 'Search' ? (
                        <div>
                            <SearchPage/>
                        </div>
                    ) : (
                        <div></div>
                    )
                }
                </div>
                <SimpleBottomNavigation changePage={this.changePage} />
            </div>
        )
    }
}

export default HomePage
