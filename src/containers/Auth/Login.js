import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class Logout extends Component {
  componentDidMount () {
    this.props.onLogout();
  }
  render () {
    return <Redirect to="/posts"/>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.login())
  };
};

export default connect(null, mapDispatchToProps)(Logout);