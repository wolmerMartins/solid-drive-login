export const INITIAL_STATE = {
  loginExpiration: null,
  error: null,
  data: null
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const RESET_STATE = 'RESET_STATE'

export const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  data
})
export const loginFail = error => ({
  type: LOGIN_FAIL,
  error
})

export const resetState = () => ({
  type: RESET_STATE
})

export default (state, action) => {
  const { type, data, error } = action

  switch(type) {
    case RESET_STATE:
      return INITIAL_STATE
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        data
      }
    case LOGIN_FAIL:
      return {
        ...state,
        error
      }
    default:
      return state
  }
}
