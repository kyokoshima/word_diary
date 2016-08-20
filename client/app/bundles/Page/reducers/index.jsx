import pageReducer from './pageReducer';
import { $$initialState as $$pageState } from './pageReducer';

export default {
	$$pageStore: pageReducer,
};

export const initialStates = {
	$$pageState,
};
