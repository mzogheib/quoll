import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import 'typeface-pacifico';
import registerServiceWorker from './registerServiceWorker';
import App from './app';
import store from './store';

render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
