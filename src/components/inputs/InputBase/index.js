import React from 'react'

import './style.css'

const InputBase = ({
  id,
  name,
  value = '',
  type = 'text',
  className = '',
  disabled = false,
  onChange = () => {},
  placeholder = 'Digite'
}) => (
  <input
    id={id}
    name={name}
    type={type}
    value={value}
    disabled={disabled}
    onChange={onChange}
    placeholder={placeholder}
    className={`InputBase ${className}`}
  />
)

export default InputBase
