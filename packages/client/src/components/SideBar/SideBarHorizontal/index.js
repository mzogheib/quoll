import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Icon, IconButton } from '@quoll/ui-components'

import routes from '../../../routes'

const routesHash = routes.reduce((map, route) => {
  map[route.id] = { ...route }
  return map
}, {})

const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    background-color: ${colors.mineShaft};
    display: flex;
    justify-content: space-around;
    min-height: 55px;
  `
)

const IconWrapper = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.mediumAquamarine};
  `
)

const itemStyle = css`
  min-width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`

const StyledNavLink = styled(NavLink)(
  ({ theme: { colors } }) => css`
    ${itemStyle};

    &.active {
      padding: 0 0 5px;
      border-top: 5px solid ${colors.mediumAquamarine};
    }
  `
)

const Help = styled.div(itemStyle)

const SideBarHorizontal = ({ onHelpClick }) => (
  <Wrapper>
    <Help>
      <IconWrapper>
        <IconButton.Help onClick={onHelpClick} />
      </IconWrapper>
    </Help>
    <StyledNavLink to={routesHash.home.path} exact activeClassName="active">
      <IconWrapper>
        <Icon.Map />
      </IconWrapper>
    </StyledNavLink>
    <StyledNavLink to={routesHash.settings.path} activeClassName="active">
      <IconWrapper>
        <Icon.Settings />
      </IconWrapper>
    </StyledNavLink>
  </Wrapper>
)

SideBarHorizontal.propTypes = {
  onHelpClick: PropTypes.func.isRequired,
}

export default SideBarHorizontal
