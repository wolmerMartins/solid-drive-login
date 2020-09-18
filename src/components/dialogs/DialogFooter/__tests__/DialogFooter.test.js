import React, { useRef } from 'react'
import { render } from '@testing-library/react'

import DialogFooter from '../index'

const TestComponent = ({ withRef, children }) => {
  const elRef = useRef({})

  return (
    <DialogFooter ref={withRef ? elRef : null}>
      {children}
    </DialogFooter>
  )
}

const buildComponent = (props, withRef) => {
  const utils = render(<TestComponent withRef={withRef} {...props} />)
  const footer = utils.queryByRole('contentinfo')

  return {
    ...utils,
    footer
  }
}

describe('<DialogFooter />', () => {
  it('Render the component empty', () => {
    const { footer } = buildComponent()

    expect(footer.firstElementChild)
      .not.toBeInTheDocument()
  })

  it('Render the component with a children', () => {
    const { footer } = buildComponent({ children: <span>Dialog Footer</span> })

    expect(footer)
      .toBeInTheDocument()

    expect(footer.textContent)
      .toContain('Dialog Footer')
  })

  it('Render the component with ref', () => {
    const { asFragment } = buildComponent({ children: <span>Dialog Footer</span> }, true)

    expect(asFragment())
      .toMatchSnapshot()
  })
})
