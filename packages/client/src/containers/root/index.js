import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../../components/app';

function Root() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  );
}

export default Root;
