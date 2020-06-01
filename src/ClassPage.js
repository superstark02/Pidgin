import React, { Fragment } from 'react';
import MyAppBar from './AppComponents/AppBar.js';
import Images from './AppComponents/Images.js';
import ClassList from './ClassComponents/List';
import TopPicks from './AppComponents/topPicks';
import Categories from './AppComponents/categories.js';
import Image from './Images/learning.png'
import Offer from './AppComponents/offers.js';
import AppBarWeb from './AppComponents/AppBarWeb'
import ImageWeb from './AppComponents/ImageWeb'
import SimpleTabs from './Tabs.js';
import { db } from './firebase'
import {Route} from 'react-router-dom'
import './App.css'

class ClassPage extends React.Component{

  render() {
    return (
      <Fragment>
          <div class='responsive'>
            <div style={{maxWidth:'100%',backgroundColor:'#E6E6E6',overflowY:"hidden",overflowX:"hidden"}}>
              <MyAppBar/>
              <Images/>
              <Categories/>
              <TopPicks/>
              <ClassList/>
              <div style={{backgroundColor:'#E6E6E6',paddingTop:'50px'}} >
                <img src={Image} style={{width:'100%',height:'auto',marginBottom:'50px'}} />
              </div>
            </div> 
          </div>
          <div class='' >
            <AppBarWeb/>
            <ImageWeb/>
            <SimpleTabs/>
          </div>
          <Route path='/class/:id'/>
      </Fragment>
    )
  }
}

export default ClassPage;
