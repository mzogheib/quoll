import React from 'react';
import './style.css';

function MenuItem(props) {
  return (
    <div className='menu-item'>
      <input className='menu-item__toggle' type='checkbox' onChange={props.onToggle}/>
      <span className='menu-item__label'>{props.label}</span>
    </div>
  );
}

export default MenuItem;
