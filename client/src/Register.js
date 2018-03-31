import React, { Component } from 'react';
import { AppBar, Button, TextField } from 'material-ui';
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
                <Button variant="raised" label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                </div>
            </div>
        );
    }
}

const style = {
  margin: 15,
};
