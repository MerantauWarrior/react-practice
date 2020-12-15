import * as actionTypes from './actionTypes';
import axios from '../../axios-posts';

export const slapStatusFull = () => {
  return{
    type: actionTypes.SLAP_STATUS
  }
};
export const fetchFullPostStart = () => {
  return{
    type: actionTypes.FETCH_FULLPOST_START
  }
};
export const fetchFullPostSuccess = (fullPost) => {
  return{
    type: actionTypes.FETCH_FULLPOST_SUCCESS,
    fullPost: fullPost
  }
};
export const fetchFullPostFail = (error) => {
  return{
    type: actionTypes.FETCH_FULLPOST_FAIL,
    error: error
  }
};
export const fetchFullPost = (id) => {
  return dispatch => {
    dispatch(fetchFullPostStart());
    axios.get('/posts.json?id='+id)
      .then(response => {
        dispatch(fetchFullPostSuccess(response.data[id]));
      })
      .catch(err =>{
        dispatch(fetchFullPostFail(err));
      })
  }
};

export const deleteFullPostStart = () => {
  return{
    type: actionTypes.DELETE_FULLPOST_START
  }
};
export const deleteFullPostSuccess = (deleteStatus) => {
  return{
    type: actionTypes.DELETE_FULLPOST_SUCCESS,
    deleteStatus: deleteStatus
  }
};
export const deleteFullPostFail = (error) => {
  return{
    type: actionTypes.DELETE_FULLPOST_FAIL,
    error: error
  }
};
export const deleteFullPost = (id) => {
  return dispatch => {
    dispatch(deleteFullPostStart());
    axios.delete('/posts/'+id+'.json')
      .then(response => {
        dispatch(deleteFullPostSuccess(response.status));
      })
      .catch(err => {
        dispatch(deleteFullPostFail(err));
      });
  }
};