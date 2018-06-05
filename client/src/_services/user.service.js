import { authHeader } from '../_helpers';
import { apiConstants } from '../_constants';
import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(email, password) {
    const params={
        "email": email,
        "password": password,
        "password_confirmation": password
    }
    return axios.post(apiConstants.URL + '/auth/sign_in', params)
        .then((response => {
            if (response.status !== 200) { 
                return Promise.reject(response.statusText);
            }

            // fetch API cannot access some response header.
            // axios can accesss it
            return { 
                token: response.headers['access-token'],
                uid: response.headers['uid'],
                client: response.headers['client'],
                userId: response.data.data.id
            }
        }))
        .then((user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return { response: user };
        }))
        .catch((error => { 
            if (error.response === undefined)
                // Network error
                return { error: error.message }

            return { error: error.response.data.errors[0]}                    
        }));
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(apiConstants.URL + '/users', requestOptions)
    .then(handleResponse)
    .catch(error => ({error}));
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(apiConstants.URL + '/users/' + id, requestOptions)
    .then(handleResponse)
    .catch(error => ({error}));
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(apiConstants.URL + '/auth', requestOptions)
    .then(handleResponse)
    .catch(error => ({error}));
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/users/' + user.id, requestOptions)
    .then(handleResponse)
    .catch(error => ({error}));
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/users/' + id, requestOptions)
    .then(handleResponse)
    .catch(error => ({error}));
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return { response: response.json() };
}