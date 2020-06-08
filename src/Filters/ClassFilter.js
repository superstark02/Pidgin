import React from 'react'
import {FaArrowLeft, FaSearch, FaHeart} from 'react-icons/fa'
import TopPicks from '../AppComponents/topPicks.js'
import './ClassFilter.css'
import { Link } from 'react-router-dom'
import {db,rdb} from '../firebase'
import {FaMap, FaSnapchat} from 'react-icons/fa'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TuneRoundedIcon from '@material-ui/icons/TuneRounded';
import { Divider, Dialog, IconButton, Button } from '@material-ui/core'
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';
import NightsStayRoundedIcon from '@material-ui/icons/NightsStayRounded';
import Brightness4OutlinedIcon from '@material-ui/icons/Brightness4Outlined';


function ValueLabelComponent(props) {
    const { children, open, value } = props;
  
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
  
  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
  };
  

const marks = [
    {
      value: 5,
      label: 'Minimum Age'
    },
    {
      value: 20,
      label:'Maximum Age'
    },
  ];

const marksTime = [
    {
      value: 0,
      label:<WbSunnyRoundedIcon/>
    },
    {
        value: 50,
        label:<Brightness4OutlinedIcon/>
    },
    {
      value: 100,
      label: <NightsStayRoundedIcon/>
    },
  ];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
        style={{width:'100%',minHeight:'100%'}}
      >
        {value === index && (
          <div style={{minHeight:'100%'}} >{children}</div>
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
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  

class SearchView extends React.Component{
    state = {
        classes:null,
        filterAge:20,
        open:true,
        value:1,
    }

    constructor(){
        super();
        this.state = {
            search:null
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.goBack = this.goBack.bind(this);
    }

    goBack(){
        this.props.history.goBack();
      }

    handleChange = (id) => {
        window.Android.openFragment(id)
      }

    handleClose = () => {
        this.setState({open:false})
    }

    handleChangeTabs = (event, newValue) => {
        this.setState({value:newValue})
    }

    componentDidMount(){
        const data = db.collection('Classes');    
         data.get()
          .then(snapshot=>{
            const images = []
            snapshot.forEach(doc=>{
              const data = doc.data()
              images.push(data)
            })
            this.setState({classes:images})
          })
          if(this.props.location.type!=null){
              this.setState({search:this.props.location.type})
          }
      }

    updateSearch(event){
        this.setState({search:event.target.value})
    }

    render(){
        let filteredClass = this.state.classes;
        if(this.state.search!=null){
            filteredClass = this.state.classes.filter(
                (classes)=>{
                    return classes.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 
                }
            );
        }

        else if(false) {
            return <div style={{marginTop:'200px',textAlign:'center'}} >
                <Loader
                    type="TailSpin"
                    color="#043540"
                    height={30}
                    width={30}
                    timeout={1000} 
                />
            </div>
        }

        return(
            <div style={{position:'absolute',zIndex:'200',minHeight:'800px',backgroundColor:'white',width:'100%'}}>
                <div style={{display:'flex', padding:'0px 5px',maxWidth:'100%'}}>
                <div style={{marginRight:'10px',alignSelf:'center'}} >
                <div style={{backgroundColor:'transparent',paddingLeft:'5px',paddingTop:'10px',paddingRight:'0px'}} 
                    >
                        <ArrowBackIcon fontSize='10px' style={{margin:'10px'}} onClick={this.goBack} />
                </div>
                    
                </div>
                    <input placeholder={"Search classes, subjects, gyms..."} class='searchInput' value={this.state.search}
                    onChange={this.updateSearch.bind(this)} onSubmit={this.updateSearch.bind(this)}  />
                </div>

                <div style={{padding:'0px 15px'}} onClick={()=>{this.setState({open:true})}} >
                <Chip
                    variant="outlined"
                    size="small"
                    icon={<TuneRoundedIcon/>}
                    label="Filters"
                    clickable
                    color="secondary"
                />
                </div>

                <div style={{backgroundColor:'white',padding:'5px',width:'100%',maxWidth:'100%'}}> 
                    {
                        filteredClass&&
                        filteredClass.map(classes=>{
                        return(
                            <div class='item' style={{width:'auto'}}>
                                <div class='showImage'onClick={()=>this.handleChange(classes.id)} >
                                    <img src={classes.i1} height='200px' style={{marginRight:'2px'}}></img>
                                    <img src={classes.i2} height='200px' style={{marginRight:'2px'}}></img>
                                    <img src={classes.i3} height='200px' style={{marginRight:'2px'}}></img>
                                </div>
                                <div style={{display:'flex',position:'absolute',zIndex:'50'}} onClick={()=>this.handleChange(classes.id)} >
                                    <div class='age'>
                                        Age: {classes.age}+
                                    </div>
                                    <div class='newType' >
                                        {classes.type}
                                    </div>
                                </div>
                                <div class='container'>
                                    <div class='name' onClick={()=>this.handleChange(classes.id)}  >{classes.name}</div>
                                    <div class='map'>
                                        <div>
                                            <div><a href={this.state.location}><FaMap size='15'color='#04BFBF'/></a></div>
                                            <div>Map</div>
                                        </div>
                                    </div>
                                </div>
                                
                                    <div class='type' onClick={()=>this.handleChange(classes.id)} >
                                        {classes.address}
                                    </div>
                                        <Divider/>
                                    <div class='fees' onClick={()=>this.handleChange(classes.id)} >
                                        <div>Starting Fees  &#8377;{classes.fees}</div>
                                    </div> 
                            </div>
                            )
                        })
                    }
                    <div style={{height:'30px'}} />    
                </div>
                <Dialog 
                    fullScreen
                    open={this.state.open} 
                    onClose={this.state.handleClose} 
                    TransitionComponent={Transition}
                    style={{top:'20%'}}
                >
                    <div><IconButton onClick={this.handleClose} ><CloseIcon/></IconButton></div>
                    <div style={{display:'flex',width:'100%'}} >
                        <Tabs
                            orientation="vertical"
                            variant="fullWidth"
                            style={{width:'40%'}}
                            onChange={this.handleChangeTabs}
                            value={this.state.value}
                            
                        >
                            <Tab label="Age" {...a11yProps(0)} />
                            <Tab label="Price" {...a11yProps(1)} />
                            <Tab label="Time" {...a11yProps(2)} />
                        </Tabs>
                        <TabPanel index={0} value={this.state.value} style={{width:'100%'}} >
                            <div style={{padding:'10px',color:'black'}}>Age Of The Student</div>
                            <div style={{height:'300px',width:'100%',display:'flex',justifyContent:'space-around'}} >
                                <Slider
                                    orientation="vertical"
                                    defaultValue={30}
                                    valueLabelDisplay="on"
                                    aria-labelledby="vertical-slider"
                                    marks={marks}
                                    />
                            </div>
                        </TabPanel>
                        <TabPanel index={1} value={this.state.value} style={{width:'100%'}} >
                            <div style={{padding:'10px',color:'black'}}>Fees Of The Classes</div>
                            <div style={{height:'300px',width:'100%',display:'flex',justifyContent:'space-around'}} >
                                <Slider
                                    orientation="vertical"
                                    defaultValue={30}
                                    valueLabelDisplay="on"
                                    aria-labelledby="vertical-slider"
                                    marks={marks}
                                    />
                            </div>
                        </TabPanel>
                        <TabPanel index={2} value={this.state.value} >
                        <div style={{padding:'10px',color:'black'}}>Timings Of The Classes</div>
                        <div style={{height:'300px',width:'100%',display:'flex',justifyContent:'space-around'}}>
                            <Slider
                                value = {[20,80]}
                                orientation="vertical"
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                marks={marksTime}
                                />
                            </div>
                        </TabPanel>
                    </div>
                    <dvi style={{position:'fixed',bottom:'0',width:'100%',padding:'20px',display:'flex',justifyContent:'space-around'}} >
                        <Button variant='contained' color='secondary' disableElevation style={{width:'90%',padding:'10px 0px'}} >Clear All</Button>
                    </dvi>
                </Dialog>
            </div>
        )
    }
}
export default SearchView;
