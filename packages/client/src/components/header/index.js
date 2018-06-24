import React from 'react';
import { withRouter } from 'react-router-dom';
import routes from '../../routes';
import './style.css';

function Header(props) {
  const route = routes.find(route => route.path === props.location.pathname);
  return <div className='header'>{route.title}</div>;
}

export default withRouter(Header);
