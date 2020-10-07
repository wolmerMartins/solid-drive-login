import reducer, {
  INITIAL_STATE,
  USER_EXISTS,
  userExists,
  USER_NOT_FOUND,
  userNotFound,
  RESET_STATE,
  resetState
} from '../checkUser'

describe('checkUser', () => {
  describe('action creators', () => {
    it('Returns the USER_EXISTS action', () => {
      const expectedAction = { type: USER_EXISTS }

      expect(userExists())
        .toEqual(expectedAction)
    })

    it('Returns the USER_NOT_FOUND action with error message', () => {
      const expectedAction = {
        type: USER_NOT_FOUND,
        error: {
          code: 'login2',
          message: 'User not found'
        }
      }

      expect(userNotFound({ code: 'login2', message: 'User not found' }))
        .toEqual(expectedAction)
    })

    it('Returns the RESET_STATE action', () => {
      const expectedAction = { type: RESET_STATE }

      expect(resetState())
        .toEqual(expectedAction)
    })
  })

  describe('reducer', () => {
    it('Changes the \'exists\' from state to \'true\'', () => {
      const expectedState = {
        ...INITIAL_STATE,
        exists: true
      }

      expect(reducer(INITIAL_STATE, userExists()))
        .toEqual(expectedState)
    })

    it('Cleans the \'error\' and changes the \'exists\' to \'true\'', () => {
      const state = {
        ...INITIAL_STATE,
        error: {
          code: 'login2',
          message: 'User not found'
        }
      }

      expect(reducer(state, userExists()))
        .toEqual({
          ...state,
          error: null,
          exists: true
        })
    })

    it('Adds the \'not found\' message to the state', () => {
      const expectedState = {
        ...INITIAL_STATE,
        error: {
          code: 'login2',
          message: 'User not found'
        }
      }

      expect(reducer(INITIAL_STATE, userNotFound({ code: 'login2', message: 'User not found' })))
        .toEqual(expectedState)
    })

    it('Changes the \'exists\' to \'false\' when user not exists', () => {
      const state = {
        ...INITIAL_STATE,
        exists: true
      }

      expect(reducer(state, userNotFound({ code: 'login2' })))
        .toEqual({
          ...state,
          exists: false,
          error: { code: 'login2' }
        })
    })

    it('Returns the state to the INITIAL_STATE', () => {
      const state = {
        ...INITIAL_STATE,
        exists: true,
        error: {
          code: 'login2',
          message: 'User not found'
        }
      }

      expect(reducer(state, resetState()))
        .toEqual(INITIAL_STATE)
    })
  })
})
