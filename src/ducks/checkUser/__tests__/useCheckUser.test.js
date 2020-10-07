import { renderHook, act } from '@testing-library/react-hooks'

import api from '../../../service/api'

import useCheckUser from '../index'
import { INITIAL_STATE } from '../checkUser'

const checkUserSpy = jest.spyOn(api, 'checkUser')

describe('useCheckUser', () => {
  it('Returns the INITIAL STATE', () => {
    const { result } = renderHook(useCheckUser)
    const [state] = result.current

    expect(state)
      .toEqual(INITIAL_STATE)
  })

  it('Throws an empty username error', async () => {
    const { result } = renderHook(useCheckUser)

    await act(() => result.current[1]())

    expect(result.current[0])
      .toHaveProperty('error', { code: 'EMPTY_USERNAME' })
  })

  it('Find the user and changes \'exists\' to \'true\'', async () => {
    const { result } = renderHook(useCheckUser)

    expect(result.current[0])
      .toHaveProperty('exists', false)

    checkUserSpy.mockResolvedValue({ success: true })
    await act(() => result.current[1]('testmock'))

    expect(result.current[0])
      .toHaveProperty('exists', true)
  })

  it('Don\'t find the user and throws an error', async () => {
    const { result } = renderHook(useCheckUser)

    expect(result.current[0])
      .toHaveProperty('error', null)

    checkUserSpy.mockRejectedValue({
      response: {
        data: { code: 'login4', message: 'User not found' }
      }
    })
    await act(() => result.current[1]('testmocked'))

    expect(result.current[0])
      .toHaveProperty('error', { code: 'login4', message: 'User not found' })
  })

  it('Cleans the state and returns to the INITIAL STATE', async () => {
    const { result } = renderHook(useCheckUser)

    await act(() => result.current[1]())

    expect(result.current[0])
      .toHaveProperty('error', { code: 'EMPTY_USERNAME' })

    act(() => result.current[2]())

    expect(result.current[0])
      .toHaveProperty('error', null)

    expect(result.current[0])
      .toEqual(INITIAL_STATE)
  })
})
