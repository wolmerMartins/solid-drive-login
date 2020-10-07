import { useReducer } from 'react'

import api from '../../service/api'

import reducer, { INITIAL_STATE, userExists, resetState, userNotFound } from './checkUser'

const validateUsername = username => {
  if (!username) {
    throw new Error('EMPTY_USERNAME')
  }
}

const useCheckUser = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const checkUser = async username => {
    try {
      validateUsername(username)
      await api.checkUser(username)
      dispatch(userExists())
    } catch(err) {
      const error = err?.response?.data ?? { code: err.message }

      dispatch(userNotFound(error))

      return error
    }
  }

  const resetCheckUserState = () => dispatch(resetState())

  return [state, checkUser, resetCheckUserState]
}

export default useCheckUser
