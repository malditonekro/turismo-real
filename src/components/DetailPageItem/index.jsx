import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { api } from '../../utils/js';

import Calendar  from '../Calendar/Calendar';

export default class DetailPageItemComponent extends Component {

  constructor (props) {
    super(props);
    this.state = {
      apartment: {}
    }
  }

  componentWillMount = () => {
    this.getApartment();
  };

  getApartment = async () => {

    const apartment = await api.fetchApartmentSingle(this.props.placeId);
    this.setState({
      apartment
    });
  };

  render() {
    const { nombre } = this.state.apartment;

    return (
      <div className="row justify-content-md-center">    
        <div className="col-10 filters-container">
          <div className="jumbotron">
              <div className="col-11 detail-product">
                  <div className="row">
                      <img className="img-tour" src="http://andaluciadestinodecine.com/wp-content/uploads/2017/07/emilia.jpg"/>
                      <div className="pdp-container">
                          <div className="description-container">
                              <h3>{nombre}</h3>
                              <h4>Detalle</h4>
                              <p>Descripción Lorem Ipsum Chapalapachala</p>
                          </div>
                          <div className="price-container">
                                  <h5>Precio</h5>
                                  <h4>$ 100.000</h4>
                                  <div className="filter-button">
                                      <a className="btn btn-info btn-lg" href="#" role="button"><i className="fas fa-search-location"></i> &nbsp;&nbsp;&nbsp;Continuar</a>
                                  </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

DetailPageItemComponent.defaultProps = {
  product: {},
  placeId: '1'
};

DetailPageItemComponent.propTypes = {
  product: PropTypes.object,
  placeId: PropTypes.any
};
