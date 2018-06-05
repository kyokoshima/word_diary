import { call, put, takeEvery } from 'redux-saga/effects'
import { diaryConstants } from '../_constants';
import { diaryService } from '../_services';

function* add(action) {
    const { userId, word, file } = action;
    const { response, error } = yield call(diaryService.add, userId, word, file)
    if (response){
        yield put(success(response));
        yield put({type: diaryConstants.GETALL_REQUEST});
    } else {
        yield put(failure(error))
    }

    function success(response) { return { type: diaryConstants.ADD_SUCCESS, response } }
    function failure(error) { return { type: diaryConstants.ADD_FAILURE, error } }
}

function* getAll(action) {
    const { userId } = action;
    const { response, error } = yield call(diaryService.getAll, userId)
    if (response){
        yield put(success(response));
    } else {
        yield put(failure(error))
    }

    function success(diaries) { return { type: diaryConstants.GETALL_SUCCESS, diaries } }
    function failure(error) { return { type: diaryConstants.GETALL_FAILURE, error } }
}

function* _delete(action){
    const { id, userId } = action;
    const { error } = yield call (diaryService.delete, userId, id);
    if (!error) {
        yield put(success(id));
        yield put({type: diaryConstants.GETALL_REQUEST});
    } else {
        yield put(failure(id, error));
    }

    function success(id) { return { type: diaryConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: diaryConstants.DELETE_FAILURE, id, error } }
}

export const diarySaga = [
    takeEvery(diaryConstants.ADD_REQUEST, add),
    takeEvery(diaryConstants.GETALL_REQUEST, getAll),
    takeEvery(diaryConstants.DELETE_REQUEST, _delete)
];
