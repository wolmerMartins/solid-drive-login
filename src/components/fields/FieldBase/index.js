import React from 'react'

import './style.css'

const FieldBase = ({
  id,
  label,
  children
}) => (
  <fieldset className="FieldBase">
    <label
      htmlFor={id}
      className="FieldBase-label"
    >
      {label}
    </label>
    {children}
  </fieldset>
)

export default FieldBase
