import * as actionTypes from './actionTypes';
import axios from '../../axios-posts';

export const slapStatusNew = () => {
  return{
    type: actionTypes.SLAP_STATUS
  }
};

export const newPostsStart = () => {
  return{
    type: actionTypes.NEW_POST_START
  }
};
export const newPostsSuccess = (status) => {
  return{
    type: actionTypes.NEW_POST_SUCCESS,
    addStatus: status
  }
};
export const newPostsFail = (error) => {
  return{
    type: actionTypes.NEW_POST_FAIL,
    error: error
  }
};
export const newPosts = (postData) => {
  return dispatch => {
    dispatch(newPostsStart());
    axios.post('/posts.json', postData)
      .then(response => {
        dispatch(newPostsSuccess(response.status))
      })
      .catch(err =>{
        dispatch(newPostsFail(err));
      });
  }
};