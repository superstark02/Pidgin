import React,{Component} from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { FaSchool,FaQuestionCircle, FaIcons } from 'react-icons/fa';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import {Link, withRouter, Route} from 'react-router-dom';
import MusicNoteOutlinedIcon from '@material-ui/icons/MusicNoteOutlined';
import Badge from '@material-ui/core/Badge';
import history from './history'

class SimpleBottomNavigation extends Component {

  state = {
    value: 1,
    pathMap: [
      '/school',
      '/class',
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
            <BottomNavigationAction label="Schools" icon={<FaSchool/>} component={Link} to={pathMap[0]}/>
            <BottomNavigationAction label="Classes" icon={<MusicNoteOutlinedIcon />} component={Link} to={pathMap[1]} />
            <BottomNavigationAction label="Account" icon={<AccountCircleOutlinedIcon/>} component={Link} to={pathMap[2]} />
          </BottomNavigation>
      </div>
    );
  }
}

export default withRouter(SimpleBottomNavigation);