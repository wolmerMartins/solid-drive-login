import React from 'react'

import InputBase from '../InputBase'

const InputPassword = ({
  id,
  name,
  value,
  onChange,
  placeholder = 'Senha'
}) => (
  <InputBase
    id={id}
    name={name}
    value={value}
    type="password"
    onChange={onChange}
    placeholder={placeholder}
  />
)

export default InputPassword
