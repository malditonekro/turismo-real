import React, { Component } from 'react';
import { Formik } from 'formik';
import classNames from 'classnames';
import { api, DebugUtil } from '../../utils/js';
import AlertComponent from '../Alert';

const log = DebugUtil.log.bind(DebugUtil, 'SignInComponent /> ');

export default class SignInComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAlert: false,
      displayAlertTitle: '',
      displayAlertMessage: '',
      submitting: false
    }
    this.hideAlert = this.hideAlert.bind(this);
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

  displayWrongLoginAlert = () => {
    this.setState({
      displayAlert: true,
      displayAlertTitle: 'Error al iniciar sesión',
      displayAlertMessage: 'Correo electrónico o contraseña incorrecta.',
      submitting: false
    });
  };

  handleSubmit = async (values) => {
    this.setState({
      submitting: true
    });

    const body = {
      email: values.email,
      pass: values.password
    }

    const signInResponse = await api.signIn(body);
    switch (signInResponse) {
      case 1:
        this.props.history && this.props.history.push('/home');
        this.setState({
          submitting: false
        });
        break;
      case 2:
        this.displayWrongLoginAlert();
        this.setState({
          submitting: false
        });
        break;
      case 3:    
      default:
        this.setState({
          displayAlert: true,
          displayAlertTitle: 'Error inesperado',
          displayAlertMessage: 'Ha ocurrido un error interno, por favor intente nuevamente mas tarde.',
          submitting: false
        });
        break;
    }
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
        { this.state.displayAlert && <AlertComponent title={this.state.displayAlertTitle} message={this.state.displayAlertMessage} level={4} handleHideAlert={this.hideAlert} /> }
      </div>
    );
  }
}



SignInComponent.defaultProps = {
  history: {},
  switchView: () => {}
};
