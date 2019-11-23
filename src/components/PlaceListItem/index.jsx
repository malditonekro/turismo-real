import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Calendar  from '../Calendar/Calendar';

export default class PlaceListItemComponent extends Component {

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
    return (
      <div className="placeListItem" key={`place-${idDepartamento}`}>
        <div className="title">{nombre}</div>
        <div className="image">
          <img src={fotografias} alt={nombre}/>
        </div>
        <div className="details">
          <ul>
            <li>Dirección: {direccion}</li>
            <li>Inmobiliaria: {inmobiliaria}</li>
            <li>Observaciones: {observaciones}</li>
            <li>Valor: {valorArriendo}</li>
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
