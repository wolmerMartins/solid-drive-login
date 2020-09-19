export const INITIAL_STATE = {
  username: '',
  password: ''
}

export const CHANGE_USERNAME = 'CHANGE_USERNAME'
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'

export const changeUsername = username => ({
  type: CHANGE_USERNAME,
  username
})
export const changePassword = password => ({
  type: CHANGE_PASSWORD,
  password
})

const reducer = (state, action) => {
  const { type, username, password } = action

  switch(type) {
    case CHANGE_USERNAME:
      return {
        ...state,
        username
      }
    case CHANGE_PASSWORD:
      return {
        ...state,
        password
      }
    default:
      return state
  }
}

export default reducer
