import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import EnterRouter from './router';

ReactDOM.render(
  <Provider store={store}>
    <EnterRouter />
  </Provider>,
  document.getElementById('app'),
);
