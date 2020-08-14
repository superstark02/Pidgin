import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ClassesDisplay from './Components/Class/ClassDisplay'
import history from "./history";
import HomePage from './Pages/Home/HomePage';
import SearchPage from './Pages/Search/SearchPage';
import Cart from './Pages/Cart/Cart';

class App extends React.Component{

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path='/cart' component={Cart} ></Route>
          <Route exact path='/class-display/:id' component={ClassesDisplay} ></Route>
          <Route exact path='/class' component={HomePage} ></Route>
          <Route exact path='/search' component={SearchPage} ></Route>
        </Switch>
      </Router>
    )
  }
}
export default App;