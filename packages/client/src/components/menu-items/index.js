import React from 'react';
import './style.css';
import MenuItem from '../../containers/menu-item'

function MenuItems(props) {

  function renderItems() {
    return props.items.map((item, index) => {
      return (
        <MenuItem
          key={index}
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
