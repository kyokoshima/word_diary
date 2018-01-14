import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Constants from './Constants';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }

    handleClick(event){
        var apiBaseUrl = Constants.API_BASE_URL;
        var params={
            "email":this.state.username,
            "password":this.state.password,
            "password_confirmation":this.state.password
        }
        axios.post(apiBaseUrl+'/auth/sign_in', params)
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
                if (error.response.status == 401){
                    console.log("Username or password do not match");
                    alert("username or password do not match");
                }
                else{
                    console.log(error);
                }
            }
        );
    }

render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Login"/>
            <TextField
                hintText="Enter your email"
                floatingLabelText="Email"
                onChange = {(event,newValue) => this.setState({username:newValue})}
            />
            <br/>
            <TextField
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange = {(event,newValue) => this.setState({password:newValue})}
            />
            <br/>
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         <div>
            Not registered yet, Register Now
            <br/>
            <Link to='/register'>
                <RaisedButton label="Register" primary={true} style={style}/>
            </Link>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
