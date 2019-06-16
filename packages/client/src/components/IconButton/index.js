import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import IconComponent from '../Icon'

const Wrapper = styled.button(
  ({ theme: { colors }, disabled }) => css`
    border: none;
    background: transparent;
    padding: 0;
    color: ${disabled ? colors.grey : 'unset'};
    cursor: ${disabled ? 'unset' : 'pointer'};
  `
)

const icons = Object.entries(IconComponent)

const IconButton = icons.reduce((prev, [name, Icon]) => {
  const ButtonComp = ({ onClick, disabled, ...rest }) => (
    <Wrapper onClick={onClick} disabled={disabled}>
      <Icon {...rest} />
    </Wrapper>
  )

  ButtonComp.displayName = `IconButton.${name}`
  ButtonComp.propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  }
  ButtonComp.defaultProps = {
    disabled: false,
  }

  return {
    [name]: ButtonComp,
    ...prev,
  }
}, {})

export default IconButton
