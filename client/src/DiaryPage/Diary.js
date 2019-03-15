import React from 'react';
import Card, { CardHeader, CardMedia, CardActions } from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

class Diary extends React.Component {
    handleDeleteClick = () => {
        this.props.onDeleteClick(this.props.diary.id);
    }

    render(){
        return (
            <Card style={{ margin: '32px auto' }}>
                <CardHeader title={this.props.diary.word}/>
                <CardMedia
                    image={'http://localhost:3000' + this.props.diary.image.url}
                    style={{ height: '200px' }}
                    />
                <CardActions>
                    <Button onClick={this.handleDeleteClick}>delete</Button>
                </CardActions>
            </Card>
        );
    }
}

export default Diary;