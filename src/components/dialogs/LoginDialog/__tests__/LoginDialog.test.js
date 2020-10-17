import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import api from '../../../../service/api'

import LoginDialog from '../index'

const loginSpy = jest.spyOn(api, 'login')
const checkUserSpy = jest.spyOn(api, 'checkUser')

const buildComponent = () => render(<LoginDialog />)

describe('<LoginDialog />', () => {
  it('Render the component without crashing', () => {
    const { asFragment } = buildComponent()

    expect(asFragment())
      .toMatchSnapshot()
  })

  it('Try to call next and get an empty username error', async () => {
    const { getByText, findByText } = buildComponent()
    const button = getByText('Próximo')

    fireEvent.click(button)

    expect(await findByText('Insira um nome de usuário ou endereço de e-mail válido'))
      .toBeInTheDocument()
  })

  it('Call next and throw a not found user error', async () => {
    const { getByText, getByLabelText, findByText } = buildComponent()

    fireEvent.change(getByLabelText('Usuário'), { target: { value: 'testmock' } })
    checkUserSpy.mockRejectedValue({ response: { data: { code: 'login1' } } })
    fireEvent.click(getByText('Próximo'))

    expect(await findByText('Esta conta não existe, insira uma conta diferente ou obtenha uma nova'))
      .toBeInTheDocument()
  })

  it('Call next and changes to the password field', async () => {
    const { getByText, getByLabelText, findByLabelText } = buildComponent()

    fireEvent.change(getByLabelText('Usuário'), { target: { value: 'test' } })
    checkUserSpy.mockResolvedValue({ success: true })
    fireEvent.click(getByText('Próximo'))

    expect(await findByLabelText('Senha'))
      .toBeInTheDocument()
  })

  it('Types the password in the input and throws a password don\'t match error', async () => {
    const { getByText, getByLabelText, findByText, findByLabelText } = buildComponent()

    fireEvent.change(getByLabelText('Usuário'), { target: { value: 'test' } })
    checkUserSpy.mockResolvedValue({ success: true })
    fireEvent.click(getByText('Próximo'))

    fireEvent.change(await findByLabelText('Senha'), { target: { value: 'test1234' } })
    loginSpy.mockRejectedValue({ response: { data: { code: 'login3' } } })
    fireEvent.click(getByText('Acessar'))

    expect(await findByText('O usuário e/ou senha está incorreta'))
      .toBeInTheDocument()
  })
})
