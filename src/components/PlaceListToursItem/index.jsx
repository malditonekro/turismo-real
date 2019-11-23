import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PlaceListToursItemComponent extends Component {

  render() {
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
          <div className="col-3">
            <img src="http://static.asiawebdirect.com/m/bangkok/portals/bangkok-com/homepage/tours-top10/pagePropertiesImage/top10-tours-bangkok.jpg.jpg" className="card-img" alt="..." />
          </div>
          <div className="col-6">
            <div className="card-body">
              <h2 className="card-title asdf">
                { nombre }
              </h2>
              <p className="card-text">
                {observaciones}
              </p>
            </div>
          </div>
          <div className="col-3">
            <p className="card-text">
                  {observaciones}
            </p>
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
