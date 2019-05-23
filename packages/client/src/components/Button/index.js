import React from 'react'
import './style.scss'

const renderBase = ({ className = 'default-button', label, onClick }) => (
  <button className={className} onClick={onClick}>
    {label}
  </button>
)

const Button = props => renderBase(props)

Button.Primary = props => renderBase({ className: 'primary-button', ...props })
Button.Primary.displayName = 'PrimaryButton'

export default Button
