import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import { FaBinoculars } from 'react-icons/fa';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position:"fixed",
    bottom:'0',
    boxShadow:'0px 0px 5px rgba(0,0,0,0.2)',
  },
  label:{
    fontSize:"12px"
  },
});

const CustomBar = withStyles({
  root:{
    color:"rgba(0,0,0,0.5)"
  }
})(BottomNavigationAction);

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <CustomBar label={<div className={classes.label} >Home</div>} value="Home" icon={<HomeOutlinedIcon />} />
      <CustomBar label={<div className={classes.label} >Nearby</div>} value="Nearby" icon={<RoomOutlinedIcon />} />
      <CustomBar label={<div className={classes.label} >Find My Class</div>} value="Find" icon={<FaBinoculars />} />
      <CustomBar label={<div className={classes.label} >Account</div>} value="Account" icon={<AccountCircleOutlinedIcon />} />
    </BottomNavigation>
  );
}