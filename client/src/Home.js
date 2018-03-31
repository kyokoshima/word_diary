import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import DiaryList from './DiaryList'
import Button from 'material-ui/Button'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Constants from './Constants'

export default class Home extends Component {
  constructor(props){
      super(props);
      this.state={
          diaries:[],
          isLoaded: false
      }
  }

  fetchData() {
    const token = localStorage.getItem(Constants.USER_TOKEN);
    const client = localStorage.getItem(Constants.USER_CLIENT);
    const uid = localStorage.getItem(Constants.USER_UID);
    const userId = localStorage.getItem(Constants.USER_ID);

    var config = {
      headers: {
        'content-type': 'multipart/form-data',
        'access-token': token,
        'client': client,
        'uid': uid
      }
    }

    var baseUrl = Constants.API_BASE_URL;
    axios.get(baseUrl + '/users/' + userId +'/diaries', config)
    .then((response) => {
      // Succeed
      this.setState({ diaries: response.data });
      this.setState({ isLoaded: true });

      console.log(response);
      console.log("New post successfull");
    })
    .catch((error) => {
      // Error
      console.log(error);
    });
  }
  
  deleteData(diaryId) {
    const token = localStorage.getItem(Constants.USER_TOKEN);
    const client = localStorage.getItem(Constants.USER_CLIENT);
    const uid = localStorage.getItem(Constants.USER_UID);
    const userId = localStorage.getItem(Constants.USER_ID);

    var config = {
      headers: {
        'access-token': token,
        'client': client,
        'uid': uid
      }
    }

    var baseUrl = Constants.API_BASE_URL;
    axios.delete(baseUrl + '/users/' + userId + '/diaries/' + diaryId, config)
    .then((response) => {
      // Succeed
      console.log(response);
      console.log("Delete succeed");
    })
    .catch((error) => {
      // Error
      console.log(error);
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  deleteDiary(clickDiary) {
    this.deleteData(clickDiary.id);
    const diaries = this.state.diaries.slice();
    diaries.splice(clickDiary.index, 1);
    this.setState({ diaries });
  }

  render() {
    if (this.state.isLoaded){
      return (
        <div>
            <AppBar title="Home"/>
            <DiaryList diaries={this.state.diaries} deleteDiary={this.deleteDiary.bind(this)}/>
            <Link to='/new'>
              <Button variant="fab"/>
            </Link>
        </div>
      )
    }
    
    return (
      <div>
        this is home
      </div>
    );
  }
}
const style = {
 margin: 15,
};
