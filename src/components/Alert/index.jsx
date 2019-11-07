import React, { Component } from 'react';
import classNames from 'classnames';
import { DebugUtil } from '../../utils/js';

const log = DebugUtil.log.bind(DebugUtil, 'AlertComponent /> ');

export default class AlertComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      closing: false
    }
  }

  componentDidMount = () => {
    setTimeout(()=>{
      this.setState({
        open: true
      });
    }, 100)
    setTimeout(()=>{
      this.setState({
        closing: true
      });
    }, 3000)
    setTimeout(()=>{
      this.props.handleHideAlert();
    }, 3400)
  };

  getClass = () => (
    classNames({
      alertComponent: true,
      level1: this.props.level == 1,
      level2: this.props.level == 2,
      level4: this.props.level == 4,
      level3: this.props.level == 3,
      open: this.state.open,
      closing: this.state.closing
    })
  );

  render() {
    return (
      <div className={this.getClass()}>
        <h4>{this.props.title}</h4>
        {this.props.message}
      </div>
    );
  }
}

AlertComponent.defaultProps = {
  title: 'Error inesperado',
  message: 'Ha ocurrido un error interno, por favor intente nuevamente mas tarde.',
  level: 4,
  handleHideAlert: () => {}
};
