import reducer, {
  INITIAL_STATE,
  CHANGE_USERNAME,
  changeUsername,
  CHANGE_PASSWORD,
  changePassword
} from '../handleUser'

describe('handleUser', () => {
  describe('action creators', () => {
    it('Returns the action with username', () => {
      const expectedAction = {
        type: CHANGE_USERNAME,
        username: 'testmock'
      }

      expect(changeUsername('testmock'))
        .toEqual(expectedAction)
    })

    it('Returns the action with password', () => {
      const expectedAction = {
        type: CHANGE_PASSWORD,
        password: 'test1234@'
      }

      expect(changePassword('test1234@'))
        .toEqual(expectedAction)
    })
  })

  describe('reducer', () => {
    it('Adds the username to the state', () => {
      const expectedState = {
        ...INITIAL_STATE,
        username: 'testmock'
      }

      expect(reducer(INITIAL_STATE, changeUsername('testmock')))
        .toEqual(expectedState)
    })

    it('Adds the password to the state', () => {
      const expectedState = {
        ...INITIAL_STATE,
        password: 'test1234@'
      }

      expect(reducer(INITIAL_STATE, changePassword('test1234@')))
        .toEqual(expectedState)
    })

    it('Returns the INITIAL_STATE', () => {
      expect(reducer(INITIAL_STATE, { type: 'test' }))
        .toEqual(INITIAL_STATE)
    })
  })
})
