import React from 'react';
import { connect } from 'react-redux';
import { diaryActions } from '../_actions';
import { userId } from '../_helpers/user';
import Diary from './Diary';
import NewDiary from './NewDiary';

class DiaryPage extends React.Component {
    componentWillMount() {
        this.props.dispatch(diaryActions.getAll(userId()));
    }

    handleAddClick = (word, file) => {
        this.props.dispatch(diaryActions.add(userId(), word, file));
    }

    handleDeleteClick = (id) => {
        this.props.dispatch(diaryActions.delete(userId(), id));
    }

    render() {
        const { diaries } = this.props;
        return (
            <div>
                <NewDiary onAddClick={this.handleAddClick}/>
                <hr />
                {(()=> {
                    if (diaries !== undefined){
                        return (
                            <div>
                                {diaries.slice(0).reverse().map((item) => {
                                    return <Diary diary={item} key={item.id} onDeleteClick={this.handleDeleteClick}/>;
                                })}
                            </div>
                        );
                    } else {
                        return (
                            <div className="col-md-6 col-md-offset-3">
                                <h2>loading...</h2>
                            </div>
                        ); 
                    }
                })()}
            </div>
        );
        
    }
}

function mapStateToProps(state) {
    const diariesState = state.diaries;
    const { diaries, loading } = diariesState;
    return {
        diaries,
        loading
    };
}

const connectedDiaryPage = connect(mapStateToProps)(DiaryPage);
export { connectedDiaryPage as DiaryPage };