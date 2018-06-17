import * as types from '../actions/cards'
const initialState = {
  cards: [],
  friends: {
    isFetching: false,
    friends: []
  }
};

export default (state = initialState, action) => {
  switch(action.type) {
    case types.ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, action.card]
      };

    case types.FETCH_FRIENDS:
      return {
        ...state,
        friends: {
          ...state.friends,
          isFetching: true,
        }
      };
    case types.RECEIVE_FRIENDS:
      return {
        ...state,
        friends: {
          isFetching: false,
          friends: action.friends
        }
      };
    default:
      return state;
  }
}