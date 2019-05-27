import React from 'react'
import PropTypes from 'prop-types'

import utils from '../../services/utils'
import './style.scss'

const classMap = {
  default: 'default-button',
  primary: 'primary-button',
  plain: 'plain-button',
}

const hitboxClassMap = {
  small: '--hitbox-small',
  none: '--hitbox-none',
}

const renderBase = ({
  variant = 'default',
  label,
  onClick,
  disabled,
  bold,
  hitboxSize,
}) => (
  <button
    className={utils.joinClassNames([
      classMap[variant],
      disabled && '--disabled',
      bold && '--bold',
      hitboxClassMap[hitboxSize],
    ])}
    onClick={onClick}
    disabled={disabled}
    type="button"
  >
    {label}
  </button>
)

const propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

const defaultProps = {
  disabled: false,
}

const Button = props => renderBase(props)
Button.propTypes = propTypes
Button.defaultProps = defaultProps

Button.Primary = props => renderBase({ variant: 'primary', ...props })
Button.Primary.displayName = 'Button.Primary'
Button.Primary.propTypes = propTypes
Button.Primary.defaultProps = defaultProps

Button.Plain = props =>
  renderBase({
    variant: 'plain',
    bold: true,
    hitboxSize: 'none',
    ...props,
  })
Button.Plain.displayName = 'Button.Plain'
Button.Plain.propTypes = propTypes
Button.Plain.defaultProps = defaultProps

export default Button
