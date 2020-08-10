import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { FaBinoculars } from 'react-icons/fa';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position:"fixed",
    bottom:'0',
    boxShadow:'0px 0px 5px rgba(0,0,0,0.2)',
    zIndex:"1"
  },
});

const CustomBar = withStyles({
  root:{
    color:"rgba(0,0,0,0.5)",
    '&$selected': {
      color: "#043540",
    },
  },
  label:{
    fontSize:"12px",
  },
  selected:{
    color:"#043540",
  }
})(BottomNavigationAction);

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState('Home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <CustomBar showLabel={false} label="Home" value="Home" icon={<HomeOutlinedIcon />} />
      <CustomBar showLabel={false} label="Search" value="Search" icon={<SearchRoundedIcon />} />
      <CustomBar showLabel={false} label="Find" value="Find" icon={<FaBinoculars />} />
      <CustomBar showLabel={false} label="Account" value="Account" icon={<AccountCircleOutlinedIcon />} />
    </BottomNavigation>
  );
}