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

const defaultStyle = ({ theme: { colors }, disabled }) => css`
  border: none;
  border-radius: 4px;

  height: 36px;
  min-width: 120px;
  background-color: ${colors.whiteSmoke};
  padding: 0 15px;

  color: ${colors.mineShaft};
  font-size: 14px;

  &:hover {
    cursor: pointer;
    background-color: ${darken(0.05, colors.whiteSmoke)};
  }

  ${disabledRules(disabled, colors.whiteSmoke, colors.mineShaft)};
`

const primaryStyle = ({ theme: { colors }, disabled }) => css`
  background-color: ${colors.mediumAquamarine};

  &:hover {
    cursor: pointer;
    background-color: ${darken(0.05, colors.mediumAquamarine)};
  }

  ${disabledRules(disabled, colors.mediumAquamarine, colors.mineShaft)};
`

const plainStyle = ({ theme: { colors }, disabled }) => css`
  background-color: ${colors.transparent};
  font-weight: 500;

  height: unset;
  min-width: unset;
  padding: 0;

  &:hover {
    cursor: pointer;
    background-color: ${darken(0.05, colors.transparent)};
  }

  ${disabledRules(disabled, colors.transparent, colors.mineShaft)};
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

const Button = styled.button([defaultStyle])
Button.displayName = 'Button'
Button.propTypes = propTypes
Button.defaultProps = defaultProps

const PrimaryButton = styled(Button)([primaryStyle])
PrimaryButton.displayName = 'Button.Primary'
PrimaryButton.propTypes = propTypes
PrimaryButton.defaultProps = defaultProps

const PlainButton = styled(Button)([plainStyle])
PlainButton.displayName = 'Button.Plan'
PlainButton.propTypes = propTypes
PlainButton.defaultProps = defaultProps

Button.Primary = PrimaryButton
Button.Plain = PlainButton

export default Button
