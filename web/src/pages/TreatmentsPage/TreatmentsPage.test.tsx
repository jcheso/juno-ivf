import { render } from '@redwoodjs/testing/web'

import TreatmentsPage from './TreatmentsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TreatmentsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TreatmentsPage />)
    }).not.toThrow()
  })
})
