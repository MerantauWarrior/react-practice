import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styles from './Posts.module.css';
import Spinner from '../../components/UI/Spinner/loader';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

import Post from '../../components/Post/Post';

class Posts extends Component {
  componentDidMount(){
    this.props.onFetchPosts();
  };

  postClickHandler = (id) => {
    this.props.history.push('/posts/'+id);
  };

  render() {
    let posts = <p>Something went wrong!</p>;
    if(!this.props.error){
      posts = this.props.posts.map(post => {
        return <Post
                key={post.id}
                clicked={() => this.postClickHandler(post.id)}
                title={post.title}
                author={post.author}
                category={post.category}
                 />
      });
    }
    return (
      <div className={styles.Posts}>
        <div className={styles.Add}>
          <Link to="/new-post" title="Add new" id="addpost" className={styles.AddLink} >add new post</Link>
        </div>
        {this.props.loading === false ? posts : <Spinner/>}
      </div>
    );
  }
}

const mapStateToPrors = state => {
  return{
    posts: state.posts.posts,
    loading: state.posts.loading,
    error: state.posts.error
  }
};
const mapDispatchToProps = dispatch => {
  return{
    onFetchPosts: () => dispatch(actions.fetchPosts())
  }
};

export default connect(mapStateToPrors, mapDispatchToProps)(Posts);