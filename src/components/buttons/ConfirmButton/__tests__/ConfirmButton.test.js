import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import ConfirmButton from '../index'

const buildComponent = props => render(
  <ConfirmButton {...props} />
)

const onClick = jest.fn()

describe('<ConfirmButton />', () => {
  it('Fires \'onClick\' function without crashing', () => {
    const { getByText } = buildComponent()
    
    fireEvent.click(getByText('OK'))

    expect(getByText('OK'))
      .toHaveClass('ConfirmButton')
  })

  it('Creates the button with \'Acessar\' label', () => {
    const { getByText } = buildComponent({ children: 'Acessar' })

    expect(getByText('Acessar'))
      .toBeInTheDocument()
  })

  it('Fires \'onClick\' function', () => {
    const { getByText } = buildComponent({ onClick, children: 'Acessar' })

    fireEvent.click(getByText('Acessar'))

    expect(onClick)
      .toHaveBeenCalled()
  })
})
