import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import Root from './components/Root';
import { DebugUtil, UrlUtil } from './utils/js';
import * as serviceWorker from './serviceWorker';

const urlArgs = UrlUtil.getArgsFromLocation();
DebugUtil.setDebugLevel((urlArgs && urlArgs.debug) ? parseInt(urlArgs.debug, 10) : 0);

ReactDOM.render(<Root />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
