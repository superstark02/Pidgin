import React, { Fragment } from 'react'
import {FaSearch,FaFilter} from 'react-icons/fa';
import './AppBar.css'
import { Link } from 'react-router-dom';

class MyAppBar extends React.Component{

    render() {
        return (
          <Fragment>
              <div class='title'>
                <div class='orange'>
                    <div style={{marginBottom:'20px',fontSize:'20px'}}>
                        CLASSES
                    </div>
                    <Link to={{
                        pathname:'/search',
                        uid: this.props.uid,
                    }} >
                    <div class='searchBar'> 
                        <div styl={{marginRight:'4px'}}><FaSearch size='15' color='#043540' /></div>
                        <div class='hint'>Search music, art, gyms....</div>
                    </div>
                
                    </Link>
                </div>
            </div>
          </Fragment>
        )
    }
}
export default MyAppBar;