import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, CssBaseline, Grid, MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { LoginPage, DiaryPage, RegisterPage, NewDiaryPage } from './components';
import AppContainer from './AppContainer';
import { Provider, Subscribe } from 'unstated';

export default class App extends Component {

  render() { 
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#afd275',
        },
        secondary: {
          main: '#eae7dc',
        },
        background: {
          default: '#eae7dc',
        }
      }
    });
    return (
      <MuiThemeProvider theme={theme}>
        <Grid container>
          <Provider>
            <Subscribe to={[AppContainer]}>
              {appContainer => (
                <div>
                  <CssBaseline/>
                  <AppBar position='static'>
                    <Toolbar>
                      { appContainer.state.isNotHome &&
                        <IconButton>
                          <ArrowBackIcon />
                        </IconButton>
                      }
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
                        <Route path="/diary/new" component={NewDiaryPage} />
                      </div>
                    </BrowserRouter>
                  </Grid>
                </div>
              )}
            </Subscribe>
          </Provider>
        </Grid>
      </MuiThemeProvider>
    );
  }
}
