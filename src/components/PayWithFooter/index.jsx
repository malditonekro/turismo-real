import React, { Component } from 'react';

export default class PayWithFooterComponent extends Component {

  render() {
    return (
      <div className="payWithFooter">
        <span className="title">
          Paga en cuotas sin interés con:
        </span>
        <div className="bankImages">
          <a href="https://ww3.bancochile.cl/">
            <img alt="bank1" src="../images/bank1.png" />
          </a>
          <a href="https://www.cmr.cl">
            <img alt="bank2" src="../images/bank2.png" />
          </a>
          <a href="https://www.bci.cl">
            <img alt="bank3" src="../images/bank3.png" />
          </a>
          <a href="https://www.santander.cl">
            <img alt="bank4" src="../images/bank4.png" />
          </a>
          <a href="https://www.bancoestado.cl">
            <img alt="bank5" src="../images/bank5.png" />
          </a>
        </div>
      </div>
    );
  }
}
