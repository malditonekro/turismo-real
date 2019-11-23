import React, { Component } from 'react';
import { Formik } from 'formik';
import classNames from 'classnames';
import { api, DebugUtil } from '../../utils/js';
import Calendar from '../Calendar/Calendar';

const log = DebugUtil.log.bind(DebugUtil, 'FilterComponent /> ');

export default class FilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      cities: [],
      from: '',
      to: ''
    }
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
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
    // errors.fromDate = !values.fromDate ? 'Debes seleccionar una fecha de inicio' : null;
    // errors.toDate = !values.toDate ? 'Debes seleccionar una fecha de término' : null;
    Object.keys(errors).forEach(key => (errors[key] === null) && delete errors[key]);
    return errors;
  };

  getErrorMessage = (touched, error) => {
    return (touched && error) ? (<div className="inputError">{error}</div>) : null;
  }

  desde(fecha) {
    console.log('desde ', fecha);
    return fecha;
  }

  hasta(fecha) {
    console.log('hasta ', fecha);
    return fecha;
  }

  handleFromChange(from) {
    this.setState({
      from
    });
  }

  handleToChange(to) {
    this.setState({
      to
    });
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

         <Calendar
          desde = {this.desde()}
          handleChange={this.handleFromChange}
          />

         <Calendar
         hasta = {this.hasta()}
         handleChange={this.handleToChange}
         />
         

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
    const val = {
      ...values,
      from: this.state.from,
      to: this.state.to,
    }
    console.log('valor', val);   
    this.props.handleParentSubmit(val);
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
