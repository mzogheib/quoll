import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Root from './containers/root';
import rootReducer from './reducers';

const store = createStore(rootReducer)

render(
  <Provider store={store}>
    <Root />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
