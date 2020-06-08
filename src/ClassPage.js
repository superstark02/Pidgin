import React, { Fragment } from 'react';
import MyAppBar from './AppComponents/AppBar.js';
import Images from './AppComponents/Images.js';
import ClassList from './ClassComponents/List';
import TopPicks from './AppComponents/topPicks';
import Categories from './AppComponents/categories.js';
import Image from './Images/learning.png'
import Offer from './AppComponents/offers.js';
import Badge from '@material-ui/core/Badge';
import AppBarWeb from './AppComponents/AppBarWeb'
import ImageWeb from './AppComponents/ImageWeb'
import SimpleTabs from './Tabs.js';
import {FaShoppingCart } from "react-icons/fa";
import { Frame } from "framer";
import './App.css'
import { withStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import {PullToRefresh} from "react-js-pull-to-refresh";
import {PullDownContent, ReleaseContent, RefreshContent} from "react-js-pull-to-refresh";
import FilterRow from './AppComponents/filterRow'

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

var cart;
class ClassPage extends React.Component{

  render() {
    if(false){
      cart = <Box style={{borderRadius:'50%'}} boxShadow={3} ><Frame
                  animate={{ y: [20,10,5,10,20] }}
                  transition={{ type: 'spring',loop: Infinity, }}
                  background={"#043540"}
                  radius={30}
                  size={50}
                  style={{display:'flex',justifyContent:'space-around',alignItems:'center',padding:'10px'}}
              >
                <Badge
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  style={{color:'white'}}
                  badgeContent={2}
                  color="secondary"
                >
                <FaShoppingCart color="white" size="20px" />
                </Badge>
              </Frame></Box>
    }

    return (
      <Fragment>
          <div class='responsive'>
          <div style={{maxWidth:'100%',overflowY:"hidden",overflowX:"hidden"}}>
          <MyAppBar/>
          
            <Images/>
            <Categories/>
            <FilterRow/>
            <TopPicks/>
            <ClassList/>
            <div style={{position:'fixed',right:'0',bottom:'13%',padding:'55px'}}>
            {cart}
            </div>
          </div> 
          </div>
      </Fragment>
    )
  }
}

export default ClassPage;
