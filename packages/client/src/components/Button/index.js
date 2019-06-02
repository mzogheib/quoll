import styled, { css } from 'styled-components'
import { lighten, darken } from 'polished'
import PropTypes from 'prop-types'

const disabledRules = (disabled, backgroundColor, color) => {
  if (!disabled) return

  return css`
    background-color: ${lighten(0.1, backgroundColor)};
    color: ${lighten(0.4, color)};

    &:hover {
      cursor: unset;
      background-color: ${lighten(0.1, backgroundColor)};
    }
  `
}

const hitboxRules = noHitbox => {
  if (!noHitbox) return

  return css`
    height: unset;
    min-width: unset;
    padding: 0;
  `
}

const makeStyle = ({ color, backgroundColor, bold, disabled, noHitbox }) => css`
  border: none;
  border-radius: 4px;

  height: 36px;
  min-width: 120px;
  background-color: ${backgroundColor};
  padding: 0 15px;

  color: ${color};
  font-size: 14px;
  font-weight: ${bold ? 500 : null};

  &:hover {
    cursor: pointer;
    background-color: ${darken(0.05, backgroundColor)};
  }

  ${disabledRules(disabled, backgroundColor, color)};

  ${hitboxRules(noHitbox)};
`

const defaultStyle = ({ theme: { colors }, disabled }) => css`
  ${makeStyle({
    color: colors.mineShaft,
    backgroundColor: colors.whiteSmoke,
    disabled,
  })};
`

const primaryStyle = ({ theme: { colors }, disabled }) => css`
  ${makeStyle({
    color: colors.mineShaft,
    backgroundColor: colors.mediumAquamarine,
    disabled,
  })};
`

const plainStyle = ({ theme: { colors }, disabled }) => css`
  ${makeStyle({
    color: colors.mineShaft,
    backgroundColor: colors.transparent,
    bold: true,
    disabled,
    noHitbox: true,
  })};
`

const propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
}

const defaultProps = {
  disabled: false,
  type: 'button',
}

// Choosing to create three separate styled components instead of the base
// one which could then be extended by Primary and Plain.
// This avoids classes that have multiple overrides. On the other hand,
// it ends up creating three sets of distinct styles.
const Button = {
  ...styled.button([defaultStyle]),
  displayName: 'Button',
  propTypes,
  defaultProps,
}

Button.Primary = {
  ...styled.button([primaryStyle]),
  displayName: 'Button.Primary',
  propTypes,
  defaultProps,
}

Button.Plain = {
  ...styled.button([plainStyle]),
  displayName: 'Button.Plain',
  propTypes,
  defaultProps,
}

export default Button
