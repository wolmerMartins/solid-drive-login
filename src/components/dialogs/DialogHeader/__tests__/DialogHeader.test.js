import React from 'react'
import { render } from '@testing-library/react'

import DialogHeader from '../index'

const buildComponent = props => {
  const utils = render(<DialogHeader {...props} />)
  const component = utils.getByRole('banner')
  const title = utils.getByText(props?.title ?? /solid drive/i)
  const image = utils.getByRole('img')

  return {
    ...utils,
    dialogHeader: {
      component,
      title,
      image
    }
  }
}

describe('<DialogHeader />', () => {
  it('Render the component with defaults title and image', () => {
    const {
      dialogHeader: {
        component,
        title,
        image
      }
    } = buildComponent()

    expect(component)
      .toBeInTheDocument()

    expect(title.textContent)
      .toMatch(/solid drive/i)

    expect(image.src)
      .toContain('logo.png')
  })

  it('Render the component with custom title', () => {
    const { dialogHeader: { title } } = buildComponent({ title: 'Custom Title' })

    expect(title)
      .toBeInTheDocument()

    expect(title.textContent)
      .toContain('Custom Title')
  })
})
