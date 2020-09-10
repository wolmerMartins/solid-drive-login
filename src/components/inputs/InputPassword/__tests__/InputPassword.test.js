import React, { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'

import InputPassword from '../index'

const TestComponent = props => {
  const [value, setValue] = useState('')

  const onChange = e => setValue(e.target.value)

  return (
    <InputPassword
      value={value}
      onChange={onChange}
      {...props}
    />
  )
}

const buildComponent = (props, placeholder = 'Senha') => {
  const utils = render(<TestComponent {...props} />)
  const input = utils.getByPlaceholderText(placeholder)

  return {
    input,
    ...utils
  }
}

describe('<InputPassword />', () => {
  it('Render the component without crashing', () => {
    const { input } = buildComponent()

    expect(input)
      .toBeInTheDocument()
  })

  it('Render the component with \'test-input\' as id and as name', () => {
    const testInput = 'test-input'
    const { input } = buildComponent({ id: testInput, name: testInput })

    expect(input)
      .toHaveProperty('id', testInput)

    expect(input)
      .toHaveProperty('name', testInput)
  })

  it('Types a value on the input and fills the input value', () => {
    const { input } = buildComponent()

    expect(input)
      .toHaveProperty('value', '')

    fireEvent.change(input, { target: { value: 'password' } })

    expect(input)
      .toHaveProperty('value', 'password')
  })
})
