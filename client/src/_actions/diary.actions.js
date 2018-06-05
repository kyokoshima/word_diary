import { diaryConstants } from '../_constants';

export const diaryActions = {
    add,
    getAll,
    delete: _delete
};


function getAll(userId) {
    return { type: diaryConstants.GETALL_REQUEST, userId}
}

function add(userId, word, file) {
    return { type: diaryConstants.ADD_REQUEST, word, file}
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(userId, id) {
    return { type: diaryConstants.DELETE_REQUEST, userId, id }
}
