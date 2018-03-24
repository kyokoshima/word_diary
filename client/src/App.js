import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import Home from './Home';
import NewDiary from './NewDiary';

import './css/App.scss';


export default class App extends Component {
    render() {
        return (
          <BrowserRouter>
            <div>
              <Route exact path='/' component={Login} />
              <Route path="/home" component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/new' component={NewDiary} />
            </div>
          </BrowserRouter>
        );
    }
}

const style = {
  margin: 15,
};
