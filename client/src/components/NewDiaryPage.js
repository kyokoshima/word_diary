import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';

export class NewDiaryPage extends Component {
  constructor(props){
      super(props);

      this.state = {
          word: '',
          file:[]
      };
  }

  handleSelectFile = (e) => {
      var files = e.target.files;
      this.setState({file: files[0]});
  }

  handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
      this.props.onAddClick(this.state.word, this.state.file);
  }

  render() {
    return (
      <div>
        <div>
          <Button>
              <input 
                  type="file"
                  accept=".jpg,.gif,.png,image/gif,image/jpeg,image/png"
                  onChange={e => this.handleSelectFile(e)}
              />
          </Button>
        </div>
        <div>
          <TextField
                  name='word'
                  onChange = {this.handleChange}
              />
        </div>
        
        <Button 
            variant="outlined" color="primary"
            label="Submit" primary={true} style={style} onClick={(event) => this.handleSubmit(event)}>
            Post
        </Button>
      </div>
    );
  }
}

const style = {
  margin: 15,
};