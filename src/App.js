import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom'
import ClassPage from './ClassPage';
import ClassesDisplay from './ClassComponents/display'
import MyForm from './Form/form';
import SearchView from './Filters/ClassFilter';
import Demo from './location.js'
import BottomNav from './BottomNavBar.js'
import SchoolPage from './School';
import HelpPage from './HelpPage';
import Course from './ClassComponents/course';
import { AnimatePresence} from 'framer-motion';
import history from "./history";
import ClientForm from './Form/clientForm';
import Adapter from './Form/editCourse';
import OnGoingClasses from './HelpComponents/OnGoingClasses.js'
import MyCart from './Cart/Cart';
import EnrollmentForm from './HelpComponents/enrollmentForm';
import Notifications from './HelpComponents/Notifications';
import MyGoogleLogIn from './Log/GLogIn';
import Checkout from './Resource/RazorPay';
import PaymentDone from './Cart/paymentDone';
import PaymentNotDone from './Cart/paymentNotDone';
import { Provider } from 'react-redux';
import store from './Cart/Store'

class App extends React.Component{

  render() {
    return (
      <Router history={history}>
        <Provider store={store} >
        <AnimatePresence>
        <Switch>
          <Route exact path='/on_going' component={OnGoingClasses} ></Route>
          <Route exact path='/checkout' component={Checkout} ></Route>
          <Route exact path='/success' component={PaymentDone} ></Route>
          <Route exact path='/fail' component={PaymentNotDone} ></Route>
          <Route exact path='/cart' component={MyCart} ></Route>
          <Route exact path='/googleLogIn' component={MyGoogleLogIn} ></Route>
          <Route exact path='/enrollmentForm' component={EnrollmentForm} ></Route>
          <Route exact path='/notifications' component={Notifications} ></Route>
          <Route exact path='/form' component={MyForm} ></Route>
          <Route exact path='/help' component={HelpPage} ></Route>
          <Route exact path='/school' component={SchoolPage} ></Route>
          <Route exact path='/search' component={SearchView} ></Route>
          <Route exact path='/course' component={Course} ></Route>
          <Route exact path='/find' component={Demo} ></Route>
          <Route exact path='/classDisplay' component={ClassesDisplay} ></Route>
          <Route exact path='/courseEdit' component={Adapter} ></Route>
          <Route exact path='/class' component={ClassPage} ></Route>
          <Route exact path='/clientForm/:id' component={ClientForm}></Route>
        </Switch>
        </AnimatePresence>
        </Provider>
      </Router>
    )
  }
}
export default App;