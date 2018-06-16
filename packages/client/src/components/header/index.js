import React from 'react';
import './style.css';

function Header(props) {
  return (
    <div className='header'>{props.label}</div>
  );
}

export default Header;
