import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

const AntTabs = withStyles({
  root: {
  },
  indicator: {
    backgroundColor: '#043540',
  },
})(Tabs);

const AntTab = withStyles({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontFamily: "inherit",
    '&:hover': {
      color: '#043540',
      opacity: 1,
    },
    '&$selected': {
      color: '#043540',
    },
    '&:focus': {
      color: '#043540',
    },
    '&:focus': {
      opacity: 1,
    },
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  },
  selected: {},
})((props) => <Tab {...props} TabIndicatorProps={{ children: <span /> }} />);


function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: "fixed",
    bottom: "0",
    boxShadow:"0px 0px 5px rgba(0,0,0,0.3)"
  },
}));

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AntTabs value={value} variant="fullWidth" onChange={handleChange} aria-label="ant example">
        <AntTab icon={<AccountCircleOutlinedIcon/>} label="Tab 1" />
        <AntTab label="Tab 2" />
        <AntTab label="Tab 3" />
        <AntTab icon={<AccountCircleOutlinedIcon/>} label="Account" />
      </AntTabs>
    </div>
  );
}
