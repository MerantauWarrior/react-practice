import React, {Component} from 'react';
import styles from './FullPost.module.css';
import {Redirect} from 'react-router-dom';
import Spinner from '../../../components/UI/Spinner/loader';

import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

class FullPost extends Component{
  componentDidMount(){
    this.props.onFetchFullPost(this.props.match.params.id);
  };

  componentWillUnmount(){
    this.props.onSlapStatusFull();
  };

  editPostHandler = () => {
    this.props.history.push('/edit-post/'+this.props.match.params.id);
  };

  deletePostHandler = () => {
    this.props.onDeleteFullPost(this.props.match.params.id);
  };

  goBackHandler = () => {
    this.props.history.push('/posts');
  };

  render(){
    let deleteRedirection = null;
    if(this.props.statusCode === 200){
      deleteRedirection = <Redirect to='/posts'/>
    }
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    if ( this.props.loading ) {
      post = <Spinner/>;
    }
    if ( this.props.fullPost ) {
      post = (
        <div className={styles.FullPost}>
          <button className={styles.BtnGoBack} onClick={this.goBackHandler}>go back</button>
          <h1 className={styles.Title}>{this.props.fullPost.title}</h1>
          <div className={styles.Body}>
            {this.props.fullPost.text}
            <p className={styles.Info}>
              <span className={styles.Author}>Author: {this.props.fullPost.author}</span>
              <span className={styles.Category}>Catefory: {this.props.fullPost.category}</span>
            </p>
          </div>
          <button onClick={this.editPostHandler} className={styles.BtnEdit}>Edit</button>
          <button onClick={this.deletePostHandler} className={styles.BtnDelete}>Delete</button>
        </div>
      );
    }
    return(
      <div>
        {deleteRedirection}
        {post}
      </div>
    );
  }
}

const mapStateToPrors = state => {
  return{
    fullPost: state.fullPost.fullPost,
    loading: state.fullPost.loading,
    error: state.fullPost.error,
    statusCode: state.fullPost.deleteStatus
  }
};
const mapDispatchToProps = dispatch => {
  return{
    onFetchFullPost: (id) => dispatch(actions.fetchFullPost(id)),
    onDeleteFullPost: (id) => dispatch(actions.deleteFullPost(id)),
    onSlapStatusFull: () => dispatch(actions.slapStatusFull())
  }
};

export default connect(mapStateToPrors, mapDispatchToProps)(FullPost);