import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ClassesDisplay from './ClassComponents/display'
import MyForm from './Form/form';
import SearchView from './Filters/ClassFilter';
import Course from './ClassComponents/course';
import history from "./history";
import ClientForm from './Form/clientForm';
import Adapter from './Form/editCourse';
import OnGoingClasses from './HelpComponents/OnGoingClasses.js'
import MyCart from './Cart/Cart';
import EnrollmentForm from './HelpComponents/enrollmentForm';
import Notifications from './HelpComponents/Notifications';
import PaymentDone from './Cart/paymentDone';
import PaymentNotDone from './Cart/paymentNotDone';
import HomePage from './Pages/Home/HomePage';

class App extends React.Component{

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path='/on_going' component={OnGoingClasses} ></Route>
          <Route exact path='/success' component={PaymentDone} ></Route>
          <Route exact path='/fail' component={PaymentNotDone} ></Route>
          <Route exact path='/cart' component={MyCart} ></Route>
          <Route exact path='/enrollmentForm' component={EnrollmentForm} ></Route>
          <Route exact path='/notifications' component={Notifications} ></Route>
          <Route exact path='/form' component={MyForm} ></Route>
          <Route exact path='/search' component={SearchView} ></Route>
          <Route exact path='/class-display/:id/:course_id' component={Course} ></Route>
          <Route exact path='/class-display/:id' component={ClassesDisplay} ></Route>
          <Route exact path='/courseEdit' component={Adapter} ></Route>
          <Route exact path='/class' component={HomePage} ></Route>
          <Route exact path='/clientForm/:id' component={ClientForm}></Route>
        </Switch>
      </Router>
    )
  }
}
export default App;