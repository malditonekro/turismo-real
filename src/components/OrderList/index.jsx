import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { api } from '../../utils/js';

export default class OrderListComponent extends Component {

  constructor(props){
    super(props);
    this.state = {
      orders: []
    }
  }

  componentWillMount = () => {
    this.getOrdersList();
  }

  getOrdersList = async () => {
    const user = JSON.parse(sessionStorage.getItem('auth'));
    if(user) {
      const orders = await api.fetchReservasByUser(user.personaDTO.idPersona);
      console.log('orders',orders);
      this.setState({
        orders
      });
    }
  };

  getOrders = () => {
    return this.state.orders.map((order) => {
      const splittedFrom = order.fechaReservaInicio.split('-');
      const splittedTo = order.fechaReservaFin.split('-');
      const from = new Date(`20${splittedFrom[2]}`, splittedFrom[1]-1, splittedFrom[0]);
      const to = new Date(`20${splittedTo[2]}`, splittedTo[1]-1, splittedTo[0]);
      const cantDias = (to-from) / 86400000;
      return <div key={`orderL-${order.idReserva}`} className="itemReserva">
        <h3>Reserva nº: {order.idReserva}</h3>
        <span>Fecha de inicio: {order.fechaReservaInicio}</span>
        <span>Fecha de término: {order.fechaReservaFin}</span>
        <span>Cantidad de días: {cantDias}</span>
      </div>
    });
  };

  render() {
    return (
      <div className="card mb-3 orderListx">
        {this.getOrders()}        
      </div>
    )
  }
}