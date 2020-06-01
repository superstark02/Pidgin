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

class SearchView extends React.Component{
    state = {
        classes:null,
    }

    constructor(){
        super();
        this.state = {
            search:''
        };
        this.handleChange = this.handleChange.bind(this)
        this.goBack = this.goBack.bind(this);
    }

    goBack(){
        this.props.history.goBack();
      }

    handleChange = (id) => {
        window.Android.openFragment(id)
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
        if(this.state.classes!=null){
            filteredClass = this.state.classes.filter(
                (classes)=>{
                    return classes.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                }
            );
        }
        else{
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
                <div style={{display:'flex', padding:'5px 5px',maxWidth:'100%'}}>
                <div style={{marginRight:'10px',alignSelf:'center'}} >
                <div style={{backgroundColor:'transparent',paddingLeft:'5px',paddingTop:'10px',paddingRight:'0px'}} 
                    >
                        <ArrowBackIcon fontSize='10px' style={{margin:'10px'}} onClick={this.goBack} />
                </div>
                    
                </div>
                    <input placeholder={"Search classes, subjects, gyms..."} class='searchInput' value={this.state.search}
                    onChange={this.updateSearch.bind(this)} onSubmit={this.updateSearch.bind(this)}/>
                </div>

                <div style={{backgroundColor:'#E6E6E6',padding:'5px',width:'100%',maxWidth:'100%'}}> 
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
                                        {classes.adress}
                                    </div>
                                        <hr color='#E6E6E6'></hr>
                                    <div class='fees' onClick={()=>this.handleChange(classes.id)} >
                                        <div>Starting Fees  &#8377;{classes.fees}</div>
                                    </div> 
                            </div>
                            )
                        })
                    }
                    <div style={{height:'60px'}} />    
                </div>
            </div>
        )
    }
}
export default SearchView;