import React from 'react'

import LoginProvider from '../../contexts/LoginProvider'

import { default as Component } from './LoginDialog'

const LoginDialog = () => (
  <LoginProvider>
    <Component />
  </LoginProvider>
)

export default LoginDialog
