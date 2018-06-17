import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';
import MapIcon from 'react-icons/lib/md/map';
import SettingsIcon from 'react-icons/lib/md/settings';

function SideBar() {
  return (
    <div className="side-bar">
      <div className="side-bar__title"><span>Quoll</span></div>
      <div className="side-bar__nav">
        <div className="side-bar__nav-upper">
          <NavLink to={'/'} exact className="side-bar__link" activeClassName="side-bar__link-active">
            <div className="side-bar__link-icon"><MapIcon size={40}/></div>
            <div className="side-bar__link-active-indicator"></div>
          </NavLink>
        </div>
        <div className="side-bar__nav-lower">
          <NavLink to={'/settings'} className="side-bar__link" activeClassName="side-bar__link-active">
            <div className="side-bar__link-icon"><SettingsIcon size={40}/></div>
            <div className="side-bar__link-active-indicator"></div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
