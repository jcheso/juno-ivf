import { render } from '@redwoodjs/testing/web'

import CycleSummaryPage from './CycleSummaryPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CycleSummaryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CycleSummaryPage />)
    }).not.toThrow()
  })
})
