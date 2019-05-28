import React from 'react'

import utils from '../../services/utils'
import IconComponent from '../Icon'
import './style.scss'

const icons = Object.entries(IconComponent)

const IconButton = icons.reduce((prev, [name, Icon]) => {
  const ButtonComp = ({ onClick, disabled, ...rest }) => (
    <button
      className={utils.joinClassNames([
        'icon-button',
        disabled && '--disabled',
      ])}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon {...rest} />
    </button>
  )
  ButtonComp.displayName = `IconButton.${name}`
  return {
    [name]: ButtonComp,
    ...prev,
  }
}, {})

export default IconButton
