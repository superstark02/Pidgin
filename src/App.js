import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, Route, Switch, withRouter,
} from 'react-router-dom'
import ClassPage from './ClassPage';
import ClassesDisplay from './ClassComponents/display'
import MyForm from './Form/form';
import FullScreenImage from './ClassComponents/FullScreenImage.js'
import SearchView from './Filters/ClassFilter';
import Demo from './location.js'
import SimpleBottomNavigation from './BottomNavBar.js'
import SchoolPage from './School';
import HelpPage from './HelpPage';
import { AnimatePresence} from 'framer-motion';


class App extends React.Component{

  render() {
    return (
      <Router>
        <AnimatePresence>
        <Switch>
          <Route exact path='/form' component={MyForm} ></Route>
          <Route exact path='/help' component={HelpPage} ></Route>
          <Route exact path='/school' component={SchoolPage} ></Route>
          <Route exact path='/search' component={SearchView} ></Route>
          <Route exact path='/find' component={Demo} ></Route>
          <Route exact path='/images' component={FullScreenImage} ></Route>
          <Route exact path='/classDisplay' component={ClassesDisplay} ></Route>
          <Route exact path='/' component={withRouter(ClassPage)} ></Route>
        </Switch>
        </AnimatePresence>
        <SimpleBottomNavigation/>
      </Router>
    )
  }
}
export default App;
