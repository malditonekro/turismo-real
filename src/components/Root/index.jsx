import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

/**
 * Root component used to define the Provider
 * and the browser router
 */

const Root = () => (
    <BrowserRouter>
      <App />
    </BrowserRouter>
);

export default Root;
