import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Flex, Icon, IconButton } from '@quoll/ui-components'

import { routesHash, IconWrapper } from '../common/'

const Wrapper = styled(Flex).attrs({ direction: 'column' })(
  ({ theme: { colors } }) => css`
    background-color: ${colors.mineShaft};
    min-width: 100px;
    height: 100%;
  `
)

const Title = styled(Flex).attrs({
  alignItems: 'center',
  justifyContent: 'center',
  mb: 20,
})(
  ({ theme: { colors, font } }) => css`
    color: ${colors.mediumAquamarine};
    flex-basis: 40px;
    font-family: ${`Pacifico, ${font.family}`};
    font-size: 26px;
  `
)

const NavGroup = styled(Flex).attrs({ direction: 'column' })`
  flex-grow: 1;
`

const NavPrimary = styled.nav`
  flex-grow: 1;
`

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
  <Wrapper>
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
  </Wrapper>
)

SideBarVertical.propTypes = {
  onHelpClick: PropTypes.func.isRequired,
}

export default SideBarVertical
