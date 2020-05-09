import React from 'react';
import './App.css';
import AradhnaAcademy from './AradhnaAcademy.js'
import VishalInstitute from './VishalInstitute.js'
import { 
  BrowserRouter as Router, 
  Route,
} from 'react-router-dom'; 

var classes = "4/week";
var fees = "400";
var experience = "9+years";

function App() {

  return (
    <Router>
    <div>
      <Route path="/AradhnaAcademy" component={AradhnaAcademy}></Route>
      <Route path="/VishalInstitute" component={VishalInstitute}></Route>
    </div>
    </Router>
  );
}

export default App;
