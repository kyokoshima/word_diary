import React, { Component } from 'react';
import { AppBar, Button, TextField} from 'material-ui/AppBar';
import axios from 'axios';
import Constants from './Constants'


export default class NewDiary extends Component {
  constructor(props){
      super(props);

      this.state = {
        word: '',
        file:[]
      };
  }

  handleSelectFile(e) {
    var files = e.target.files;
    this.setState({file: files[0]});
  }

  handleSubmit(event) {
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

    var params = new FormData();
    params.append('diary[image]', this.state.file);
    params.append('diary[word]', this.state.word);
    params.append('diary[weather]', 'sunny');
    params.append('diary[temperature]', '10');
    params.append('diary[post_date]', '2018/01/01');
    params.append('diary[place]', 'Japan');
    params.append('diary[show_weather]', 'false');
    params.append('diary[show_temp]', 'false');
    params.append('diary[show_date]', 'false');
    params.append('diary[show_location]', 'false');
    var baseUrl = Constants.API_BASE_URL;
    axios.post(baseUrl + '/users/' + userId +'/diaries', params, config)
    .then((response) => {
      // Succeed
      alert('New post succeed');
      console.log(response);
      console.log("New post successfull");
    })
    .catch((error) => {
      // Error
      alert('New post failed');
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <AppBar title="New Diary"/>
        <div>
          <Button variant="raised" labelPosition="before" containerElement="label">
            <input 
              type="file"
              accept=".jpg,.gif,.png,image/gif,image/jpeg,image/png"
              onChange={e => this.handleSelectFile(e)}
            />
          </Button>
          <br/>
          <TextField
                hintText="Enter a word"
                floatingLabelText="A word"
                onChange = {(event,newValue) => this.setState({word:newValue})}
            />
          <br/>
          <Button variant="raised" label="Submit" primary={true} style={style} onClick={(event) => this.handleSubmit(event)}/>
        </div>
        </div>
    );
  }
}

const style = {
  margin: 15,
};
