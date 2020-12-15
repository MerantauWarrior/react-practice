import * as actionTypes from './actionTypes';
import axios from '../../axios-posts';

export const fetchPostsStart = () => {
  return{
    type: actionTypes.FETCH_POSTS_START
  }
};
export const fetchPostsSuccess = (posts) => {
  return{
    type: actionTypes.FETCH_POSTS_SUCCESS,
    posts: posts
  }
};
export const fetchPostsFail = (error) => {
  return{
    type: actionTypes.FETCH_POSTS_FAIL,
    error: error
  }
};
export const fetchPosts = () => {
  return dispatch => {
    dispatch(fetchPostsStart());
    axios.get('/posts.json')
      .then(response => {
        const fetchedPosts =[];
        for (let key in response.data){
          fetchedPosts.push({
            ...response.data[key],
            id: key
          });
        }
        dispatch(fetchPostsSuccess(fetchedPosts));
      })
      .catch(err => {
        dispatch(fetchPostsFail(err));
      });
  }
};