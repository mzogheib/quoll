import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './_app';
import FakeOAuth from './fake-oauth';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/fake-oauth" component={FakeOAuth} />
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
