import React, { Component } from 'react';
import { Formik } from 'formik';
import classNames from 'classnames';
import { DebugUtil } from '../../utils/js';
import AlertComponent from '../Alert';

const log = DebugUtil.log.bind(DebugUtil, 'SignInComponent /> ');

export default class SignInComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAlert: false,
      submitting: false
    }
    this.hideAlert = this.hideAlert.bind(this);
  }

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
    errors.email = !values.email ? 'Debes ingresar un correo' : null;
    errors.password = !values.password ? 'Por favor ingresa tu contraseña' : null;
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
        <div className="signInForm">
          <div className="email signInFieldDiv">
            <label htmlFor="email">Email</label>
            <div className="input">
              <input 
                type="text"
                className="form-control"
                name="email"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email} />
              {this.getErrorMessage(touched.email, errors.email)}
            </div>
          </div>

          <div className="password signInFieldDiv">
            <label htmlFor="password">Contraseña</label>
            <div className="input">
              <input 
                type="password"
                className="form-control"
                name="password"
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password} />
              {this.getErrorMessage(touched.password, errors.password)}
            </div>
          </div>
        </div>        
        <button type="submit" disabled={this.state.submitting} className={buttonClass}><i className="fa fa-search-location"/> Ingresar</button>
      </form>
    );
  }

  hideAlert = () => {
    this.setState({
      displayAlert: false
    });
  }

  handleSubmit = (values) => {
    this.setState({
      submitting: true
    });

    const body = {
      email: values.email,
      pass: values.password
    }

    fetch(
      'https://api-turismo-duoc.herokuapp.com/api/login',
      {
        method: 'POST',
        body,
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        }
      }
    ).then((response) => {
      log('handleSubmit', response);
      this.setState({
        submitting: false
      });
    }).catch((error) => {
      this.setState({
        displayAlert: true,
        submitting: false
      });
      log('handleSubmit', error);
      sessionStorage.setItem('auth', values.email);
      this.props.history && this.props.history.push('/home');
    });
  }

  handleSwitchView = (event) => {
    event.preventDefault();
    this.props.switchView();
  }

  renderForm = () => (
    <Formik
      initialValues={{
        email: '',
        password: ''
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
      <div className="signIn">
        <h3>Inicio de sesión</h3>
        { this.renderForm() }
        <a href="#" className="signUpButton" onClick={this.handleSwitchView}>Registrate</a>
        { this.state.displayAlert && <AlertComponent level={4} handleHideAlert={this.hideAlert} /> }
      </div>
    );
  }
}



SignInComponent.defaultProps = {
  history: {},
  switchView: () => {}
};
