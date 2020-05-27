import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, Route, Switch, withRouter,
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

class App extends React.Component{

  render() {
    return (
      <Router history={history}>
        <AnimatePresence>
        <Switch>
          <Route exact path='/form' component={MyForm} ></Route>
          <Route exact path='/help' component={HelpPage} ></Route>
          <Route exact path='/school' component={SchoolPage} ></Route>
          <Route exact path='/search' component={SearchView} ></Route>
          <Route exact path='/course' component={Course} ></Route>
          <Route exact path='/find' component={Demo} ></Route>
          <Route exact path='/classDisplay' component={ClassesDisplay} ></Route>
          <Route exact path='/' component={withRouter(ClassPage)} ></Route>
          <Route exact path='/:id' component={ClientForm}></Route>
        </Switch>
        </AnimatePresence>
        <BottomNav/>
      </Router>
    )
  }
}
export default App;
