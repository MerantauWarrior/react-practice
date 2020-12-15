import * as actionTypes from './actionTypes';

export const login = () => {
  localStorage.setItem('authentication', true);
  return{
    type: actionTypes.LOGIN
  }
};
export const logout = (status) => {
  localStorage.removeItem('authentication');
  return{
    type: actionTypes.LOGOUT,
    addStatus: status
  }
};
export const authCheck = () => {
  return dispatch => {
    const authentication = localStorage.getItem('authentication');
    if (!authentication) {
      dispatch(logout());
    } else {
      dispatch(login());
    }
  };
};