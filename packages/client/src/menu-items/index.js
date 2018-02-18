import React from 'react';
import './style.css';
import MenuItem from '../menu-item'

function MenuItems(props) {
  function renderItems() {
    return props.items.map(item => {
      return (
        <MenuItem
          key={item.id}
          item={item}
        />
      );
    });
  }

  return (
    <div className='menu-items'>{renderItems()}</div>
  );
}

export default MenuItems;
