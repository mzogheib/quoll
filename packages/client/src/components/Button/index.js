import React from 'react'
import './style.scss'

// Filter out falsey values
const joinClassNames = classNameArray => classNameArray.filter(c => c).join(' ')

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
    className={joinClassNames([
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

const Button = props => renderBase(props)

Button.Primary = props => renderBase({ variant: 'primary', ...props })
Button.Primary.displayName = 'PrimaryButton'

Button.Plain = props =>
  renderBase({
    variant: 'plain',
    bold: true,
    hitboxSize: 'none',
    ...props,
  })
Button.Plain.displayName = 'PlainButton'

export default Button
