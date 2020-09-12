import React from 'react'

import FieldBase from '../FieldBase'
import InputText from '../../inputs/InputText'

const UsernameField = ({ value, onChange }) => (
  <FieldBase
    label="Usuário"
    id="username-field"
  >
    <InputText
      value={value}
      onChange={onChange}
      id="username-field"
      placeholder="Nome de usuário ou e-mail"
    />
  </FieldBase>
)

export default UsernameField
