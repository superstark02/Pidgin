import React from 'react';
import './App.css';
import ReactAvatar from 'react-avatar';
import { 
  BrowserRouter as Router, 
} from 'react-router-dom'; 

var classes = "4/week";
var fees = "400";
var experience = "9+years";
var bigImage = "https://i2.wp.com/www.cabotcheese.coop/blog/wp-content/uploads/2019/05/classroom.jpg?resize=1125%2C1125&ssl=1";
var profileImage = "https://png.pngtree.com/png-clipart/20190904/original/pngtree-tuition-student-training-png-png-image_4475238.jpg";

function VishalInstitute() {

  return (
    <Router>
    <div class="App">
      <div class="wallpaper">
        <img src={bigImage} alt="Avatar" class="image"/>
        <div class="overlay">
          <div class="avatar">
          <ReactAvatar src={profileImage} round="50%" size="150"/>
          </div>
        </div>
      </div>
      <div class="details">
        <table class="table">
          <tr class="tr">
            <th class="th">{classes}</th>
            <th class="th">{fees}</th>
            <th class="th">{experience}</th>
          </tr>
          <tr>
            <td align="center">Classes</td>
            <td align="center">Fees</td>
            <td align="center">Experience</td>
          </tr>
        </table>
      </div>

      <div class="container">
          <div class="head">General</div>
          <div class="info">
            <div class="field">Age</div>
            <div class="attribute">Any</div>
          </div>
          <div class="info">
            <div class="field">Type</div>
            <div class="attribute">Dance, Music</div>
          </div>
          <div class="info">
            <div class="field">Duration</div>
            <div class="attribute">1hr/day</div>
          </div>
          <div class="head">Wall of Fame</div>
          
          <div class="head">Qualifications</div>
          <div class="head">Eligibility</div>
          <div class="head">Vision and Mission</div>
	    </div>

    </div>
    </Router>
  );
}

export default VishalInstitute;
