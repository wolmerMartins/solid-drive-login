import React from 'react'

import FieldBase from '../FieldBase'
import InputPassword from '../../inputs/InputPassword'

const PasswordField = ({ value, onChange }) => (
  <FieldBase
    label="Senha"
    id="password-field"
  >
    <InputPassword
      value={value}
      id="password-field"
      onChange={onChange}
    />
  </FieldBase>
)

export default PasswordField
