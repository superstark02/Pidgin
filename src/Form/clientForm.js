import React from 'react'
import MyHeader from './Haeding'
import {db} from '../firebase.js'
import { Route } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {General} from './general'
import { Course } from './courses'
import { Qualification } from './noteandqualifications'


var name
/////////////////////////////////////////////////////////////////////////////////////////////////////

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

function Child({match}){
    name = match.params.id;

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return(
        <div style={{backgroundColor:'white',position:'absolute',zIndex:'300',maxWidth:'100%',width:'100%'}} >
            <MyHeader/>
            
            <AppBar position="static" style={{backgroundColor:'#043540'}} elevation={0} >
                <Tabs value={value} onChange={handleChange} variant="fullWidth" centered aria-label="simple tabs example">
                    {/*<Tab label="General" {...a11yProps(0)} />*/}
                    <Tab label="Courses" {...a11yProps(0)} />
                    {/*<Tab label="About You" {...a11yProps(2)} />*/}
                </Tabs>
            </AppBar>
            {/*<TabPanel value={value} index={0} style={{margin:'-14px'}}>
                <General name={name} />
            </TabPanel>*/}
            <TabPanel value={value} index={0}>
                <Course name={name}/>
            </TabPanel>
            {/*<TabPanel value={value} index={2}>
                <Qualification name={name}/>
            </TabPanel>*/}
        </div>
    )
}

export default class ClientForm extends React.Component{

    render(){
        return(
            <div style={{backgroundColor:'white',position:'absolute',zIndex:'300',maxWidth:'100%',width:'100%'}} >
                <Route path='/clientForm/:id' component={Child}></Route>
            </div>
        )
    }
}