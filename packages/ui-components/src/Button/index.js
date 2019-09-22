import React from 'react'

const Button = ({ children, ...props }) => (
  <button style={{ backgroundColor: 'red' }} {...props}>
    {children}
  </button>
)

export default Button
