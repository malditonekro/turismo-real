import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DebugUtil } from '../../utils/js/index';
import HeaderComponent from '../../components/Header';
const log = DebugUtil.log.bind(DebugUtil, 'BaseLayout /> ');

export default class BaseLayout extends Component {
  constructor(props) {
    super(props);
    log('props', props);
  }

  render() {
    const { children } = this.props;
    return (
      <main>
        <HeaderComponent />
        { children }
      </main>
    );
  }
}

BaseLayout.propTypes = {
  children: PropTypes.any
};

BaseLayout.defaultProps = {
  children: null
};
