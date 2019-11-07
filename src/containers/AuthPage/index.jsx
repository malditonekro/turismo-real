import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DebugUtil } from '../../utils/js';
import AuthComponent from '../../components/Auth';

export default class AuthPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    this.validateAuth();
  };

  validateAuth = () => {
    if(sessionStorage && sessionStorage.getItem('auth')) {
      this.props.history.push('/home');
    }
  };

  render() {
    return (
      <div className="authPage">
        <AuthComponent history={this.props.history}/>
      </div>
    );
  }
}

AuthPage.propTypes = {
  history: PropTypes.object
};

AuthPage.defaultProps = {
  history: {}
};