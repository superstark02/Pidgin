import React, { Component } from 'react'

export class Cart extends Component {
    render() {
        return (
            <div className="wrap" style={{height:"100vh",padding:"40px",textAlign:'center',flexDirection:"column",color:"rgba(0,0,0,0.3)"}}  >
                <div>FIND A BETTER TEACHER FOR BETTER LIFE</div>
                <div style={{fontSize:"12px"}} >
                    No items in cart
                </div>
            </div>
        )
    }
}

export default Cart
