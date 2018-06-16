import * as types from '../actions/user'
const initialState = {
  user: null,
  fetching: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case types.FETCH_USER:
      return {
        ...state,
        fetching: true,
      };
    case types.RECEIVE_USER:
      return {
        ...state,
        user: action.user,
        fetching: false
      };
    default:
      return state;
  }
}