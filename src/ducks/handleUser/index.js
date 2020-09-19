import { useReducer } from 'react'

import reducer, { INITIAL_STATE, changeUsername, changePassword } from './handleUser'

const useHandleUser = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const onChangeUsername = e => dispatch(changeUsername(e.target.value))

  const onChangePassword = e => dispatch(changePassword(e.target.value))

  return [state, onChangeUsername, onChangePassword]
}

export default useHandleUser
