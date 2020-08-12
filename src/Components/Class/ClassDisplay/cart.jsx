import React from 'react'
import { Divider, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default class CartButton extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/cart" >
                    <div style={{ position: 'fixed', bottom: '0', width: '100%', padding: '10px',backgroundColor:'white',zIndex:'500',borderTop:'solid 1px pink',boxShadow:'0px 5px 10px' }} >
                        <Divider />
                        <Button
                            disableElevation
                            style={{width:'100%',padding:'10px',fontWeight:'bold'}}
                            variant="contained"
                            color="secondary"
                        >
                            VIEW CART
                        </Button>
                    </div>
                </Link>
            </React.Fragment>
        )
    }
}