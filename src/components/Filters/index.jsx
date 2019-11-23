import React, { Component } from 'react';
import { Formik } from 'formik';
import classNames from 'classnames';
import { api, DebugUtil } from '../../utils/js';

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
    this.getCities();
  };
  
  getCities = async () => {
    const cities = await api.fetchCities();
    this.setState({
      cities
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
      handleSubmit
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
              <option value=''>Seleccione</option>
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
        <button type="submit" disabled={this.state.submitting} className={buttonClass}><i className="fa fa-search-location"/> Buscar</button>
      </form>
    );
}

  handleSubmit = (values) => {
    log('handleSubmit', values);    
    this.props.handleParentSubmit(values);
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
  handleParentSubmit: () => {}
};
