import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import routes from '../../routes'
import Icon from '../Icon'
import IconButton from '../IconButton'
import './index.scss'

const routesHash = routes.reduce((map, route) => {
  map[route.id] = { ...route }
  return map
}, {})

const SideBar = ({ onHelpClick }) => (
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
            <Icon.Map size={40} />
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
            <Icon.Settings size={40} />
          </div>
          <div className="side-bar__link-active-indicator" />
        </NavLink>
        <div className="side-bar__item">
          <div className="side-bar__link-icon">
            <IconButton.Help onClick={onHelpClick} size={40} />
          </div>
        </div>
      </div>
    </div>
  </div>
)

SideBar.propTypes = {
  onHelpClick: PropTypes.func.isRequired,
}

export default SideBar
