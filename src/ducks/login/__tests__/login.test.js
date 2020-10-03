import reducer, {
  INITIAL_STATE,
  LOGIN_SUCCESS,
  loginSuccess,
  LOGIN_FAIL,
  loginFail,
  RESET_STATE,
  resetState
} from '../login'

describe('handleUser', () => {
  describe('action creators', () => {
    it('Returns the action with data', () => {
      const expectedAction = {
        type: LOGIN_SUCCESS,
        data: { success: true }
      }

      expect(loginSuccess({ success: true }))
        .toEqual(expectedAction)
    })

    it('Returns the action with an error', () => {
      const expectedAction = {
        type: LOGIN_FAIL,
        error: {
          code: 'login1',
          message: 'Authentication failed'
        }
      }

      expect(loginFail({ code: 'login1', message: 'Authentication failed' }))
        .toEqual(expectedAction)
    })

    it('Returns the action with type RESET_STATE', () => {
      const expectedAction = {
        type: RESET_STATE
      }

      expect(resetState())
        .toEqual(expectedAction)
    })
  })

  describe('reducer', () => {
    it('Fills the state with the successful login', () => {
      const expectedState = {
        ...INITIAL_STATE,
        data: { success: true }
      }

      expect(reducer(INITIAL_STATE, loginSuccess({ success: true })))
        .toEqual(expectedState)
    })

    it('Fills the state with login error', () => {
      const expectedState = {
        ...INITIAL_STATE,
        error: {
          code: 'login1',
          message: 'Authentication failed'
        }
      }

      expect(reducer(INITIAL_STATE, loginFail({
        code: 'login1',
        message: 'Authentication failed'
      }))).toEqual(expectedState)
    })

    it('Turn the altered state into INITIAL_STATE', () => {
      const state = {
        ...INITIAL_STATE,
        error: {
          code: 'login1',
          message: 'Authentication failed'
        }
      }

      expect(reducer(state, resetState()))
        .toEqual(INITIAL_STATE)
    })

    it('Returns the INITIAL_STATE for a not mapped action', () => {
      expect(reducer(INITIAL_STATE, { type: 'NOT_MAPPED' }))
        .toEqual(INITIAL_STATE)
    })
  })
})
