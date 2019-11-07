import React, { Component } from 'react';
import { DebugUtil } from '../../utils/js';

export default class OrderListPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    this.validateAuth();
  };

  validateAuth = () => {
    if(sessionStorage && !sessionStorage.getItem('auth')) {
      this.props.history.push('/auth');
    }
  };

  render() {
    return (
      <div className="orderListPage">
        Order List Page
      </div>
    );
  }
}
