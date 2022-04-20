import { render } from '@redwoodjs/testing/web'

import PatientSearchResults from './PatientSearchResults'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PatientSearchResults', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PatientSearchResults />)
    }).not.toThrow()
  })
})
