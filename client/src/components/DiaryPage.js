import React, { Component } from 'react';
import axios from 'axios';
import { Grid, GridList, GridListTile, Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import AppContainer from '../AppContainer';

export class DiaryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    }
    this.requestData.bind(this);
    this.handleClickFab.bind(this);
  }
  requestData = () => {
    axios.get('/photos', {
      baseURL: 'https://api.unsplash.com/',
      headers: {
        'Authorization': 'Client-ID 76b9f34008a8fff2c8aa66656505bc425d618d8e082c66ec706bdbbb05559721'
      },
      params: {
        per_page: 30
      }
    }).then((response) => {
      this.setState({ photos: response.data.map(v => { return {id: v.id, url: v.urls.thumb }})});
    });
  }
  componentDidMount() {
    this.requestData();
  }
  handleClickFab(e) {
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <Grid container justify='center' alignItems='center'>
          <Grid lg={6}>
            <GridList cols={3}>
              {this.state.photos.map(photo =>
                <GridListTile key={photo.id}>
                  <img src={photo.url} />
                </GridListTile>
              )}
            </GridList>
          </Grid>
          <Fab style={{bottom: 20, right: 20, position: 'fixed'}} onClick={this.handleClickFab}>
            <Link to="/diary/new">
              <Add />
            </Link>
          </Fab>
        </Grid>
      </div>
    );
  }
}