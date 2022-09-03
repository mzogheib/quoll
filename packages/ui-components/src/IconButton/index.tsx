import React, { ComponentProps } from 'react'
import styled, { css } from 'styled-components'

import Icon from '../Icon'

const Wrapper = styled.button(
  ({ theme: { colors }, disabled }) => css`
    display: block;
    border: none;
    background: transparent;
    padding: 0;
    color: ${disabled ? colors.grey : 'unset'};
    cursor: ${disabled ? 'unset' : 'pointer'};
  `
)

type IconProps = ComponentProps<typeof Icon>
type WrapperProps = ComponentProps<typeof Wrapper>

type Props = IconProps & WrapperProps

const IconButton = ({ icon, size, ...buttonProps }: Props) => (
  <Wrapper {...buttonProps}>
    <Icon icon={icon} size={size} />
  </Wrapper>
)

export default IconButton
