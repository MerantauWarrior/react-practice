import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utils';

const initialState = {
  loading: false,
  error: false,
  editStatus: null
};

const editPostStart = (state, action) => {
  return updateObject(state, {loading:true});
};
const editPostSuccess = (state, action) => {
  return updateObject(state,{
    loading:false,
    editStatus: action.editStatus
  });
};
const editPostFail = (state, action) => {
  return updateObject(state, {
    error:action.error,
    loading:false
  });
};

const slapStatusEdit = (state, action) => {
  return updateObject(state, {
    editStatus:null
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type){
    case actionTypes.EDIT_POST_START: return editPostStart(state, action);
    case actionTypes.EDIT_POST_SUCCESS: return editPostSuccess(state, action);
    case actionTypes.EDIT_POST_FAIL: return editPostFail(state, action);
    case actionTypes.SLAP_STATUS: return slapStatusEdit(state, action);
    default: return state;
  }
};

export default reducer;