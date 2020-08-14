import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import Chip from '@material-ui/core/Chip';

class Courses extends React.Component {
    state = {
        courses:null
    }

    componentDidMount(){
        this.setState({courses:this.props.courses})
    }

    handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    render() {
        return (
            <React.Fragment>
                <li>
                    <ul style={{ padding: '10px' }} >
                        <ListSubheader style={{ fontSize: '12px', backgroundColor: 'white' }} >{`Courses (` + this.props.courseLength + `)`}</ListSubheader>
                        {
                            this.state.courses &&
                            this.state.courses.map(course => {
                                return (
                                    <ListItem button style={{ padding: '0px 15px' }} >
                                        <div style={{ display: 'flex', margin: '10px 0px', width: '100%' }} >
                                            <Link style={{ display: 'flex' }} >
                                                <div>
                                                    <img src={course.image} width='70px' height='70px' style={{ borderRadius: '10px' }} />
                                                </div>
                                                <div style={{ marginLeft: '10px', width: '100%' }}>
                                                    <div style={{ color: '#043540', fontSize: '13px', maxWidth: '90%' }} >{course.title}</div>
                                                    <div style={{ color: 'grey', fontSize: '11px' }}>&#8377; {course.price}</div>
                                                    <Divider />
                                                    <div style={{ fontSize: '8px'}} >
                                                        More Details <i class="fa fa-chevron-right" style={{ fontSize: '5px', marginTop: '10px' }}></i>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div style={{ alignContent: 'center', marginLeft: 'auto', paddingLeft: '5px', right: '0', position: 'absolute' }} >
                                                
                                            </div>
                                        </div>
                                    </ListItem>
                                )
                            })
                        }
                    </ul>
                </li>
            </React.Fragment>
        )
    }
}

export default Courses;