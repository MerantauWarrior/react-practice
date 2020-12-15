import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utils';

const initialState = {
  loading: false,
  error: false,
  addStatus: null
};

const newPostsStart = (state, action) => {
  return updateObject(state, {loading:true});
};
const newPostsSuccess = (state, action) => {
  return updateObject(state,{
    loading:false,
    addStatus: action.addStatus
  });
};
const newPostsFail = (state, action) => {
  return updateObject(state, {
    error:action.error,
    loading:false
  });
};

const slapStatusNew = (state, action) => {
  return updateObject(state, {
    addStatus:null
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type){
    case actionTypes.NEW_POST_START: return newPostsStart(state, action);
    case actionTypes.NEW_POST_SUCCESS: return newPostsSuccess(state, action);
    case actionTypes.NEW_POST_FAIL: return newPostsFail(state, action);
    case actionTypes.SLAP_STATUS: return slapStatusNew(state, action);
    default: return state;
  }
};

export default reducer;