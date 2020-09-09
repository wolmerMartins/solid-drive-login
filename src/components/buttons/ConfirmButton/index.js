import React from 'react'

import Button from '../Button'

import './style.css'

const ConfirmButton = ({ onClick, children }) => (
  <Button
    onClick={onClick}
    className="ConfirmButton"
  >
    {children}
  </Button>
)

export default ConfirmButton
