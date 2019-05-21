import React from 'react'
import './style.scss'

// TODO: come up with a better solution to joining classnames
const Button = ({ className = '', label, onClick }) => (
  <button className={`button ${className}`} onClick={onClick}>
    {label}
  </button>
)

export default Button
