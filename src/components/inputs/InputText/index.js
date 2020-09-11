import React from 'react'

import InputBase from '../InputBase'

const InputText = ({
  id,
  name,
  value,
  onChange,
  placeholder
}) => (
  <InputBase
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
)

export default InputText
