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
      <span className='menu-item__label'>{props.label}</span>
      {renderAuthLink()}
    </div>
  );
}

export default MenuItem;
