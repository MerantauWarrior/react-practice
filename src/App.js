import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import ErrorPage from './components/ErrorPage/ErrorPage';

import Home from './containers/Home/Home';
import Video from './containers/Video/Video';
import Posts from './containers/Posts/Posts';
import FullPost from './containers/Posts/FullPost/FullPost';
import NewPost from './containers/Posts/NewPost/NewPost';
import EditPost from './containers/Posts/EditPost/EditPost';
import Login from './containers/Auth/Login';
import Logout from './containers/Auth/Logout';

class App extends Component {
  componentDidMount(){
    this.props.onAuthCheck();
  };
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/video" component={Video}/>
        <Route path="/login" component={Login}/>
        <Route component={ErrorPage}/>
      </Switch>
    );
    if(this.props.isAuthenticated === true){
      routes = (
        <Switch>
          <Route path="/video" component={Video}/>
          <Route path="/posts" exact component={Posts}/>
          <Route path="/posts/:id" exact component={FullPost}/>
          <Route path="/new-post" exact component={NewPost}/>
          <Route path="/edit-post/:id" exact component={EditPost}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" exact component={Home}/>
          <Route path="*" component={ErrorPage}/>
        </Switch>
      );
    }
    return (
      <Layout isAuth={this.props.isAuthenticated}>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.isAuthenticated
  }
};
const mapDispatchToProps = dispatch => {
  return{
    onAuthCheck: () => dispatch(actions.authCheck())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
