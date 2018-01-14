import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class Diary extends Component {
  constructor(props){
      super(props);
      this.state={
        isDialogOpened: false
    }
  }

  handleDialogOpen() {
    this.setState({isDialogOpened: true});
  }

  handleCancel = () => {
    this.setState({isDialogOpened: false});
  }

  handleDelete = () => {
    this.setState({isDialogOpened: false});
    this.props.deleteDiary(this.props);
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCancel}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onClick={this.handleDelete}
      />,
    ];

    return (
      <div>
        <Dialog
              actions={actions}
              modal={true}
              open={this.state.isDialogOpened}
        >
          Are you sure to delete the diary?
        </Dialog>
        <img src={this.props.image}/>
        <br/>
        {this.props.word}
        <br/>
        <RaisedButton label="Edit" primary={true} style={style}/>
        <RaisedButton 
          label="Delete"
          primary={true}
          style={style}
          onClick={(e) => { e.preventDefault(); this.handleDialogOpen() }}
        />
      </div>
    );
  }
}
const style = {
 margin: 15,
};