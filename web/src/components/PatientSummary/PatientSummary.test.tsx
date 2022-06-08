import { render } from '@redwoodjs/testing/web'

import PatientSummary from './PatientSummary'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PatientSummary', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PatientSummary />)
    }).not.toThrow()
  })
})
