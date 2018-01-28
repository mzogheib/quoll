import React from 'react';
import './style.css';
import MenuItem from '../menu-item'

function MenuItems(props) {
  function renderItems() {
    return props.items.map(item => {
      return (
        <MenuItem
          key={item.id}
          label={item.name}
          onToggle={() => { props.onItemToggle(item.id); }}
        />
      );
    });
  }

  return (
    <div className='menu-items'>{renderItems()}</div>
  );
}

export default MenuItems;
