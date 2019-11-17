import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Icon, IconButton } from '@quoll/ui-components'

import routes from '../../../routes'

const routesHash = routes.reduce((map, route) => {
  map[route.id] = { ...route }
  return map
}, {})

const Title = styled.div(
  ({ theme: { colors, font } }) => css`
    color: ${colors.mediumAquamarine};
    flex-basis: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${`Pacifico, ${font.family}`};
    font-size: 26px;
    margin: 0 0 20px;
  `
)

const NavGroup = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

const NavPrimary = styled.nav`
  flex-grow: 1;
`

const IconWrapper = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.mediumAquamarine};
  `
)

const itemStyle = css`
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  margin: 20px 0;
  padding: 5px;
`

const StyledNavLink = styled(NavLink)(
  ({ theme: { colors } }) => css`
    ${itemStyle};

    &.active {
      padding: 5px 0 5px 5px;
      border-right: 5px solid ${colors.mediumAquamarine};
    }
  `
)

const Help = styled.div(itemStyle)

const SideBarVertical = ({ onHelpClick }) => (
  <Fragment>
    <Title>Quoll</Title>
    <NavGroup>
      <NavPrimary>
        <StyledNavLink to={routesHash.home.path} exact activeClassName="active">
          <IconWrapper>
            <Icon.Map />
          </IconWrapper>
        </StyledNavLink>
      </NavPrimary>
      <nav>
        <StyledNavLink to={routesHash.settings.path} activeClassName="active">
          <IconWrapper>
            <Icon.Settings />
          </IconWrapper>
        </StyledNavLink>
      </nav>
    </NavGroup>
    <Help>
      <IconWrapper>
        <IconButton.Help onClick={onHelpClick} />
      </IconWrapper>
    </Help>
  </Fragment>
)

SideBarVertical.propTypes = {
  onHelpClick: PropTypes.func.isRequired,
}

export default SideBarVertical
