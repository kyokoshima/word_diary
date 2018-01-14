import React, { Component } from 'react';
import logo from './logo.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { TextField, RaisedButton } from 'material-ui';
import './App.css';
import { RadioButton } from 'material-ui/RadioButton';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">A Word Diary</h1>
          </header>
          <div>
            <div>
             <TextField hintText="Email" />
            </div>
            <div>
              <TextField hintText="Password" type="password" />
            </div>
            <div>
              <RaisedButton label="Sign in" primary={true} />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
