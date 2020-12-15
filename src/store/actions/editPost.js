import * as actionTypes from './actionTypes';
import axios from '../../axios-posts';

export const slapStatusEdit = () => {
  return{
    type: actionTypes.SLAP_STATUS
  }
};
export const editPostStart = () => {
  return{
    type: actionTypes.EDIT_POST_START
  }
};
export const editPostSuccess = (status) => {
  return{
    type: actionTypes.EDIT_POST_SUCCESS,
    editStatus: status
  }
};
export const editPostFail = (error) => {
  return{
    type: actionTypes.EDIT_POST_FAIL,
    error: error
  }
};
export const editPost = (id, editData) => {
  return dispatch => {
    dispatch(editPostStart());
    axios.put('/posts/'+id+'.json', editData)
      .then(response => {
        dispatch(editPostSuccess(response.status));
      })
      .catch(err =>{
        dispatch(editPostFail(err));
      })
  }
};