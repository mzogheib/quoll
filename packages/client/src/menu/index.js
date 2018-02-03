import React from 'react';
import './style.css';
import Filter from '../filter';
import MenuItems from '../menu-items';

function Menu(props) {
  return (
    <div className='menu'>
      <div className='menu__title'>Heatmaps</div>
      <div className='menu__filter'><Filter onUpdate={props.onFilterUpdate}></Filter></div>
      <div className='menu__items'><MenuItems items={props.items} onItemToggle={props.onItemToggle}></MenuItems></div>
    </div>
  );
}

export default Menu;
