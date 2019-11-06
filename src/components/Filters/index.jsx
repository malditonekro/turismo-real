import React, { Component } from 'react';
import { Formik } from 'formik';
import classNames from 'classnames';
import { DebugUtil } from '../../utils/js';

const log = DebugUtil.log.bind(DebugUtil, 'FilterComponent /> ');

export default class FilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      cities: []
    }
  }

  componentWillMount = () => {
    this.fetchCities();
  };

  fetchCities = () => {
    let apiUrl = 'https://api-turismo-duoc.herokuapp.com/api/ciudades';

    fetch(apiUrl).then(response => {
        return response.json();
      }).then(response => {
        log('fetchCities response', response);
        
        this.setState({
          cities: response.sort((a,b) => a.idCiudad - b.idCiudad)
        });
      }).catch(err => {
        log("fetchCities Error />",err);
      });
  };

  getCitiesOptions = () => {
    return this.state.cities.map((city) => {
      return <option key={`city-${city.idCiudad}`} value={city.idCiudad}>{city.nombreCiudad}</option>
    });
  }

  getFormValidations = (values) => {
    const errors = {};
    errors.destiny = !values.destiny ? 'Debes seleccionar un destino' : null;
    errors.fromDate = !values.fromDate ? 'Debes seleccionar una fecha de inicio' : null;
    errors.toDate = !values.toDate ? 'Debes seleccionar una fecha de término' : null;
    Object.keys(errors).forEach(key => (errors[key] === null) && delete errors[key]);
    return errors;
  };

  getErrorMessage = (touched, error) => {
    return (touched && error) ? (<div className="inputError">{error}</div>) : null;
  }

  getForm = ({
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
      isSubmitting
    }) => {

    const buttonClass = classNames({
      submitButton: true,
      btn: true,
      'btn-info': true,
      __loading: this.state.submitting
    });

    return (
      <form onSubmit={handleSubmit}>
        <div className="filterForm">
          <div className="destiny filterFieldDiv">
            <label htmlFor="destiny">Destino</label>
            <select className="form-control" name="destiny" id="destiny" disabled={this.state.cities.length==0} onChange={handleChange} onBlur={handleBlur}>
              <option>Seleccione</option>
              {this.state.cities.length > 0 && this.getCitiesOptions()}
            </select>
            {this.getErrorMessage(touched.destiny, errors.destiny)}
          </div>

          <div className="fromDate filterFieldDiv">
            <label htmlFor="fromDate">Desde</label>            
            <input 
              type="text"
              className="form-control"
              name="fromDate"
              id="fromDate"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fromDate} />
              {this.getErrorMessage(touched.fromDate, errors.fromDate)}
          </div>

          <div className="toDate filterFieldDiv">
            <label htmlFor="toDate">Hasta</label>
            <input 
              type="text"
              className="form-control"
              name="toDate"
              id="toDate"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.toDate} />
              {this.getErrorMessage(touched.toDate, errors.toDate)}
          </div>

          <div className="roomSize filterFieldDiv">
            <label htmlFor="roomSize">Habitaciones</label>
            <select name="roomSize" id="roomSize" className="form-control" onChange={handleChange} onBlur={handleBlur}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
        <button type="submit" disabled={isSubmitting} className={buttonClass}><i className="fa fa-search-location"/> Buscar</button>
      </form>
    );
}

  handleSubmit = (values) => {
    log('handleSubmit', values);
    setTimeout(()=>{
      const val = [
        {
          "idDepartamento": 2,
          "nombre": "Departamento T2",
          "direccion": "Lo Cruzar 412",
          "inmobiliaria": "Pacal",
          "costoMantencion": 100000,
          "valorArriendo": 60000,
          "idUbicacion": 1,
          "observaciones": "Vista al mar",
          "activo": 1,
          "insumos": null,
          "fotografias": 'https://img-cl-1.trovit.com/10i1n1sQE1Cl/10i1n1sQE1Cl.1_11.jpg'
        },
        {
          "idDepartamento": 3,
          "nombre": "Departamento T3",
          "direccion": "Lo Cruzar 420",
          "inmobiliaria": "Pacal",
          "costoMantencion": 120000,
          "valorArriendo": 70000,
          "idUbicacion": 1,
          "observaciones": "Vista al mar",
          "activo": 1,
          "insumos": null,
          "fotografias": 'https://www.mercadocasas.cl/wp-content/uploads/2017/03/1ok-1488487361.jpg'
        },
        {
          "idDepartamento": 4,
          "nombre": "Departamento T3",
          "direccion": "Lo Cruzar 420",
          "inmobiliaria": "Pacal",
          "costoMantencion": 120000,
          "valorArriendo": 70000,
          "idUbicacion": 1,
          "observaciones": "Vista al mar",
          "activo": 1,
          "insumos": null,
          "fotografias": 'https://www.mercadocasas.cl/wp-content/uploads/2017/03/1ok-1488487361.jpg'
        },
        {
          "idDepartamento": 5,
          "nombre": "Departamento T3",
          "direccion": "Lo Cruzar 420",
          "inmobiliaria": "Pacal",
          "costoMantencion": 120000,
          "valorArriendo": 70000,
          "idUbicacion": 1,
          "observaciones": "Vista al mar",
          "activo": 1,
          "insumos": null,
          "fotografias": 'https://www.mercadocasas.cl/wp-content/uploads/2017/03/1ok-1488487361.jpg'
        }
      ];
      this.props.handleGetPlacesResponse(val);
    }, 1000);
  }

  renderForm = () => (
    <Formik
      initialValues={{
        destiny: 0,
        fromDate: '',
        toDate: '',
        roomSize: 1
      }}
      validate={this.getFormValidations}
      render={props => this.getForm({ ...props })}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        this.handleSubmit(values);
      }} />
  );

  render() {
    return (
      <div className="filter">
        { this.renderForm() }
      </div>
    );
  }
}

FilterComponent.defaultProps = {
  handleGetPlacesResponse: () => {}
};
