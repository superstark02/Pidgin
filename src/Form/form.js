import React from 'react'
import './form.css'
import {db} from '../firebase.js'
import {SpellInput} from './spellInput.js'
import MyHeader from './Haeding'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { FaChevronDown } from "react-icons/fa";

function MyForm(){
    const [spells,setSpells] = React.useState([])

    const [newClass,setNewClass] = React.useState();
    const [search] = React.useState();

    const onCreate = () => {
        db.collection('Classes').doc(newClass).set({name: newClass, lon:0 , lat: 0, women: false, online: true, fees:0, age:0 })

        db.collection('Classes').doc(newClass).collection("Courses").add({title:"", price:'', image:''})

        db.collection('Classes').doc(newClass).collection("Eligibility").add({item:'No eligibility criteria. All entries are welcome'})

        db.collection('Classes').doc(newClass).collection("Note").add({item:''})

        db.collection('Classes').doc(newClass).collection("Qualifications").add({item:''})
    }

    React.useEffect(() => {
        const fetchData = async () => {
            const data = db.collection("Classes").get()
            setSpells((await data).docs.map(doc => ({...doc.data(), id: doc.id})))
        }
        fetchData()
    },[])

    return <div style={{backgroundColor:'#E6E6E6',margin:'0px'}} >
        <MyHeader/>
        <div style={{backgroundColor:'white', paddingLeft:'10px',maxWidth:'100%',fontSize:'25px'}}>
            New Entry   
        <div style={{backgroundColor:'white', paddingLeft:'10px',maxWidth:'100%'}} >
            <div style={{marginRight:'40px'}}>
                <div style={{marginBottom:'5px'}}>
                    <h4 style={{margin:'0px'}} >Type Name</h4>
                    <hr color='043540' size='1' ></hr>
                </div>
                <div style={{display:'flex'}} >
                    <div>
                        <input value={newClass} onChange={(e)=>setNewClass(e.target.value)} class='input'></input>
                        <button onClick={onCreate} >Add</button>
                    </div>
                </div>
            </div>
        </div>

        </div>
        
        <div>
            <ol>
                {spells.map(spell=>(
                <li>
                    <div class='outerDiv' >
                    <div>
                            <ExpansionPanel defaultExpanded={false} elevation={0} style={{border:'none', boxShadow:'none'}}>
                                <ExpansionPanelSummary expandIcon={<FaChevronDown size='15' color="#043540"/>}>
                                    <div class='nameClass'>
                                        {spell.name}
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <SpellInput spell={spell} />
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                        <hr color='043540' size='1' ></hr>
                     </div>
                </li>
                ))}
            </ol>
                <div style={{height:'100px'}} ></div>
        </div>
    </div>
}
export default MyForm;
