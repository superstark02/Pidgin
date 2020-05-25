import React,{Component} from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { FaSchool,FaQuestionCircle, FaIcons } from 'react-icons/fa';
import {Link, withRouter} from 'react-router-dom';
import history from './history'

class SimpleBottomNavigation extends Component {
  state = {
    value: 1,
    pathMap: [
      '/school',
      '/',
      '/help',
    ]
  };

  componentWillReceiveProps(newProps) {
    const {pathname} = newProps.location;
    const {pathMap} = this.state;

    const value = pathMap.indexOf(pathname);

    if (value > -1) {
      this.setState({
        value
      });
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render(){
    const {value, pathMap} = this.state;
    return (
      <div class='device'>
       <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
      >
        <BottomNavigationAction label="School" icon={<FaSchool/>} component={Link} to={pathMap[0]} onClick={history.replace('/')} />
        <BottomNavigationAction label="Classes" icon={<FaIcons />} component={Link} to={pathMap[1]} onClick={history.replace('/')}/>
        <BottomNavigationAction label="Help" icon={<FaQuestionCircle />} component={Link} to={pathMap[2]} onClick={history.replace('/')}/>
      </BottomNavigation>
      </div>
    );
  }
}

export default withRouter(SimpleBottomNavigation);