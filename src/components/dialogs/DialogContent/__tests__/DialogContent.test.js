import React from 'react'
import { render } from '@testing-library/react'

import DialogContent from '../index'

const buildComponent = props => {
  const utils = render(<DialogContent {...props} />)
  const dialogContent = utils.queryByText(/dialog content/i)

  return {
    ...utils,
    dialogContent
  }
}

describe('<DialogContent />', () => {
  it('Render the component empty', () => {
    const { dialogContent } = buildComponent()

    expect(dialogContent)
      .not.toBeInTheDocument()
  })

  it('Render the component with children', () => {
    const { dialogContent } = buildComponent({ children: <span>Dialog Content</span> })

    expect(dialogContent)
      .toBeInTheDocument()

    expect(dialogContent.textContent)
      .toBe('Dialog Content')
  })
})
