import apiServices from "../apiServices";

export const ADD_CARD = 'ADD_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';
export const FETCH_FRIENDS = 'FETCH_FRIENDS';
export const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS';



const neededStats = [
  'total_kills',
  'total_deaths',
  'total_time_played',
  'total_matches_played',
  'total_wins',
  'total_mvps'
];

export const addCard = (steamid) => {
  return dispatch => {
    let player = {};

    return Promise.all([apiServices.get(`/steam/details/${steamid}`), apiServices.get(`/steam/stats/${steamid}`)]).then(res => {

      const playerstats = res[1].playerstats;

      player.steamID = res[0].response.players[0].steamid;
      player.nickname = res[0].response.players[0].personaname;
      player.avatar = res[0].response.players[0].avatarmedium;

      const playerStats = playerstats.stats
        .filter(({name}) => neededStats.includes(name))
        .reduce((prev, nexObj) => {
          return {
            ...prev,
            [nexObj.name]: nexObj.value,
          }
        }, {});


      player = {
        ...player,
        ...playerStats,
      };
      dispatch({
        type: ADD_CARD,
        card: player,
      })
    })
  }
};


export const fetchFriends = () => {
  return dispatch => {
    dispatch({
      type: FETCH_FRIENDS
    });
    return apiServices.get('/steam/friends').then(friends => {
      dispatch({
        type: RECEIVE_FRIENDS,
        friends
      })
    })
  }
};