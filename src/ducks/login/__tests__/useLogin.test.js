import { renderHook, act } from '@testing-library/react-hooks'

import useLogin from '../index'
import { INITIAL_STATE } from '../login'

import api from '../../../service/api'

const loginSpy = jest.spyOn(api, 'login')

describe('useLogin', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Returns the INITIAL_STATE', () => {
    const { result } = renderHook(useLogin)
    const [state] = result.current

    expect(state)
      .toEqual(INITIAL_STATE)
  })

  it('Log the user in', async () => {
    const { result } = renderHook(useLogin)

    expect(result.current[0])
      .toHaveProperty('data', null)

    loginSpy.mockReturnValue(Promise.resolve({ data: { success: true } }))
    await act(() => result.current[1]({ username: 'test', password: 'test' }))

    expect(result.current[0])
      .toHaveProperty('data', { success: true })
  })

  it('Try to log the user in but fail', async () => {
    const { result } = renderHook(useLogin)

    expect(result.current[0])
      .toHaveProperty('error', null)

    loginSpy.mockReturnValue(Promise.reject({
      response: {
        data: { code: 'login1', message: 'Authentication failed' }
      }
    }))
    await act(() => result.current[1]({ username: 'test', password: 'test' }))

    expect(result.current[0])
      .toHaveProperty('error', { code: 'login1', message: 'Authentication failed' })
  })

  it('Reset the login state to INITIAL_STATE', async () => {
    const { result } = renderHook(useLogin)

    expect(result.current[0])
      .toEqual(INITIAL_STATE)

    loginSpy.mockReturnValue(Promise.resolve({ data: { success: true } }))
    await act(() => result.current[1]({ username: 'test', password: 'test' }))

    expect(result.current[0])
      .toEqual({
        ...INITIAL_STATE,
        data: { success: true }
      })

    act(() => result.current[2]())

    expect(result.current[0])
      .toEqual(INITIAL_STATE)
  })
})
