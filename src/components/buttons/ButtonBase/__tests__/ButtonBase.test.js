import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import ButtonBase from '../index'

const buildComponent = props => render(
  <ButtonBase {...props} />
)

describe('<ButtonBase />', () => {
  it('Fires \'onClick\' props without crashing', () => {
    const { getByText } = buildComponent()

    fireEvent.click(getByText('OK'))
  })

  it('Creates the button with \'test button\' label', () => {
    const { getByText } = buildComponent({ children: 'test button' })
    
    expect(getByText('test button'))
      .toBeInTheDocument()
  })

  it('Creates the button disabled', () => {
    const { getByText } = buildComponent({ disabled: true })

    expect(getByText('OK'))
      .toBeDisabled()
  })
})
