import React, { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'

import UsernameField from '../index'

const TestComponent = () => {
  const [value, setValue] = useState('')

  const onChange = e => setValue(e.target.value)

  return <UsernameField onChange={onChange} value={value} />
}

const buildComponent = () => {
  const utils = render(<TestComponent />)
  const input = utils.getByLabelText('Usuário')

  return {
    input,
    ...utils
  }
}

describe('<UsernameField />', () => {
  it('Render the component without crashing', () => {
    const { asFragment } = buildComponent()

    expect(asFragment())
      .toMatchSnapshot()
  })

  it('Types a value in the input', () => {
    const { input } = buildComponent()

    expect(input)
      .toHaveProperty('value', '')

    fireEvent.change(input, { target: { value: 'username' } })

    expect(input)
      .toHaveProperty('value', 'username')
  })
})
