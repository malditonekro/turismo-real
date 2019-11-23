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
      apartment: {},
      fromUnparsed: '',
      toUnparsed: '',
      from: '',
      to: '',
      displayError: false
    }

    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
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
        let num = Math.round(Math.random()*(511-500)+parseInt(500));
        let img = "https://picsum.photos/id/" + num + "/500/500";
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

  handleFromChange = (from) => {
    const day = from.getDate()
    const  month = from.getMonth() + 1
    const year = from.getYear() - 100;
    let fromParsed = from;
    fromParsed= `${day<10?`0${day}`:day}-${month<10?`0${month}`:month}-${year}`;
    this.setState({
      from: fromParsed,
      fromUnparsed: from,
      displayError: false
    });
  }

  handleToChange = (to) => {
    const day = to.getDate()
    const  month = to.getMonth() + 1
    const year = to.getYear() - 100;
    let toParsed = to;
    toParsed = `${day<10?`0${day}`:day}-${month<10?`0${month}`:month}-${year}`;
    this.setState({
      to: toParsed,
      toUnparsed: to,
      displayError: false
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if(!sessionStorage.getItem('auth')) {
      window.location.replace('/auth');
    }
    if(this.state.toUnparsed - this.state.fromUnparsed < 0) {
      this.setState({
        displayError: true
      });

    } else if (this.state.fromUnparsed && this.state.toUnparsed) {
      let createdAt = new Date();
      const day = createdAt.getDate()
      const  month = createdAt.getMonth() + 1
      const year = createdAt.getYear() - 100;
      let createdAtParsed = createdAt;
      createdAtParsed = `${day<10?`0${day}`:day}-${month<10?`0${month}`:month}-${year}`;
      const user = JSON.parse(sessionStorage.getItem('auth'));
      const body = {
        "activo": 0,
        "cantidadDias": user.personaDTO.idPersona,
        "createAt": createdAtParsed,
        "detalles": [
          {
            "activo": 0,
            "fechaCheckIn": null,
            "fechaCheckout": null,
            "idEstadoCheckIn": null,
            "idEstadoCheckOut": null,
            "idInsumo": 1,
            "idReserva": 0,
            "idReservaDetalle": 0
          },
          {
            "activo": 0,
            "fechaCheckIn": null,
            "fechaCheckout": null,
            "idEstadoCheckIn": null,
            "idEstadoCheckOut": null,
            "idInsumo": 1,
            "idReserva": 0,
            "idReservaDetalle": 0
          },
          {
            "activo": 0,
            "fechaCheckIn": null,
            "fechaCheckout": null,
            "idEstadoCheckIn": null,
            "idEstadoCheckOut": null,
            "idInsumo": 1,
            "idReserva": 0,
            "idReservaDetalle": 0
          }
        ],
        "fechaReservaFin": this.state.to,
        "fechaReservaInicio": this.state.from,
        "idReserva": 0,
        "idServicio": this.props.placeId,
        "idTipoReserva": 1
      };
      const response = await api.bookPlace(body);
      console.log(response);
    } 
  };


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
                              <center><h3 className="bold">{nombre}</h3></center><br/>
                              <table className="table table-sm table-hover table-bordered table-striped">
                                <tbody>
                                  <tr>
                                    <td className="bold">Dirección: </td>
                                    <td>{ direccion }</td>
                                  </tr>
                                  <tr>
                                    <td className="bold">Ciudad: </td>
                                    <td>{ this.state.city }</td>
                                  </tr>
                                  <tr>
                                    <td className="bold">Inmobiliaria: </td>
                                    <td>{ inmobiliaria }</td>
                                  </tr>
                                </tbody>
                              </table>

                              <h4 className="bold">Detalle</h4>
                              <p>{observaciones}</p>
                          </div>
                          <div className="row">
                          <div className="col-6 pdpBook">
                            <div className="bookFrom">
                              <label className="bold">Desde</label>
                              <Calendar
                                handleChange={this.handleFromChange}
                                />
                            </div>

                            <div className="bookTo">
                              <label className="bold">Hasta</label>
                              <Calendar
                                handleChange={this.handleToChange}
                              />
                            </div>
                            {this.state.displayError && <span>Fecha inicial debe ser menor a la final.</span>}
                          </div>

                          <div className="col-6 price-container">
                                  <h5 className="bold">Precio</h5>
                                  <h4>{ this.currencyPrice(valorArriendo) }</h4>
                                  <div className="filter-button">
                                      <a className="btn btn-info btn-lg" href="#" role="button" onClick={this.handleSubmit}><i class="fas fa-calendar-check"></i> &nbsp;&nbsp;&nbsp;Reservar</a>
                                  </div>
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
