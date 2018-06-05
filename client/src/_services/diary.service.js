import { authHeader } from '../_helpers';
import { apiConstants } from '../_constants';
import axios from 'axios';

export const diaryService = {
    add,
    getAll,
    delete: _delete
};

function add(userId, word, file) {
    const requestOptions = {
        headers: authHeader()
    };

    var params = new FormData();
    params.append('diary[image]', file);
    params.append('diary[word]', word);
    params.append('diary[weather]', 'sunny');
    params.append('diary[temperature]', '10');
    params.append('diary[post_date]', '2018/01/01');
    params.append('diary[place]', 'Japan');
    params.append('diary[show_weather]', 'false');
    params.append('diary[show_temp]', 'false');
    params.append('diary[show_date]', 'false');
    params.append('diary[show_location]', 'false');
    
    return axios.post(apiConstants.URL + '/users/' + userId +'/diaries', params, requestOptions)
    .then(respose => ({ response: respose.data }))
    .catch(error => ({error}));
}

function getAll(userId) {
    const requestOptions = {
        headers: authHeader()
    };

    
    return axios.get(apiConstants.URL + '/users/' + userId + '/diaries', requestOptions)
    .then(respose => ({ response: respose.data }))
    .catch(error => ({error}));
}


// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(userId, id) {
    const requestOptions = {
        headers: authHeader()
    };

    return axios.delete(apiConstants.URL + '/users/' + userId + '/diaries/' + id, requestOptions)
    .then(respose => ({ response: respose.data }))
    .catch(error => ({error}));
}
