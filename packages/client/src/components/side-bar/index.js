import React from 'react'
import { NavLink } from 'react-router-dom'
import './style.css'
import MapIcon from 'react-icons/lib/md/map'
import HelpIcon from 'react-icons/lib/md/help-outline'
import SettingsIcon from 'react-icons/lib/md/settings'
import routes from '../../routes'

function SideBar(props) {
  const routesHash = routes.reduce((map, route) => {
    map[route.id] = { ...route }
    return map
  }, {})

  return (
    <div className="side-bar">
      <div className="side-bar__title">
        <span>Quoll</span>
      </div>
      <div className="side-bar__nav">
        <div className="side-bar__nav-upper">
          <NavLink
            to={routesHash.home.path}
            exact
            className="side-bar__item"
            activeClassName="side-bar__link-active"
          >
            <div className="side-bar__link-icon">
              <MapIcon size={40} />
            </div>
            <div className="side-bar__link-active-indicator" />
          </NavLink>
        </div>
        <div className="side-bar__nav-lower">
          <NavLink
            to={routesHash.settings.path}
            className="side-bar__item"
            activeClassName="side-bar__link-active"
          >
            <div className="side-bar__link-icon">
              <SettingsIcon size={40} />
            </div>
            <div className="side-bar__link-active-indicator" />
          </NavLink>
          <div className="side-bar__item" onClick={props.onHelpClick}>
            <div className="side-bar__link-icon">
              <HelpIcon size={40} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar
