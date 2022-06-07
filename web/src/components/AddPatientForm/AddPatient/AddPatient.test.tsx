import { render } from '@redwoodjs/testing/web'

import AddPatient from './AddPatient'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AddPatient', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddPatient />)
    }).not.toThrow()
  })
})
