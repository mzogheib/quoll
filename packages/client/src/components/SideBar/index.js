import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import SideBarVertical from './SideBarVertical'

const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    flex-direction: column;
    background-color: ${colors.mineShaft};
    min-width: 100px;
  `
)

const SideBar = ({ onHelpClick }) => (
  <Wrapper>
    <SideBarVertical onHelpClick={onHelpClick} />
  </Wrapper>
)

SideBar.propTypes = {
  onHelpClick: PropTypes.func.isRequired,
}

export default SideBar
