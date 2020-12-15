import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utils';

const initialState = {
  fullPost: null,
  loading: false,
  error: false,
  deleteStatus: null
};

const fetchFullPostStart = (state, action) => {
  return updateObject(state, {loading:true});
};
const fetchFullPostSuccess = (state, action) => {
  return updateObject(state,{
    fullPost:action.fullPost,
    loading:false
  });
};
const fetchFullPostFail = (state, action) => {
  return updateObject(state, {
    error:action.error,
    loading:false
  });
};

const deleteFullPostStart = (state, action) => {
  return updateObject(state, {loading:true});
};
const deleteFullPostSuccess = (state, action) => {
  return updateObject(state,{
    fullPost: null,
    deleteStatus:action.deleteStatus
  });
};
const deleteFullPostFail = (state, action) => {
  return updateObject(state, {
    error:action.error,
    loading:false
  });
};

const slapStatusFull = (state, action) => {
  return updateObject(state, {
    deleteStatus:null
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type){
    case actionTypes.FETCH_FULLPOST_START: return fetchFullPostStart(state, action);
    case actionTypes.FETCH_FULLPOST_SUCCESS: return fetchFullPostSuccess(state, action);
    case actionTypes.FETCH_FULLPOST_FAIL: return fetchFullPostFail(state, action);
    case actionTypes.DELETE_FULLPOST_START: return deleteFullPostStart(state, action);
    case actionTypes.DELETE_FULLPOST_SUCCESS: return deleteFullPostSuccess(state, action);
    case actionTypes.DELETE_FULLPOST_FAIL: return deleteFullPostFail(state, action);
    case actionTypes.SLAP_STATUS: return slapStatusFull(state, action);
    default: return state;
  }
};

export default reducer;