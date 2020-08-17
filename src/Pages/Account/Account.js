import React, { Component } from 'react'
import '../../CSS/Pages/Account.css'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import firebase, { db } from '../../firebase'
import getUser from '../../Database/getUer';
import { Link } from '@material-ui/core';

const general = [
    {
        name: "Your Classes",
        icon: <SchoolOutlinedIcon />,
        link: ""
    },
    {
        name: "Your Payments",
        icon: <PaymentOutlinedIcon />,
        link: ""
    },
    {
        name: "List Your Classes",
        icon: <ListAltOutlinedIcon />,
        link: ""
    }
]

const help = [
    {
        name: "Help",
        icon: <HelpOutlineOutlinedIcon />,
        link: ""
    },
    {
        name: "About",
        icon: <InfoOutlinedIcon />,
        link: ""
    }
]

export class Account extends Component {

    state = {
        user: null,
    }

    componentDidMount() {
        getUser().then(result => {
            this.setState({ user: result })
        })
    }

    handleLogout = () => {
        firebase.auth().signOut().then(function () {
            console.log("Logged Out")
        }).catch(function (error) {
            console.log(error)
        });
    }

    handleLogin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(user => {
            this.setState({ user: user.user.displayName })
        }).catch(function (error) {
            // Handle Errors here.
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            db.collection("LoginErrors").doc(email).set(
                {
                    errorMessage: errorMessage,
                    email: email,
                    credential: credential
                }
            )
        });
    }

    render() {
        return (
            <div style={{ padding: "10px" }} >

                {
                    this.state.user === -1 ? (
                        <div className="acc-header" style={{ fontSize: "15px" }} >
                            <p style={{ fontSize: "20px", marginBottom: "5px" }} >
                                <b>Your Profile</b>
                            </p>
                                Log in or sign up to view your complete profile
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={this.handleLogin}
                                style={{ marginBottom: "30px", marginTop: "10px", width: "100%", textTransform: "none" }}
                            >
                                Sign In
                            </Button>
                            <div style={{ backgroundColor: "rgba(0,0,0,0.2)", height: '0.5px' }} ></div>
                        </div>
                    ) : this.state.user !== null ? (
                        <div className="acc-header" style={{ fontSize: "15px", display: "flex", justifyContent: "space-between" }} >
                            <div>
                                <p style={{ fontSize: "20px", marginBottom: "5px" }} >
                                    <b>{this.state.user[0]}</b>
                                </p>
                                {this.state.user[2]}
                                <div style={{ backgroundColor: "rgba(0,0,0,0.2)", height: '0.5px' }} ></div>
                            </div>
                            <div className="wrap" style={{ width: "auto" }} >
                                <img src={this.state.user[1]} width="70px" height="70px" style={{ borderRadius: "50%" }} />
                            </div>
                        </div>
                    ) : (
                                <div></div>
                            )
                }

                <div>
                    <div style={{ color: "rgba(0,0,0,0.4)", fontSize: '12px', textTransform: "uppercase", fontWeight: "700" }} >
                        General
                    </div>

                    <List component="nav" aria-label="main mailbox folders">
                        {
                            general.map(item => {
                                return (
                                    <ListItem button>
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={<div>{item.name}</div>} />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </div>

                <div>
                    <div style={{ color: "rgba(0,0,0,0.4)", fontSize: '12px', textTransform: "uppercase", fontWeight: "700" }} >
                        Help
                    </div>

                    <List component="nav" aria-label="main mailbox folders">
                        {
                            help.map(item => {
                                return (
                                    <ListItem button>
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={<div>{item.name}</div>} />
                                    </ListItem>
                                )
                            })
                        }
                    </List>

                </div>
                <strong>
                    <div className="account-options" onClick={this.handleLogout} >
                        Logout
                    </div>
                    <div className="account-options" >
                        Rate us on PlayStore
                    </div>
                    <div className="account-options" >
                        Feedback
                    </div>
                </strong>
                <div style={{ height: "100px" }} ></div>
            </div>
        )
    }
}

export default Account
