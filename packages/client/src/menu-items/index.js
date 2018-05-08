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

  function handleSelectLine(line) {
    props.onSelectLine(line);
  }

  function renderItems() {
    return props.items.map((item, index) => {
      return (
        <MenuItem
          key={index}
          item={item}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          onSelectLine={handleSelectLine}
        />
      );
    });
  }

  return (
    <div className='menu-items'>{renderItems()}</div>
  );
}

export default MenuItems;
