import React from 'react';
import './style.css';

function MenuItem(props) {
  const renderSummary = () => {
    if (props.item.connected) {
      return (
        <div className='menu-item__summary-wrapper'>
          <span className='menu-item__summary'>{props.item.data.length}</span>
          <button className='menu-item__expand'>More</button>
        </div>
      );      
    } else {      
      return (
        <div className='menu-item__summary-wrapper'>
          <a href={props.item.authUrl}>Connect</a>
        </div>
      );
    }
  }

  return (
    <div className='menu-item'>
      <span className='menu-item__name'>{props.item.name}</span>
      {renderSummary()}
    </div>
  );
}

export default MenuItem;
