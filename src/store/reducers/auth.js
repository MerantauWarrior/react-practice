import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utils';

const initialState = {
  isAuthenticated: false
};

const login = (state, action) => {
  return updateObject(state, {isAuthenticated:true});
};
const logout = (state, action) => {
  return updateObject(state, {isAuthenticated:false});
};

const reducer = (state = initialState, action) => {
  switch (action.type){
    case actionTypes.LOGIN: return login(state, action);
    case actionTypes.LOGOUT: return logout(state, action);
    default: return state;
  }
};

export default reducer;