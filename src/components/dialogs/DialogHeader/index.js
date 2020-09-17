import React from 'react'

import logo from '../../../assets/images/logo.png'

import './style.css'

const DialogHeader = ({
  image = logo,
  title = 'Solid Drive'
}) => (
  <header>
    <div className="Dialog-title-container">
      <img className="Dialog-logo" src={image} alt="Dialog title logo" />
      <h1 className="Dialog-title">{title}</h1>
    </div>
  </header>
)

export default DialogHeader
