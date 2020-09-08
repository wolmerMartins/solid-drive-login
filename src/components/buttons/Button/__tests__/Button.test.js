import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Button from '../index'

const buildComponent = props => render(
  <Button {...props} />
)

describe('<Button />', () => {
  test('Fires \'onClick\' props without crashing', () => {
    const { getByText } = buildComponent()

    fireEvent.click(getByText('OK'))
  })

  test('Creates the button with \'Confirme\' text label', () => {
    const { getByText } = buildComponent({ children: 'Confirme' })

    expect(getByText('Confirme'))
      .toBeInTheDocument()
  })
})
