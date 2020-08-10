import React, { Component } from 'react'
import MyAppBar from '../../Components/NavBar'
import SimpleBottomNavigation from '../../Components/BottomNavBar'
import '../../CSS/Pages/Home.css'
import Categories from '../../Components/Home/Categories'
import TopPicks from '../../Components/Home/TopPicks'
import ClassList from '../../Components/Home/ClassList'

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
                <MyAppBar />
                <Categories />
                <TopPicks />
                <ClassList />
                <SimpleBottomNavigation/>
            </div>
        )
    }
}

export default HomePage
