import React from 'react'
import img from '../Images/paysuc.jpg'
import Button from '@material-ui/core/Button';
import {db,rdb} from '../firebase'

export default class PaymentDone extends React.Component{

    state = {
        cart:'',
        phone:null,
        time:''
    }

    componentDidMount(){
        const deviceId = window.Android.getId()
        db.collection("DeviceId").doc(deviceId).get().then(snapshot=>{
            const data = snapshot.get("id")
            this.setState({phone:data})
        })

        const timestamp = Date.now()
        var time = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)
        this.setState({time:time})
        
    }

    render(){
        if(this.state.phone!=null){
            rdb.ref().child("Users").child(this.state.phone).child("Cart").on("value",(snapshot)=>{

                let words = snapshot.val()
    
                for(let word in words){
                    
                    db.collection("Users").doc(this.state.phone).collection("Orders").doc(word).set({
                        name:words[word].name,
                        individual:words[word].individual,
                        online:words[word].online,
                        price:words[word].price,
                        image:words[word].image,
                        timing:words[word].timing,
                        trial:words[word].trial,
                        time:this.state.time,
                    })
                }
            })
        }
        return(
            <div style={{position:'absolute',zIndex:'500',minHeight:'98%',backgroundColor:"white",maxWidth:'100%'}}>
                <img src={img} width="100%" />
                <div style={{width:"100%",display:'flex',justifyContent:'space-around'}} >
                    <Button variant="outlined" color="secondary" onClick={()=>window.Android.app()} >
                        RETURN TO APP
                    </Button>
                </div>
            </div>
        )
    }
}