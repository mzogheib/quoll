import React from 'react';
import './style.css';
import DatePicker from '../../containers/date-picker';
import MenuItems from '../menu-items';

function Menu(props) {
  return (
    <div className='menu'>
      <div className='menu__title'>Quoll</div>
      <div className='menu__filter'><DatePicker /></div>
      <div className='menu__items'>
        <MenuItems
          items={props.items}
        />
      </div>
    </div>
  );
}

export default Menu;
