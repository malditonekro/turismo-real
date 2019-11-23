import React, { Component } from 'react';
import { DebugUtil } from '../../utils/js';
import OrderList from '../../components/OrderList';

export default class OrderListPage extends Component {

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
        <OrderList />
      </div>
    );
  }
}
