import React from 'react';
import { render } from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Root from './containers/root';

render(
  <Root />
  , document.getElementById('root'));
registerServiceWorker();
