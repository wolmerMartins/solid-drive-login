import React from 'react'
import { render } from '@testing-library/react'

import InlineErrorMessage from '../index'

const buildComponent = props => {
  const utils = render(<InlineErrorMessage {...props} />)
  const component = props.message
    ? utils.getByText(props.message)
    : utils.asFragment()

  return {
    ...utils,
    component
  }
}

describe('<InlineErrorMessage />', () => {
  it('Render the component with an empty message', () => {
    const { component } = buildComponent({})

    expect(component)
      .toMatchSnapshot()
  })

  it('Render the component with \'error inline component\' message', () => {
    const { component } = buildComponent({ message: 'error inline component' })

    expect(component)
      .toMatchSnapshot()

    expect(component.textContent)
      .toBe('error inline component')
  })
})
