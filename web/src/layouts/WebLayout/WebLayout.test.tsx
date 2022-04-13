import { render } from '@redwoodjs/testing/web'

import WebLayout from './WebLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('WebLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WebLayout />)
    }).not.toThrow()
  })
})
