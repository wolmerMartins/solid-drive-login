import React from 'react'
import { render } from '@testing-library/react'

import Dialog from '../index'

const buildComponent = (props = {}) => {
  const utils = render(<Dialog {...props} />)
  const dialog = utils.queryByRole('dialog')

  return {
    ...utils,
    dialog
  }
}

describe('<Dialog />', () => {
  it('Not render the Dialog component', () => {
    const { dialog } = buildComponent()

    expect(dialog)
      .toBeNull()
  })

  it('Render an empty Dialog', () => {
    const { dialog } = buildComponent({ open: true })

    expect(dialog)
      .toBeInTheDocument()

    expect(dialog.children)
      .toHaveLength(0)
  })

  it('Render the Dialog with a children', () => {
    const { dialog } = buildComponent({
      open: true,
      children: <div><p>Test dialog children</p></div>
    })

    expect(dialog.children)
      .toHaveLength(1)

    expect(dialog.innerHTML)
      .toBe('<div><p>Test dialog children</p></div>')
  })
})
