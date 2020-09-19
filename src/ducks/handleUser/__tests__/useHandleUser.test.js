import { renderHook, act } from '@testing-library/react-hooks'

import useHandleUser from '../index'
import { INITIAL_STATE } from '../handleUser'

describe('useHandleUser', () => {
  it('Return the INITIAL_STATE', () => {
    const { result } = renderHook(useHandleUser)
    const [state] = result.current

    expect(state)
      .toEqual(INITIAL_STATE)
  })

  it('Change the username on the state', () => {
    const { result } = renderHook(useHandleUser)

    expect(result.current[0])
      .toHaveProperty('username', '')

    act(() => {
      result.current[1]({ target: { value: 'test' } })
    })

    expect(result.current[0])
      .toHaveProperty('username', 'test')
  })

  it('Change the password on the state', () => {
    const { result } = renderHook(useHandleUser)

    expect(result.current[0])
      .toHaveProperty('password', '')

    act(() => {
      result.current[2]({ target: { value: 'test1234@' } })
    })

    expect(result.current[0])
      .toHaveProperty('password', 'test1234@')
  })
})
