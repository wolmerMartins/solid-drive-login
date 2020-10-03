import { useReducer } from 'react'

import api from '../../service/api'

import reducer, { INITIAL_STATE, resetState, loginSuccess, loginFail } from './login'

const useLogin = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const login = async body => {
    try {
      const { data } = await api.login(body)
      dispatch(loginSuccess(data))
    } catch(err) {
      const { response: { data } } = err
      dispatch(loginFail(data))
    }
  }

  const resetLoginState = () => dispatch(resetState())

  return [state, login, resetLoginState]
}

export default useLogin
