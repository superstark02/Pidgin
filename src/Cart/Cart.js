import React from "react";
import { rdb} from "../firebase.js";
import Divider from '@material-ui/core/Divider';
import { FaArrowLeft,FaShoppingCart } from "react-icons/fa";
import ListItem from '@material-ui/core/ListItem';
import Loader from 'react-loader-spinner'
import { Button,Box } from '@material-ui/core';

function exit(){
    window.Android.exit()
}

class MyCart extends React.Component{

state = {
    phone:"",
    items:[{id:"hello"}],
    length:null,
    total:0,
    phone:0,
    device:'',
    time:''
}

constructor(){
    super()
    this.checkout = this.checkout.bind(this)
    this.imcrement = this.imcrement.bind(this)
}

checkout = (amount,orderId) => {
    window.Android.checkOut(amount,orderId,this.state.phone);
}

imcrement = (amount) => {
    this.setState({total:this.state.total+amount})
}

    componentDidMount(){
        const phone = "A"//window.Android.getClassId()
        /*const device = window.Android.getId()
        this.setState({phone:phone})
        this.setState({device:device})*/

        const timestamp = Date.now()
        var time = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)
        this.setState({time:time})

        const data = rdb.ref().child("Users").child(phone).child("Cart")
        data.on("value",(snapshot)=>{
            this.setState({length:snapshot.numChildren()})
            let total= 0
            let words = snapshot.val()
            let newState = [];
            for(let word in words){
                newState.push({
                    name:words[word].name,
                    individual:words[word].individual,
                    online:words[word].online,
                    price:words[word].price,
                    image:words[word].image,
                    timing:words[word].timing,
                    trial:words[word].trial
                })
                total = parseInt(words[word].price) + total
            }
            this.setState({items:newState})
            this.setState({total:total})
        })
        
    }
    render(){
        if(this.state.length==null){
            return(
                <div style={{position:'absolute',top:'0',width:'100%',minHeight:'100%',backgroundColor:'white',zIndex:'300',maxWidth:'100%'}} >
                <Box boxShadow={3} >
                <div style={{display:'flex',alignContent:'center',padding:'15px'}} >
                    <FaArrowLeft color='#043540' size='14' style={{marginTop:'5px',marginRight:'15px'}} onClick={exit} />
                    <div class='titleC' >Your Cart</div>
                </div>

                <Divider/>
                </Box>
                <div style={{marginTop:'200px',textAlign:'center'}} >
                <Loader
                    type="TailSpin"
                    color="#043540"
                    height={30}
                    width={30}
                    timeout={1000} 
                />
                </div>

                </div>
            )
        }
        if(false){
            return(
            <div>
                <div style={{position:'absolute',top:'0',width:'100%',minHeight:'100%',backgroundColor:'white',zIndex:'300'}} >
                <Box boxShadow={3} >
                <div style={{display:'flex',alignContent:'center',padding:'15px'}} >
                    <FaArrowLeft color='#043540' size='14' style={{marginTop:'5px',marginRight:'15px'}} onClick={exit} />
                    <div class='titleC' >Your Cart</div>
                </div>
                </Box>
                <Divider/>

                <div style={{textAlign:'center',top:'40%',position:'absolute',width:'100%'}} >
                    <FaShoppingCart color='#d7d7d7' size='80'/>
                    <div style={{fontFamily:'FiraSans',color:'#d7d7d7'}} >Nothing In Your Cart</div>
                </div>

                </div>
            </div>
            )
        }
        else{
            return(
                <div>
                    <div style={{position:'absolute',top:'0',width:'100%',minHeight:'100%',backgroundColor:'white',zIndex:'300'}} >
                    <Box boxShadow={3} >
                    <div style={{display:'flex',alignContent:'center',padding:'15px'}} >
                        <FaArrowLeft color='#043540' size='14' style={{marginTop:'5px',marginRight:'15px'}} onClick={exit} />
                        <div class='titleC' >Your Cart</div>
                    </div>

                    <Divider/>
                    </Box>

                    <div style={{padding:'0px 20px'}} >
                        <Box boxShadow={3} style={{marginTop:'10px'}} >
                            <div style={{width:'100%',fontSize:'17px',fontWeight:'600',marginTop:'10px',padding:'10px'}}>
                                Total: &#8377;{this.props.basketProps.basketNumber}
                            </div>
                        </Box>
                    </div>

                    {
                        this.state.items.map(item=>{
                            return(
                                <div style={{width:'100%',padding:'0px 20px'}} >
                                    <Box boxShadow={3} style={{marginTop:'20px'}} >
                    <ListItem style={{padding:'10px 0px',display:'block',height:'auto'}} >
                      <div style={{display:'flex',margin:'10px 0px'}} >
                        <div>
                          <Box boxShadow={3} ><img src={item.image} width='70px' height='70px' style={{marginLeft:'-10px',marginTop:'-30px',backgroundColor:'white'}} /></Box>
                        </div>
                        <div style={{marginLeft:'10px',width:'70%'}} >
                          <div style={{color:'#043540',fontFamily:'FiraSans',fontSize:'13px',maxWidth:'76%'}} >{item.name}</div>
                          <div style={{color:'grey',fontSize:'11px'}}>&#8377; {item.price}</div>
                        </div>
                        <div style={{alignContent:'center',marginLeft:'auto', paddingLeft:'5px',right:'0',position:'absolute'}} >
                          <Button variant="outlined" color="secondary" style={{borderRadius:'5px',fontSize:'8px',padding:'5px 0px',marginRight:'5px'}}>
                              - DELETE
                          </Button>
                        </div>
                      </div>

                        <div style={{maxWidth:'100%',width:'100%',padding:'0px 10px'}} >
                            <table style={{color:"black",fontSize:'10px',fontFamily:'Arial',width:'100%'}} >
                                <tr style={{backgroundColor:'#f8c7e7'}} >
                                    <td style={{color:'#e44b7c',padding:'4px'}}  >{item.individual}</td>
                                    <td style={{color:'#e44b7c',padding:'4px'}}  >{item.trial}</td>
                                </tr>
                                <tr >
                                    <td style={{color:'#e44b7c',padding:'4px'}}  >{item.timing}</td>
                                    <td style={{color:'#e44b7c',padding:'4px'}}  >{item.trial}</td>
                                </tr>
                            </table>
                        </div>
                    </ListItem>
                                </Box>
                                </div>
                            )
                        })
                    }
                    <div style={{height:'100px'}} ></div>
                    </div>
                <div style={{position:'fixed',bottom:'0',width:'100%',padding:'20px',zIndex:'700',backgroundColor:'white',boxShadow:'5px 5px 10px'}} >
                    
                    <Button 
                        style={{backgroundColor:"#04BFBF",
                            width:'100%',color:'white',
                            fontWeight:'300',margin:'0px',
                            padding:'10px 0px',
                            borderRadius:'0px',
                        }}
                        onClick = {()=>{this.checkout(this.state.total*100 , this.state.phone+this.state.device+toString(this.state.time))}}
                         >
                        CHECKOUT
                    </Button>
                </div>
                </div>
            )
        }
    }
}

const mapStateToPops = state => ({
    basketProps: state.basketState
})

export default MyCart