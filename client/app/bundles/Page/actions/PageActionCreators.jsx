import actionTypes from '../constants/pageConstants';

export function updateName(name) {
	return {
		type: actionTypes.PAGE_DEAFULT,
		name,
	};
}
