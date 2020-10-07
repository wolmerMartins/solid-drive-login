export const INITIAL_STATE = {
  error: null,
  exists: false
}

export const USER_EXISTS = 'USER_EXISTS'
export const RESET_STATE = 'RESET_STATE'
export const USER_NOT_FOUND = 'USER_NOT_FOUND'

export const userExists = () => ({
  type: USER_EXISTS
})
export const resetState = () => ({
  type: RESET_STATE
})
export const userNotFound = error => ({
  type: USER_NOT_FOUND,
  error
})

export default (state, action) => {
  const { type, error } = action

  switch(type) {
    case USER_EXISTS:
      return {
        ...state,
        error: null,
        exists: true
      }
    case USER_NOT_FOUND:
      return {
        ...state,
        exists: false,
        error
      }
    case RESET_STATE:
      return INITIAL_STATE
    default:
      return state
  }
}
