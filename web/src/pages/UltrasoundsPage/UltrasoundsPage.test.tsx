import { render } from '@redwoodjs/testing/web'

import UltrasoundsPage from './UltrasoundsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UltrasoundsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UltrasoundsPage />)
    }).not.toThrow()
  })
})
