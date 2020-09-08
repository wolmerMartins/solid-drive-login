import React from 'react'

import ButtonBase from '../ButtonBase'

import './style.css'

const Button = ({
  onClick,
  children,
  className = '',
}) => (
  <ButtonBase
    onClick={onClick}
    className={`Button ${className}`}
  >
    {children}
  </ButtonBase>
)

export default Button
