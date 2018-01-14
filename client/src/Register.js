import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Constants from './Constants'

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            password:''
        }
    }

    handleClick(event){
        var baseUrl = Constants.API_BASE_URL;
        console.log("values",this.state.name,this.state.email,this.state.password);
        var params={
            "name": this.state.name,
            "email":this.state.email,
            "password":this.state.password
        }
        axios.post(baseUrl + '/auth', params)
       .then((response) => {
            console.log(response);
            if(response.status == 200){
                console.log("Registration succeed");
                alert("Registration succeed!");
            }
       })
       .catch((error) => {
            console.log(error);
            alert("Registration failed");
       });
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                <div>
                <AppBar
                    title="Register"
                />
                <TextField
                    hintText="Enter your Name"
                    floatingLabelText="Name"
                    onChange = {(event,newValue) => this.setState({name:newValue})}
                    />
                <br/>
                <TextField
                    hintText="Enter your Email"
                    type="email"
                    floatingLabelText="Email"
                    onChange = {(event,newValue) => this.setState({email:newValue})}
                    />
                <br/>
                <TextField
                    type = "password"
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    onChange = {(event,newValue) => this.setState({password:newValue})}
                    />
                <br/>
                <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
  margin: 15,
};
