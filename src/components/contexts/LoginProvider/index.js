import React from 'react'

import LoginContext from '../LoginContext'

import useLogin from '../../../ducks/login'
import useCheckUser from '../../../ducks/checkUser'
import useHandleUser from '../../../ducks/handleUser'

const LoginProvider = ({ children }) => {
  const [loginState, login, resetLoginState] = useLogin()
  const [state, onChangeUsername, onChangePassword] = useHandleUser()
  const [checkUserState, checkUser, resetCheckUserState] = useCheckUser()

  return (
    <LoginContext.Provider
      value={{
        login,
        state,
        checkUser,
        loginState,
        checkUserState,
        resetLoginState,
        onChangeUsername,
        onChangePassword,
        resetCheckUserState
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}

export default LoginProvider
