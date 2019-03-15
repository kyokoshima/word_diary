import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, CssBaseline, Grid, MuiThemeProvider } from '@material-ui/core';

import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { DiaryPage }  from './components/DiaryPage';

export default class App extends Component {

  render() {  
    return (
      <MuiThemeProvider>
        <Grid container>
          <CssBaseline/>
          <AppBar position='static'>
            <Toolbar>
              <Typography type="title" color="inherit">
              
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid container>
            <BrowserRouter>
              <div>
                <Route exact path="/" component={DiaryPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
              </div>
            </BrowserRouter>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}
