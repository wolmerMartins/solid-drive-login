import React, { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'

import InputText from '../index'

const TestComponent = props => {
  const [value, setValue] = useState('')

  const onChange = e => setValue(e.target.value)

  return (
    <InputText
      value={value}
      onChange={onChange}
      {...props}
    />
  )
}

const buildComponent = (props, placeholder = 'Digite') => {
  const utils = render(<TestComponent {...props} />)
  const input = utils.getByPlaceholderText(placeholder)

  return {
    input,
    ...utils
  }
}

describe('<InputText />', () => {
  it('Render the component without crashing', () => {
    const { input } = buildComponent()

    expect(input)
      .toBeInTheDocument()
  })

  it('Render the component with \'test-id\' as id and as name', () => {
    const testId = 'test-id'
    const { input } = buildComponent({ id: testId, name: testId })

    expect(input)
      .toHaveProperty('id', testId)

    expect(input)
      .toHaveProperty('name', testId)
  })

  it('Types a value in the input and fills the value attribute', () => {
    const { input } = buildComponent()

    expect(input)
      .toHaveProperty('value', '')

    fireEvent.change(input, { target: { value: 'test' } })

    expect(input)
      .toHaveProperty('value', 'test')
  })
})
