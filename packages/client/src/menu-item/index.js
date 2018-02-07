import React from 'react';
import './style.css';

function MenuItem(props) {
  const renderAuthLink = () => {
    if (props.showAuthLink) {
      return (
        <a href={props.showAuthLink}>Connect</a>
      )
    }
  }

  return (
    <div className='menu-item'>
      <input className='menu-item__toggle' type='checkbox' onChange={props.onToggle} />
      <span className='menu-item__label'>{props.label}</span>
      {renderAuthLink()}
    </div>
  );
}

export default MenuItem;
