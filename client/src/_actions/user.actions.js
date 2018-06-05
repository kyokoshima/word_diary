import { userConstants } from '../_constants';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

function login (username, password) {
    return {
        type: userConstants.LOGIN_REQUEST,
        password,
        username
    }
};

function logout() {
     return { type: userConstants.LOGOUT }
};

function register(user) {
    return {
        type: userConstants.REGISTER_REQUEST,
        user
    };
};

function getAll() {
    return { type: userConstants.GETALL_REQUEST }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return { type: userConstants.DELETE_REQUEST, id }
}
