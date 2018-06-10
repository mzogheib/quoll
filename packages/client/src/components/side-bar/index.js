import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

function SideBar() {
  return (
    <div className="side-bar">
      <div className="side-bar__title"><span>Quoll</span></div>
      <div className="side-bar__nav">
        <div className="side-bar__nav-upper">
          <NavLink to={'/'} exact className="side-bar__link" activeClassName="side-bar__link-active">
            <div className="side-bar__link-icon">Map</div>
            <div className="side-bar__link-active-indicator"></div>
          </NavLink>
        </div>
        <div className="side-bar__nav-lower">
          <NavLink to={'/settings'} className="side-bar__link" activeClassName="side-bar__link-active">
            <div className="side-bar__link-icon">Settings</div>
            <div className="side-bar__link-active-indicator"></div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
