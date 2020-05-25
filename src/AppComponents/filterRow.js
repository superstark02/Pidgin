import React from 'react'
import './AppBar.css'
import { Link } from 'react-router-dom';
import {FaSearch,FaFilter} from 'react-icons/fa';

class FilterRow extends React.Component{
    render(){
        return(
            <Link to={{
                pathname:'/search',
            }} >   
            <button style={{backgroundColor:'transparent',padding:'0px 0px',margin:'0px',maxWidth:'100%',textAlign:'left',backgroundColor:'white'}} >
        <div style={{display:'flex',marginTop:'0px',backgroundColor:'white'}} class='filterRow'>
            <div class='filters'>
                <FaFilter size='12' color='rgb(4, 53, 64)' style={{marginTop:'3px',marginRight:'2px'}}/>
                <div class='filtertext'>Filters</div>
            </div>
            <div class='filters'>
                <div class='filtertext'>Age</div>
            </div>
            <div class='filters'>
                <div class='filtertext'>Fees</div>
            </div>
            <div class='filters'>
                <div class='filtertext'>Duration</div>
            </div>
            <div class='filters'>
                <div class='filtertext'>Pidgin Picks</div>
            </div>
            <div class='filters'>
                <div class='filtertext'>Online</div>
            </div>
            <div class='filters'>
                <div class='filtertext'>For Kids</div>
            </div>
            <div class='filters'>
                <div class='filtertext'>Sports</div>
            </div>
            <div class='filters'>
                <div class='filtertext'>Only For Women</div>
            </div>
            <div class='filters'>
                <div class='filtertext'>Fitness</div>
            </div>
        </div>
        </button>
        </Link>
        )
    }
}
export default FilterRow;