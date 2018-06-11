import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

function SideBar() {
  return <div className="side-bar">
      SideBar
      <NavLink to={'/'}>Map</NavLink>
      <NavLink to={'/settings'}>Settings</NavLink>
    </div>;
}

export default SideBar;
