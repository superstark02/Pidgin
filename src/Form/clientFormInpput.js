import React from 'react'
import {db} from '../firebase.js'
import FormHelperText from '@material-ui/core/FormHelperText';

export const ClientInput = ({spell,id}) => {
    const [titleCourse,settitleCourse] = React.useState(spell.title);
    const [priceCourse,setpriceCourse] = React.useState(spell.price);
    const [detailsCourse,setdetailsCourse] = React.useState(spell.detail);

    const onUpdate = () =>  {
        db.collection('Classes').doc(id).collection('Courses').doc(spell.id).set({title:titleCourse, price:priceCourse, detail:detailsCourse});
    }

    return <div>
                <div style={{padding:'5px', backgroundColor:'grey',marginRight:'10px',marginBottom:'10px'}}>
                <FormHelperText>Name of the course</FormHelperText>
                <input class="clientInput" value={titleCourse} onChange={(e)=>{settitleCourse(e.target.value)}} />

                <FormHelperText>Price of the course</FormHelperText>
                <input class="clientInput" value={priceCourse} onChange={(e)=>{setpriceCourse(e.target.value)}}/>

                <FormHelperText>Details about the course: syllabus topics covered etc..</FormHelperText>
                <textarea value={detailsCourse} onChange={(e)=>{setdetailsCourse(e.target.value)}}/>
               
                <div>
                    <button onClick={onUpdate} >Update</button>
                </div>
                </div>
            </div>
    
}

export const ClientInputNotes = ({spell,id}) => {
    const [note,setNote] = React.useState(spell.item);

    const onUpdate = () =>  {
        db.collection('Classes').doc(id).collection('Note').doc(spell.id).set({item:note});
    }

    return <div>
                <div style={{padding:'5px', backgroundColor:'grey',marginRight:'10px',marginBottom:'10px'}}>
                    <FormHelperText>Name of the course</FormHelperText>
                    <textarea value={note} onChange={(e)=>{setNote(e.target.value)}}/>
                    <FormHelperText>This input field is expandable. You increase it's size.</FormHelperText>
                    <div>
                        <button onClick={onUpdate}>Update</button>
                    </div>
                </div>   
            </div>
    
}

export const ClientInputQualifications = ({spell,id}) => {
    const [qualification,setQualification] = React.useState(spell.item);

    const onUpdate = () =>  {
        db.collection('Classes').doc(id).collection('Qualifications').doc(spell.id).set({item:qualification});
    }

    return <div>
                <div style={{padding:'5px', backgroundColor:'grey',marginRight:'10px',marginBottom:'10px'}}>
                    <FormHelperText>Name of the course</FormHelperText>
                    <textarea value={qualification} onChange={(e)=>{setQualification(e.target.value)}}/>
                    <FormHelperText>This input field is expandable. You increase it's size.</FormHelperText>
                    <div>
                        <button onClick={onUpdate}>Update</button>
                    </div>
                </div>   
            </div>
    
}

