import React from 'react'

import './style.css'

const ButtonBase = ({
  className = '',
  children = 'OK',
  disabled = false,
  onClick = () => {}
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`ButtonBase ${className}`}
  >
    {children}
  </button>
)

export default ButtonBase
