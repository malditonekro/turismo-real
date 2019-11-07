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
      { this.getLink('/transports', 'Transportes', 'navButton nav-item nav-link', 'fa fa-history', true) }
    </div>);
  }

  showAuthButtons = () => {
    if(sessionStorage && sessionStorage.getItem('auth')) {
      return false;
    }
    return true;
  };

  unlog = () => {
    if(sessionStorage) {
      sessionStorage.removeItem('auth');
      window.location.replace('/home');
    }
  };

  getUnlogButton = () => (
    <a href="#" onClick={this.unlog} className="unlogButton ">Cerrar sesión</a>
  );

  renderLeftButtons = () => {
    return (<div className="leftButtons">
      { this.showAuthButtons() && this.getLink('/auth', 'Iniciar Sesión', 'leftButton signInBtn btn btn-info', 'fa fa-user') }
      { this.getLink('/order-list', 'Mis Viajes', 'leftButton orderListBtn btn btn-info', 'fa fa-history') }
      { !this.showAuthButtons() && this.getUnlogButton() }
    </div>);
  }

  render() {
    return (
      <header>
        <div className="header">
          { this.renderLogo() }
          { this.renderNavButtons() }
          { this.renderLeftButtons() }
        </div>
      </header>
    );
  }
}
