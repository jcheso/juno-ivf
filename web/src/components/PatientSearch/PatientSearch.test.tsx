import { render } from '@redwoodjs/testing/web'

import PatientSearch from './PatientSearch'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PatientSearch', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PatientSearch />)
    }).not.toThrow()
  })
})
