import Immutable from 'immutable';
import actionTypes from '../constants/pageConstants';

export const $$initialState = Immutable.fromJS({ name: '' });
export default function pageReducer($$state = $$initialState, action) {
	const { type, name } = action;
	switch(type) {
		case actionTypes.PAGE_DEFAULT:
			return $$state.set('name', name);
		default:
			return $$state;
	}
}
