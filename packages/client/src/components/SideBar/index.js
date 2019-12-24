import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import SideBarVertical from './SideBarVertical'
import SideBarHorizontal from './SideBarHorizontal'

const WrapperV = styled.div(
  ({ theme: { media } }) => css`
    ${media.breakpointDown(media.md)`
      display: none;
    `};
  `
)

const WrapperH = styled.div(
  ({ theme: { media } }) => css`
    ${media.breakpointUp(media.md)`
      display: none;
    `};
  `
)

const SideBar = ({ onHelpClick }) => (
  <Fragment>
    <WrapperV>
      <SideBarVertical onHelpClick={onHelpClick} />
    </WrapperV>
    <WrapperH>
      <SideBarHorizontal onHelpClick={onHelpClick} />
    </WrapperH>
  </Fragment>
)

SideBar.propTypes = {
  onHelpClick: PropTypes.func.isRequired,
}

export default SideBar
