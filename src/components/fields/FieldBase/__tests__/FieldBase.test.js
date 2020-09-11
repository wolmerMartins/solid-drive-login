import React, { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'

import FieldBase from '../index'

const TestComponent = props => {
  const [value, setValue] = useState('')

  const onChange = e => setValue(e.target.value)

  return (
    <FieldBase {...props}>
      <input
        value={value}
        onChange={onChange}
        {...props}
      />
    </FieldBase>
  )
}

const buildComponent = props => {
  const utils = render(<TestComponent {...props} />)
  const input = utils.getByLabelText(props.label)

  return {
    input,
    ...utils
  }
}

describe('<FieldBase />', () => {
  it('Render the component with \'Usuário\' label text', () => {
    const { asFragment } = buildComponent({ id: 'user', label: 'Usuário' })

    expect(asFragment())
      .toMatchSnapshot()
  })

  it('Find the input by label and types a value in', () => {
    const { input } = buildComponent({ id: 'user', label: 'Usuário' })

    fireEvent.change(input, { target: { value: 'test' } })

    expect(input)
      .toHaveProperty('value', 'test')
  })
})
