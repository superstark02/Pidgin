import React from 'react'
import ListSubheader from '@material-ui/core/ListSubheader';
import {FaClock, FaGlobe, FaStopwatch, FaCalendar, FaFemale, FaUser, FaUsers} from 'react-icons/fa';
import trial from '../../../Images/trial.png'

var women, online,womenCell ,onlinecell;

export default class Features extends React.Component {
    render() {
        women = this.props.women
        online = this.props.online
        if (online) {
            onlinecell = <td><FaGlobe color='#353535' style={{ marginBottom: '-2px', marginRight: '5px' }} /> Online Available</td>
        }

        if (women) {
            womenCell = <td><FaFemale color='#353535' style={{ marginBottom: '-2px', marginRight: '5px' }} /> Only For Woman</td>
        }

        return (
            <React.Fragment>
                <li>
                    <ul style={{ padding: '10px',fontFamily:"Thin" }} >
                        <ListSubheader style={{ fontSize: '12px', backgroundColor: 'white' }} >{`Features`}</ListSubheader>
                        <table className="feature-table" >
                            <tr>
                                <td><FaClock className="feature-icon" /> 2:00 pm to 8:00 pm</td>
                                <td><FaStopwatch className="feature-icon"/> 1hr/Class</td>
                            </tr>
                            <tr>
                                <td><FaCalendar className="feature-icon"/> 3 clases/week </td>
                                {onlinecell}
                            </tr>
                            <tr>
                                <td><FaUser  className="feature-icon" /> Group Classes Availible</td>
                                <td><FaUsers  className="feature-icon" /> Individual Classes Availible</td>
                            </tr>
                            <tr>
                                {womenCell}
                                <td><img src={trial} width="15px" height='15px' /> 1 Trial Class</td>
                            </tr>
                        </table>
                    </ul>
                </li>
            </React.Fragment>
        )
    }
}