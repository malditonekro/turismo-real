import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PlaceListToursItemComponent extends Component {

  numero() {
    return Math.round(Math.random()*(511-500)+parseInt(500));
  }

  render() {
    let img = "https://picsum.photos/id/"+this.numero()+"/500/500";
    const {
      idTour = '',
      nombre = '',
      costoMantencion = '',
      valorArriendo = '',
      idUbicacion = '',
      direccion = '',
      observaciones = '',
      activo = ''
    } = this.props.tours;
    return (
      <div className="card mb-3 tours" key={`tours-${idTour}`}>
        <div className="row">
          <div className="imagen col-3">
            <img src={img} className="card-img" alt="..." />
          </div>
          <div className="col-6">
            <div className="card-body">
              <h2 className="card-title asdf">
                { nombre }
              </h2>
              <p className="card-text">
              { observaciones }
              </p>
            </div>
          </div>
          <div className="col-3 tercer">
            <h2 className="precioTitulo">
              Precio por día
            </h2>
            <p className="precioDia">
              ${ valorArriendo }
            </p>
            <button type="button" className="btn btn-info">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    )
  }
}

PlaceListToursItemComponent.defaultProps = {
  tours: {}
};

PlaceListToursItemComponent.propTypes = {
  tours: PropTypes.object
};
