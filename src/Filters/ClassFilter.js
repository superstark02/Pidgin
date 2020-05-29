import React from 'react'
import {FaArrowLeft, FaSearch, FaHeart} from 'react-icons/fa'
import TopPicks from '../AppComponents/topPicks.js'
import './ClassFilter.css'
import { Link } from 'react-router-dom'
import {db,rdb} from '../firebase'
import {FaMap, FaSnapchat} from 'react-icons/fa'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

class SearchView extends React.Component{
    state = {
        classes:null,
    }

    constructor(){
        super();
        this.state = {
            search:''
        };
        this.goBack = this.goBack.bind(this);
    }
    goBack(){
        this.props.history.goBack();
    }
    

    home = () => {
        this.goBack();
          };

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
                    timeout={1000} //3 secs
            
                />
            </div>
        }

        return(
            <div style={{position:'absolute',zIndex:'200',minHeight:'800px',backgroundColor:'white',width:'100%'}}>
                <div style={{display:'flex', padding:'5px 10px',maxWidth:'100%'}}>
                <div style={{marginRight:'10px',alignSelf:'center'}} >
                <div style={{backgroundColor:'transparent',paddingLeft:'5px',paddingTop:'15px',paddingRight:'0px'}} 
                    onClick={this.goBack}>
                        <FaArrowLeft size='20' color='grey' />
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
                            
                            <Link to={{
                                pathname:'/classDisplay',
                                state:{
                                  docName: classes.id,
                                  name: classes.name,
                                  location: classes.location,
                                  uid: classes.uid,
                                  type: classes.type,
                                  woman: classes.woman,
                                  online: classes.online,
                                  address: classes.adress
                                }
                              }}>
                            
                            <div class='item' style={{width:'auto'}}>
                                <div class='showImage'>
                                    <img src={classes.i1} height='200px' style={{marginRight:'2px'}}></img>
                                    <img src={classes.i2} height='200px' style={{marginRight:'2px'}}></img>
                                    <img src={classes.i3} height='200px' style={{marginRight:'2px'}}></img>
                                </div>
                                <div style={{display:'flex',position:'absolute',zIndex:'50'}} >
                                    <div class='age'>
                                        Age: {classes.age}+
                                    </div>
                                <div class='newType' >
                                    {classes.type}
                                </div>
                                </div>
                                <div class='container'>
                                    <div class='name'>{classes.name}</div>
                                    <div class='map'>
                                        <a href={classes.location}><FaMap size='15'color='#04BFBF' /></a>
                                        <div>Map</div>
                                    </div>
                                </div>
                                
                                    <div class='type'>
                                        {classes.adress}
                                    </div>
                                        <hr color='#E6E6E6'></hr>
                                    <div class='fees'>
                                        <div>Starting Fees  &#8377;{classes.fees}</div>
                                    </div> 
                            </div>
            
                            </Link>
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