import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import Geocode from "react-geocode";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
}));

function renderRow({props}) {

  return (
    <ListItem button>
      hey{props}
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export default class VirtualizedList extends React.Component {

  componentDidMount(){
    Geocode.setApiKey("AIzaSyCYoIBWm4Hw6kCP1P6jPWvqgJsXQdFmuPM");
    Geocode.setLanguage("en");
    Geocode.setRegion("in");
    Geocode.enableDebug();

    Geocode.fromLatLng("48.8583701", "2.2922926").then(
      response => {
        const address = response.results[0].formatted_address;
        console.log(address);
      },
      error => {
        console.error(error);
      }
    );
  }

  render(){
    return(
      <div>
        Hello
      </div>
    )
  }
}
