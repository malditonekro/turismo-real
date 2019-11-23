import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { api } from '../../utils/js';

import Calendar  from '../Calendar/Calendar';

export default class DetailPageItemComponent extends Component {

  constructor (props) {
    super(props);
    this.state = {
      city: 1,
      nombreCity: '',
      apartment: {}
    }
  }

  componentWillMount = () => {
    this.getApartment();
  };

  setCity(ciudad) {
    this.setState({
      city: ciudad
    });
}

  getApartment = async () => {

    const apartment = await api.fetchApartmentSingle(this.props.placeId);
    this.setState({
      apartment
    }, () => {
      this.getCity(apartment.idCiudad);
    });
  };

  getCity = async (ciudad) => {
    const city = await api.fetchCitySingle(ciudad);
    this.setState({
     city: city.nombreCiudad
    });
  };

  currencyPrice(price) {
    const formatter = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    });

    return formatter.format(price);
  }

  getImages(fotografias) {
    // let asd = "https://source.unsplash.com/random/?city,night";
      for (let i = 0; i <= 5; i++) {
        let num = Math.round(Math.random()*(311-500)+parseInt(500));
        let img = "https://picsum.photos/id/" + num + "/600/600";
        // let img = "https://source.unsplash.com/random/?city,night";
        return (
          <div className="carousel-item active">
           <img src={img} className="d-block w-100" alt="..."/>
          </div>
        )
      }
    }

    // for (const i in fotografias) {
    //   console.log('asd ', fotografias[i])
    //   return(
    //     <div className="carousel-item active">
    //       <img src={fotografias[i].ruta} className="d-block w-100" alt="..."/>
    //     </div>
    //   );

    // for(let i=0; i < imagesObj.lenght; i++){
    //   if(i == 0) {
    //     return(
    //       <div className="carousel-item active">
    //         <img src={imagesObj[i].ruta} className="d-block w-100" alt="..."/>
    //       </div>
    //     );
    //   }
    //   else {
    //     return(
    //       <div className="carousel-item">
    //         <img src={imagesObj[i].ruta} className="d-block w-100" alt="..."/>
    //       </div>
    //     );
    //   }
    // }
  

  render() {
    const { nombre,direccion,inmobiliaria,observaciones,valorArriendo,fotografias } = this.state.apartment;
    console.log('APT',this.state.apartment);

    return (
      <div className="row justify-content-md-center">    
        <div className="col-10 filters-container">
          <div className="jumbotron">
              <div className="col-11 detail-product">
                  <div className="row">
                      {/* <img className="img-tour" src="http://andaluciadestinodecine.com/wp-content/uploads/2017/07/emilia.jpg"/> */}
                      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                      <div className="carousel-inner">
                        { this.getImages(fotografias)}
                      </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                          <span className="carousel-control-next-icon" aria-hidden="true"></span>
                          <span className="sr-only">Next</span>
                        </a>
                      </div>
                      <div className="pdp-container">
                          <div className="description-container">
                              <center><h3>{nombre}</h3></center><br/>
                              <table className="table table-sm table-hover table-bordered table-striped">
                                <tbody>
                                  <tr>
                                    <td>Dirección: </td>
                                    <td>{ direccion }</td>
                                  </tr>
                                  <tr>
                                    <td>Ciudad: </td>
                                    <td>{ this.state.city }</td>
                                  </tr>
                                  <tr>
                                    <td>Inmobiliaria: </td>
                                    <td>{ inmobiliaria }</td>
                                  </tr>
                                </tbody>
                              </table>

                              <h4>Detalle</h4>
                              <br/>
                              <p>{observaciones}</p>
                          </div>
                          <br/>
                          <div className="price-container">
                                  <h5>Precio</h5>
                                  <h4>{ this.currencyPrice(valorArriendo) }</h4>
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
