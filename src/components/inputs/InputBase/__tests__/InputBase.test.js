import React, { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'

import InputBase from '../index'

const TestInput = props => {
  const [value, setValue] = useState('')

  const onChange = e => setValue(e.target.value)

  return (
    <InputBase
      value={value}
      onChange={onChange}
      {...props}
    />
  )
}

const buildComponent = (props, placeholder) => {
  const utils = render(<TestInput {...props} />)
  const input = utils.getByPlaceholderText(placeholder)

  return {
    input,
    ...utils
  }
}

describe('<InputBase />', () => {
  it('Render the component without crashing', () => {
    const { input } = buildComponent({}, 'Digite')

    expect(input)
      .toBeInTheDocument()
  })

  it('Render the component disabled', () => {
    const { input } = buildComponent({ disabled: true }, 'Digite')

    expect(input)
      .toBeDisabled()
  })

  it('Render a password type input component', () => {
    const { input } = buildComponent({ type: 'password' }, 'Digite')

    expect(input)
      .toHaveProperty('type', 'password')
  })

  it('Types a value on the input and save on value property', () => {
    const placeholder = 'Informe o seu nome'
    const { input } = buildComponent({ placeholder }, placeholder)

    expect(input)
      .toHaveProperty('value', '')

    fireEvent.change(input, { target: { value: 'test' } })

    expect(input)
      .toHaveProperty('value', 'test')
  })
})
