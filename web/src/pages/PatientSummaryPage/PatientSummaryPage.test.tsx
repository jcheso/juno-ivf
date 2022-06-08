import { render } from '@redwoodjs/testing/web'

import PatientSummaryPage from './PatientSummaryPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PatientSummaryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PatientSummaryPage />)
    }).not.toThrow()
  })
})
