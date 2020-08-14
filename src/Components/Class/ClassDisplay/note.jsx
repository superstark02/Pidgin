import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';

export default class Note extends React.Component {
    render() {
        return (
            <React.Fragment>
                <li style={{ backgroundColor: 'white' }} >
                    <ul style={{ padding: '10px' }} >
                        <ListSubheader style={{ fontSize: '12px', backgroundColor: 'white' }} >{`Note From Teacher`}</ListSubheader>
                        {
                            this.props.note &&
                            this.props.note.map(note => {
                                return (
                                    <ListItem style={{ padding: '10px 15px' }} >
                                        <div style={{ fontSize: '13px' }}>{note.item}</div>
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