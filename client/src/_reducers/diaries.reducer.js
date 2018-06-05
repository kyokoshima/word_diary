import { diaryConstants } from '../_constants';

const initialState = { diaries: undefined };

export function diaries(state = initialState, action) {
  switch (action.type) {
    case diaryConstants.GETALL_REQUEST:
      return { diaries: undefined };
    case diaryConstants.GETALL_SUCCESS:
      return {
        ...state,
        diaries: action.diaries
      };
    case diaryConstants.GETALL_FAILURE:
      return {};
    default:
      return state;
  }
}