import React from 'react'
import {db} from '../firebase.js'
import './form.css'
import { number } from 'prop-types'

var m;

export const SpellInput = ({spell}) => {
    const [spells,setSpells] = React.useState([])

    const [name, setName] = React.useState(spell.name)
    const [type, setType] = React.useState(spell.type)
    const [fees, setFees] = React.useState(spell.fees)

    const [lat, setLat] = React.useState(spell.lat)
    const [lon, setLon] = React.useState(spell.lon)
    const [location, setLocation] = React.useState(spell.location)

    const [i1, setI1] = React.useState(spell.i1)
    const [i2, setI2] = React.useState(spell.i2)
    const [i3, setI3] = React.useState(spell.i3)

    const [adress, setAdress] = React.useState(spell.adress)
    const [timings, setTimings] = React.useState(spell.timings)
    const [duration, setDuration] = React.useState(spell.duration)  

    const onUpdateName = () => {
        db.collection('Classes').doc(spell.id).set({...spell, name})
    }
    const onUpdateType = () => {
        db.collection('Classes').doc(spell.id).set({...spell, type});
    }

    const onUpdateFees  = () => {
        db.collection('Classes').doc(spell.id).set({...spell, fees});
    }

    const onUpdateLocation  = () => {
        db.collection('Classes').doc(spell.id).set({...spell, location});
    }

    const onUpdatei1  = () => {
        db.collection('Classes').doc(spell.id).set({...spell, i1});
    }

    const onUpdatei2  = () => {
        db.collection('Classes').doc(spell.id).set({...spell, i2});
    }

    const onUpdatei3  = () => {
        db.collection('Classes').doc(spell.id).set({...spell, i3});
    }

    



    const onUpdateAdress  = () => {
        db.collection('Classes').doc(spell.id).set({...spell, adress});
    }

    const onUpdateDuration  = () => {
        db.collection('Classes').doc(spell.id).set({...spell, duration});
    }

    const onUpdateTimings  = () => {
        db.collection('Classes').doc(spell.id).set({...spell, timings});
    }
    

    React.useEffect(() => {
        const fetchData = async () => {
            const data = db.collection("Classes").doc(spell.id).collection('Courses').get()
            setSpells((await data).docs.map(doc => ({...doc.data(), id: doc.id})))
        }
        fetchData()
    },[])

    return <div class='formInput'>
        <div class='formContainer'>
            <div style={{marginRight:'40px'}}>
                <div style={{marginBottom:'5px'}}>
                    <h4 style={{margin:'0px'}} >Name</h4>
                    <hr color='043540' size='1' ></hr>
                    <input value={name} onChange={(e)=>{setName(e.target.value)}} class='input'></input>
                    <button onClick={onUpdateName} >Update</button>
                </div>
                <br></br>
                <div>
                    <h7>Type</h7>
                    <hr color='043540' size='1' ></hr>
                    <input value={type} onChange={(e)=>{setType(e.target.value)}} class='input'></input>
                    <button onClick={onUpdateType} >Update</button>
                </div>
                <br></br>
                <div>
                    <h7>Fees</h7>
                    <hr color='043540' size='1' ></hr>
                    <input value={fees} onChange={(e)=>{setFees(e.target.value)}} class='input'></input>
                    <button onClick={onUpdateFees} >Update</button>
                </div>
                <br></br>
                <br></br>
                <br></br>
            </div>


            <div style={{marginRight:'40px'}}>
                <div style={{marginBottom:'5px'}}>
                    <h7>Latitude</h7>
                    <hr color='043540' size='1' ></hr>
                    <input defaultValue={lat} onChange={(e)=>{m = e}} class='input'></input>
                    <button  >Update</button>
                </div>
                <br></br>
                <div>
                    <h7>Longitude</h7>
                    <hr color='043540' size='1' ></hr>
                    <input value={lon} onChange={(e)=>{setLon(e.target.value)}} class='input'></input>
                    <button >Update</button>
                </div>
                <br></br>
                <div>
                    <h7>Location Url</h7>
                    <hr color='043540' size='1' ></hr>
                    <input value={location} onChange={(e)=>{setLocation(e.target.value)}} class='input'></input>
                    <button onClick={onUpdateLocation} >Update</button>
                </div>
            </div>


            <div style={{marginRight:'40px'}}>
                <div style={{marginBottom:'5px'}}>
                    <h7>Image 1</h7>
                    <hr color='043540' size='1' ></hr>
                    <input value={i1} onChange={(e)=>{setI1(e.target.value)}} class='input'></input>
                    <button onClick={onUpdatei1} >Update</button>
                </div>
                <br></br>
                <div>
                    <h7>Image 2</h7>
                    <hr color='043540' size='1' ></hr>
                    <input value={i2} onChange={(e)=>{setI2(e.target.value)}} class='input'></input>
                    <button onClick={onUpdatei2} >Update</button>
                </div>
                <br></br>
                <div>
                    <h7>Image 3</h7>
                    <hr color='043540' size='1' ></hr>
                    <input value={i3} onChange={(e)=>{setI3(e.target.value)}} class='input'></input>
                    <button onClick={onUpdatei3} >Update</button>
                </div>
            </div>

            <div style={{marginRight:'40px'}}>
                <div style={{marginBottom:'5px'}}>
                    <h7>Adress</h7>
                    <hr color='043540' size='1' ></hr>
                    <input value={adress} onChange={(e)=>{setAdress(e.target.value)}} class='input'></input>
                    <button onClick={onUpdateAdress} >Update</button>
                </div>
                <br></br>
                <div>
                    <h7>Timings</h7>
                    <hr color='043540' size='1' ></hr>
                    <input value={timings} onChange={(e)=>{setTimings(e.target.value)}} class='input'></input>
                    <button onClick={onUpdateTimings} >Update</button>
                </div>
                <br></br>
                <div>
                    <h7>Duration</h7>
                    <hr color='043540' size='1' ></hr>
                    <input value={duration} onChange={(e)=>{setDuration(e.target.value)}} class='input'></input>
                    <button onClick={onUpdateDuration} >Update</button>
                </div>
            </div>

            

        </div>
        
    </div>
}