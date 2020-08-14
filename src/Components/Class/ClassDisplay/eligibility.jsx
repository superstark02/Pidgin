import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';

export default class Eligibilty extends React.Component {
    render() {
        return (
            <React.Fragment>
                <li style={{ backgroundColor: '#04BF7B' }} >
                    <ul style={{ padding: '10px' }} >
                        <ListSubheader style={{ fontSize: '12px', backgroundColor: '#04BF7B' }} >{`Eligibility`}</ListSubheader>
                        {
                            this.props.eligibility &&
                            this.props.eligibility.map(eligibility => {
                                return (
                                    <ListItem style={{ padding: '0px 15px' }} >
                                        <div style={{ fontSize: '13px', color: 'white' }}>{eligibility.item}</div>
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