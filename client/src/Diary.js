import React, { Component } from 'react';
import { Button, Dialog } from 'material-ui';

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
      <Button
        label="Cancel"
        primary={true}
        onClick={this.handleCancel}
      />,
      <Button
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
        <Button variant="raised"label="Edit" primary={true} style={style}/>
        <Button variant="raised"
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