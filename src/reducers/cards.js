import * as types from '../actions/cards'
const initialState = {
  cards: [],
  friends: {
    isFetching: false,
    friends: []
  },
  dBfriends: {
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
    case types.FETCH_DB_FRIENDS:
      return {
        ...state,
        dBfriends: {
          ...state.dBfriends,
          isFetching: true,
        }
      };
    case types.RECEIVE_DB_FRIENDS:
      const friends = action.friends.map(friend => ({ steamid: friend }))
      return {
        ...state,
        dBfriends: {
          isFetching: false,
          friends: friends
        }
      };
    default:
      return state;
  }
}