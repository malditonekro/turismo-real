import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Calendar  from '../Calendar/Calendar';

export default class PlaceListItemComponent extends Component {

  currencyPrice(price) {
    const formatter = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    });

    return formatter.format(price);
  }

  render() {
    const { 
      idDepartamento = 0,
      nombre = '',
      direccion = '',
      inmobiliaria = '',
      valorArriendo = null,
      observaciones = '',
      fotografias = ''
    } = this.props.place;

    let num = Math.round(Math.random()*(511-500)+parseInt(500));
    let imge = "https://picsum.photos/id/" + num + "/600/600";

    return (
      <div className="placeListItem" key={`place-${idDepartamento}`}>
        <div className="title">{nombre}</div>
        <div className="image">
          <img src={imge} alt={nombre}/>
        </div>
        <div className="details">
          <ul>
            <li>Dirección: {direccion}</li>
            <li>Inmobiliaria: {inmobiliaria}</li>
            <li>Valor: {this.currencyPrice(valorArriendo)}</li>
          </ul>
        </div>
        <div className="seeDetailsBox">
          <NavLink
            className="seeDetails btn btn-info"
            to={`/detail/${idDepartamento}`}
            onClick={e => e.stopPropagation()}>
            Ver Detalle
          </NavLink>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

PlaceListItemComponent.defaultProps = {
  place: {}
};

PlaceListItemComponent.propTypes = {
  place: PropTypes.object
};
