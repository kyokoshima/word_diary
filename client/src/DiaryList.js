import React, { Component } from 'react';
import Diary from './Diary';

export default class DiaryList extends Component {
  render() {
    const diaries = [];
    for (var i = 0; i < this.props.diaries.length; i++) {
      diaries.push(
        <Diary
          key={i}
          index={i}
          id={this.props.diaries[i].id}
          image={this.props.diaries[i].image.url}
          word={this.props.diaries[i].word}
          deleteDiary={this.props.deleteDiary}
        />
      );
    }

    return(
      <ul>
        {diaries}
      </ul>
    );
  }
}