import apiServices from '../apiServices';

export const FETCH_USER = 'FETCH_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const fetchUser = () => (dispatch) => {
  dispatch({
    type: FETCH_USER,
  });
  return apiServices.get('/user').then((user) => {
    dispatch({
      type: RECEIVE_USER,
      user,
    });
    return user;
  });
};

export const logoutUser = () =>


  dispatch => apiServices.get('/logout').then(() => {
    dispatch({
      type: LOGOUT_USER,
    });
  });

