import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';

export default class Faculty extends React.Component {
    render() {
        return (
            <React.Fragment>
                <li style={{ backgroundColor: '#04BF7B' }} >
                    <ul style={{ padding: '10px' }} >
                        <ListSubheader style={{ fontSize: '12px', backgroundColor: '#04BF7B' }} >{`About Faculty`}</ListSubheader>
                        {
                            this.props.qualifications &&
                            this.props.qualifications.map(qualifications => {
                                if (qualifications.header == true) {
                                    return (
                                        <ListItem style={{ padding: '10px 15px' }} >
                                            <div style={{ fontSize: '13px', color: 'white' }}><b>{qualifications.item}</b></div>
                                        </ListItem>
                                    )
                                }
                                else {
                                    return (
                                        <ListItem style={{ padding: '10px 15px' }} >
                                            <div style={{ fontSize: '13px', color: 'white' }}>{qualifications.item}</div>
                                        </ListItem>
                                    )
                                }
                            })
                        }
                    </ul>
                </li>
            </React.Fragment>
        )
    }
}