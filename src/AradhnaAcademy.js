import React, { Component } from 'react';
import './App.css';
import ReactAvatar from 'react-avatar';
import { 
  BrowserRouter as Router, 
} from 'react-router-dom'; 

var classes = "4/week";
var fees = "400";
var experience = "9+years";
var bigImage = "https://images.squarespace-cdn.com/content/v1/5ab9973bb27e39b76daabe83/1522280199379-5O2J8945JELY7KP3RF2F/ke17ZwdGBToddI8pDm48kDEDYh4Y0JGhR6hzuwcJ44gUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcz6bs2FkMoqlrQIzq4g5ogDqXr_T7rMikH_TfPkEE4wwzGwe9KEhUq6A0DxOZf-75/IMG-20180328-WA0003.jpg";
var profileImage = "https://lh3.googleusercontent.com/vgri32g-8ws1gehCfZISdVqim1AaSeyeNEnDwN1ulO9_-XSv1BQel-j8eMLyhdxAgBmD=s180-rw";

export default function AradhnaAcademy(){
    return (
        <Router>
        <div class="App">
          <div class="wallpaper">
            <img src={bigImage} alt="Avatar" class="image"/>
            <div class="overlay" >
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


