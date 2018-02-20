import React from 'react';
import './style.css';
import MenuItem from '../menu-item'

function MenuItems(props) {
  function handleDisconnect(id) {
    props.onDisconnect(id);
  }

  function handleConnect(id) {
    props.onConnect(id);
  }

  function renderItems() {
    return props.items.map(item => {
      return (
        <MenuItem
          key={item.id}
          item={item}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />
      );
    });
  }

  return (
    <div className='menu-items'>{renderItems()}</div>
  );
}

export default MenuItems;
