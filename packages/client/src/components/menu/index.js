import React from 'react';
import './style.css';
import Filter from '../filter';
import MenuItems from '../menu-items';

function Menu(props) {
  return (
    <div className='menu'>
      <div className='menu__title'>Quoll</div>
      <div className='menu__filter'><Filter onUpdate={props.onFilterUpdate} /></div>
      <div className='menu__items'>
        <MenuItems
          items={props.items}
          onConnect={props.onConnect}
          onDisconnect={props.onDisconnect}
          onSelectLine={props.onSelectLine}
        />
      </div>
    </div>
  );
}

export default Menu;
