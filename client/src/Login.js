import React, {Component} from 'react';
import {AppBar, Button, TextField, Grid} from 'material-ui';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Constants from './Constants';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleClick(event) {
        var apiBaseUrl = Constants.API_BASE_URL;
        var params = {
            "email": this.state.username,
            "password": this.state.password,
            "password_confirmation": this.state.password
        }
        axios
            .post(apiBaseUrl + '/auth/sign_in', params)
            .then((response) => {
                // Login succeed
                alert("Login succeed!");
                console.log(response);
                console.log("Login succeed");

                // Save access token to local storage
                localStorage.setItem(Constants.USER_TOKEN, response.headers['access-token']);
                localStorage.setItem(Constants.USER_CLIENT, response.headers['client']);
                localStorage.setItem(Constants.USER_UID, response.headers['uid']);
                localStorage.setItem(Constants.USER_ID, response.data.data['id']);
            })
            .catch((error) => {
                if (error.response.status == 401) {
                    console.log("Username or password do not match");
                    alert("username or password do not match");
                } else {
                    console.log(error);
                }
            });
    }

    render() {
        return (
            <div className="login-container">
                <Grid container rspacing={24}>
                    <Grid item xs={12}>
                        <div className="logo">A Word Diary</div>
                    </Grid>
                    <Grid item cs={12}>
                        <TextField
                            placeholder="Enter your email"
                            label="Email"
                            onChange=
                            {(event,newValue) => this.setState({username:newValue})}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="password"
                            placeholder="Enter your Password"
                            label="Password"
                            onChange=
                            {(event,newValue) => this.setState({password:newValue})}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="raised"
                            color="primary"
                            onClick={(event) => this.handleClick(event)}>
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        Not registered yet, Register Now
                        <br/>
                        <Link to='/register'>
                            <Button variant="raised" color="primary">
                                Register
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
const style = {
    margin: 15
}