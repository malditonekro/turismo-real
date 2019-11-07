import React, { Component } from 'react';
import { Formik } from 'formik';
import classNames from 'classnames';
import { DebugUtil } from '../../utils/js';

const log = DebugUtil.log.bind(DebugUtil, 'SignUpComponent /> ');

export default class SignUpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false
    }
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
    errors.name = !values.name ? 'Ingresar tu nombre' : null;
    errors.fatherLastName = !values.fatherLastName ? 'Ingresar tu apellido paterno' : null;
    errors.motherLastName = !values.motherLastName ? 'Ingresar tu apellido materno' : null;
    errors.gender = !values.gender ? 'Selecciona tu género' : null;
    errors.birthdateDay = !values.birthdateDay || !values.birthdateMonth || !values.birthdateYear ? 'Selecciona tu fecha nacimiento' : null;
    errors.nationality = !values.nationality ? 'Selecciona tu nacionaliddaad' : null;
    errors.identificationNumber = !values.identificationNumber ? 'Ingresar tu número de documento' : null;
    errors.phoneNumber = !values.phoneNumber ? 'Ingresar tu número de teléfono' : null;
    errors.email = !values.email ? 'Ingresa tu correo' : null;
    errors.password = !values.password ? 'Ingresa tu contraseña' : null;
    errors.passwordConfirmation = !values.passwordConfirmation ? 'Confirma tu contraseña' : 
                                  values.password !== values.passwordConfirmation ? 'La contraseña no coincide' : null;
    
    Object.keys(errors).forEach(key => (errors[key] === null) && delete errors[key]);
    return errors;
  };

  getErrorMessage = (touched, error) => {
    return (touched && error) ? (<div className="inputError">{error}</div>) : null;
  }

  getDayOptions = () => {
    let days = [];
    for(let i = 1; i <32; i++) {
      days.push(<option value="i" key={`birthday-${i}`}>{i}</option>);
    }
    return days;
  };

  getMonthOptions = () => ([
    <option value="1" key={`birthmonth-${1}`}>Enero</option>,
    <option value="2" key={`birthmonth-${2}`}>Febrero</option>,
    <option value="3" key={`birthmonth-${3}`}>Marzo</option>,
    <option value="4" key={`birthmonth-${4}`}>Abril</option>,
    <option value="5" key={`birthmonth-${5}`}>Mayo</option>,
    <option value="6" key={`birthmonth-${6}`}>Junio</option>,
    <option value="7" key={`birthmonth-${7}`}>Julio</option>,
    <option value="8" key={`birthmonth-${8}`}>Agosto</option>,
    <option value="9" key={`birthmonth-${9}`}>Septiembre</option>,
    <option value="10" key={`birthmonth-${10}`}>Octubre</option>,
    <option value="11" key={`birthmonth-${11}`}>Noviembre</option>,
    <option value="12" key={`birthmonth-${12}`}>Diciembre</option>
  ]);

  getYearOptions = () => {
    let days = [];
    const currDate = new Date();
    for(let i = 1; i <151; i++) {
      days.push(<option value={currDate.getFullYear() - i} key={`birthyear-${currDate.getFullYear() - i}`}>{currDate.getFullYear() - i}</option>);
    }
    return days;
  };

  getNationalityOptions = () => ([
    <option value="2" key={`birthmonth-${2}`}>Chile</option>,
    <option value="1" key={`birthmonth-${1}`}>Argentina</option>,
    <option value="3" key={`birthmonth-${3}`}>Perú</option>
  ]);

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
        <div className="signUpForm">
          <div className="name signUpFieldDiv">
            <label htmlFor="name">Nombre</label>
            <div className="input">
              <input 
                type="text"
                className="form-control"
                name="name"
                id="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name} />
              {this.getErrorMessage(touched.name, errors.name)}
            </div>         
          </div>
          <div className="fatherLastName signUpFieldDiv">
            <label htmlFor="fatherLastName">Apellido Paterno</label>
            <div className="input">            
              <input 
                type="text"
                className="form-control"
                name="fatherLastName"
                id="fatherLastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fatherLastName} />
              {this.getErrorMessage(touched.fatherLastName, errors.fatherLastName)}
            </div>
          </div>
          <div className="motherLastName signUpFieldDiv">
            <label htmlFor="motherLastName">Apellido Materno</label>
            <div className="input">            
              <input 
                type="text"
                className="form-control"
                name="motherLastName"
                id="motherLastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.motherLastName} />
              {this.getErrorMessage(touched.motherLastName, errors.motherLastName)}
            </div>
          </div>
          <div className="gender signUpFieldDiv">
            <label htmlFor="gender">Género</label>
            <div className="input">
              <div className="genderRadioButton radio">
                <label htmlFor="gender"><input type="radio" name="gender" onChange={handleChange} onBlur={handleBlur} value="1"/>Masculino</label>
                <label htmlFor="gender"><input type="radio" name="gender" onChange={handleChange} onBlur={handleBlur} value="2"/>Femenino</label>
              </div>
              {this.getErrorMessage(touched.gender, errors.gender)}
              </div>
          </div>
          <div className="birthdate signUpFieldDiv">
            <label htmlFor="birthdateDay">Fecha de nacimiento</label>
            <div className="input">
              <div className="inputInner">
                <select name="birthdateDay" id="birthdateDay" className="form-control" onChange={handleChange} onBlur={handleBlur}>
                  <option value=''>Día</option>
                  {this.getDayOptions()}                
                </select>
                <select name="birthdateMonth" id="birthdateMonth" className="form-control" onChange={handleChange} onBlur={handleBlur}>
                  <option value=''>Mes</option>
                  {this.getMonthOptions()}
                </select>
                <select name="birthdateYear" id="birthdateYear" className="form-control" onChange={handleChange} onBlur={handleBlur}>
                  <option value=''>Año</option>
                  {this.getYearOptions()}
                </select>
              </div>
              {this.getErrorMessage(touched.birthdateDay, errors.birthdateDay)}
            </div>
          </div>
          <div className="nationality signUpFieldDiv">
            <label htmlFor="nationality">Nacionalidad</label>
            <div className="input">
              <select name="nationality" id="nationality" className="form-control" onChange={handleChange} onBlur={handleBlur}>
                <option value=''>Seleccione</option>
                {this.getNationalityOptions()}
              </select>
              {this.getErrorMessage(touched.nationality, errors.nationality)}
            </div>
          </div>
          <div className="identificationNumber signUpFieldDiv">
            <label htmlFor="identificationNumber">Número de documento</label>
            <div className="input">
              <input 
                type="text"
                className="form-control"
                name="identificationNumber"
                id="identificationNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.identificationNumber} />
              {this.getErrorMessage(touched.identificationNumber, errors.identificationNumber)}
            </div>
          </div>
          <div className="phoneNumber signUpFieldDiv">
            <label htmlFor="phoneNumber">Teléfono</label>
            <div className="input">
              <input 
                type="text"
                className="form-control"
                name="phoneNumber"
                id="phoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber} />
              {this.getErrorMessage(touched.phoneNumber, errors.phoneNumber)}
            </div>
          </div>
          <div className="email signUpFieldDiv">
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
          <div className="password signUpFieldDiv">
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
          <div className="passwordConfirmation signUpFieldDiv">
            <label htmlFor="passwordConfirmation">Confirmar contraseña</label>
            <div className="input">
              <input 
                type="password"
                className="form-control"
                name="passwordConfirmation"
                id="passwordConfirmation"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordConfirmation} />
              {this.getErrorMessage(touched.passwordConfirmation, errors.passwordConfirmation)}
            </div>
          </div>
        </div>
        <button type="submit" disabled={this.state.submitting} className={buttonClass}><i className="fa fa-search-location"/> Registrarse</button>
      </form>
    );
}

  handleSubmit = (values) => {
    this.setState({
      submitting: true
    });
    setTimeout(()=>{
      
      this.setState({
        submitting: false
      });
      log('handleSubmit', values);
    }, 2000);
  }

  handleSwitchView = (event) => {
    event.preventDefault();
    this.props.switchView();
  }

  renderForm = () => (
    <Formik
      initialValues={{
        name: '',
        motherLastName: '',
        fatherLastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        nationality: '',
        identificationNumber: '',
        gender: null,
        birthdateDay: '',
        birthdateMonth: '',
        birthdateYear: '',
        phoneNumber: ''
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
      <div className="signUp">
        <h3>Registro de usuario</h3>
        { this.renderForm() }
        <a href="#" className="signInButton" onClick={this.handleSwitchView}>Iniciar Sesión</a>
      </div>
    );
  }
}



SignUpComponent.defaultProps = {
  history: {},
  switchView: () => {}
};
