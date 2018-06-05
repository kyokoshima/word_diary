import { all } from 'redux-saga/effects'
import { userSaga } from './user.saga';
import { diarySaga } from './diary.saga';
export default function* rootSaga() {
    yield all([
        ...userSaga,
        ...diarySaga,
    ])
}