import React, { useContext } from 'react'

import LoginContext from '../../contexts/LoginContext'

import Dialog from '../Dialog'
import DialogHeader from '../DialogHeader'
import UsernameField from '../../fields/UsernameField'
import PasswordField from '../../fields/PasswordField'
import DialogContentSteps from '../DialogContentSteps'
import InlineErrorMessage from '../../messages/InlineErrorMessage'
import { ACTION_KEY, COMPONENT_KEY, BACK_TEXT_KEY, BACK_ACTION_KEY } from '../DialogContentSteps/constants'

import { ERROR_MESSAGES } from './constants'

import './style.css'

const LoginDialog = () => {
  const {
    login,
    checkUser,
    loginState,
    checkUserState,
    resetLoginState,
    onChangePassword,
    onChangeUsername,
    resetCheckUserState,
    state: {
      username,
      password
    },
  } = useContext(LoginContext)

  const error = {
    has: checkUserState.error || loginState.error,
    code: checkUserState?.error?.code ?? loginState?.error?.code
  }

  const onChangePasswordField = e => {
    if (error.has) resetLoginState()
    onChangePassword(e)
  }

  const cleanPassword = () => onChangePasswordField({ target: { value: '' } })

  const onChangeUsernameField = e => {
    if (error.has) resetCheckUserState()
    onChangeUsername(e)
  }

  return (
    <Dialog open>
      <DialogHeader />
      {error.has &&
        <InlineErrorMessage message={ERROR_MESSAGES.get(error.code)} />
      }
      <DialogContentSteps
        steps={new Map([
          [1, new Map([
            [COMPONENT_KEY, <UsernameField value={username} onChange={onChangeUsernameField} />],
            [ACTION_KEY, () => checkUser(username)]
          ])],
          [2, new Map([
            [COMPONENT_KEY, <PasswordField value={password} onChange={onChangePasswordField} />],
            [ACTION_KEY, () => login({ login: username, password })],
            [BACK_ACTION_KEY, cleanPassword],
            [BACK_TEXT_KEY, username]
          ])]
        ])}
        footer={new Map([
          [1, <span>Não tem uma conta? <a href="/" className="LoginDialog-link">Crie uma!</a></span>],
          [2, <a href="/" className="LoginDialog-link">Esqueceu a senha?</a>]
        ])}
      />
    </Dialog>
  )
}

export default LoginDialog
