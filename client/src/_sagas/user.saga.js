import { call, put, takeEvery } from 'redux-saga/effects'
import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from '../_actions';
import { history } from '../_helpers';


function* login(action) {
    console.log('login called');
    const { username, password } = action;
    const { response, error } = yield call(userService.login, username, password);

    if (response){
        yield put (success(response));
        yield call(history.push, '/');
    } else {
        yield put (failure(error));
        yield put (alertActions.error(error));
    };

    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function* logout() {
    yield call (userService.logout);
}

function* register(action) {
    const { user } = action;
    const { response, error } = yield call (userService.register, user);

    if (response) {
        yield put (success());
        history.push('/login');
        yield put (alertActions.success('Registration successful'));
    } else {
        yield put (failure(error));
        yield put (alertActions.error(error));
    }

    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function* getAll(action) {
    const { response, error } = yield call(userService.getAll)
    if (response){
        yield put(success(response));
    } else {
        yield put(failure(error))
    }

    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function* _delete(action){
    const { id } = action;
    const { response, error } = yield call (userService.delete, id);
    if (response) {
        yield put(success(id));
    } else {
        yield put(failure(id, error));
    }

    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}

export const userSaga = [
    takeEvery(userConstants.LOGIN_REQUEST, login),
    takeEvery(userConstants.LOGOUT, logout),
    takeEvery(userConstants.REGISTER_REQUEST, register),
    takeEvery(userConstants.GETALL_REQUEST, getAll),
    takeEvery(userConstants.DELETE_REQUEST, _delete)
];
