import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class HeaderComponent extends Component {
  constructor(props) {
    super(props);
  }

  renderLogo = () => (
    <div className="headerLogo">
      <NavLink
        className="logoRoute"
        to="/"
        onClick={e => e.stopPropagation()}>
        <img className="logo" src="../../favicon.ico" alt="Turismo Real" />
        <span>Turismo Real</span>
      </NavLink>
    </div>
  );

  getLink = (linkRoute, linkText, linkClass, icon = false, useActive = false) => {
    return <NavLink
        className={linkClass}
        to={linkRoute}
        activeClassName={useActive ? 'active' : ''}
        onClick={e => e.stopPropagation()}>
        { icon && <i className={icon} />}
        <span>{ linkText }</span>
      </NavLink>
  };

  renderNavButtons = () => {
    return (<div className="navButtons">
      { this.getLink('/home', 'Arriendos', 'navButton nav-item nav-link', 'fa fa-home', true) }
      { this.getLink('/tours', 'Tours', 'navButton nav-item nav-link', 'fa fa-map-marked-alt', true) }
      { this.getLink('/order-list', 'Historial', 'navButton nav-item nav-link', 'fa fa-history', true) }
    </div>);
  }

  renderAuthButtons = () => {
    return (<div className="authButtons">
      { this.getLink('/sign-in', 'Iniciar Sesión', 'authButton signInBtn btn btn-info', 'fa fa-user') }
      { this.getLink('/sign-up', 'Registrarse', 'authButton signUpBtn btn btn-info', 'fa fa-edit') }
    </div>);
  }

  render() {
    return (
      <header>
        <div className="header">
          { this.renderLogo() }
          { this.renderNavButtons() }
          { this.renderAuthButtons() }
        </div>
      </header>
    );
  }
}
