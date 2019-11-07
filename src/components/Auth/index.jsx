import React, { Component } from 'react';
import { Formik } from 'formik';
import classNames from 'classnames';
import { DebugUtil } from '../../utils/js';
import SignInComponent from '../../components/SignIn';
import SignUpComponent from '../../components/SignUp';

const log = DebugUtil.log.bind(DebugUtil, 'AuthComponent /> ');

export default class AuthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: true
    }
    this.switchView = this.switchView.bind(this);
  }

  switchView = () => {
    this.setState({
      signIn: !this.state.signIn
    })
  }

  render() {
    return (
      <div className="auth">
        { this.state.signIn && <SignInComponent switchView={this.switchView} history={this.props.history} /> }
        { !this.state.signIn && <SignUpComponent switchView={this.switchView} history={this.props.history} /> }
      </div>
    );
  }
}

AuthComponent.defaultProps = {
  history: {},
  handleGetPlacesResponse: () => {}
};
