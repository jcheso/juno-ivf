import { render } from '@redwoodjs/testing/web'

import AddPatientPage from '../AddPatientPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AddPatientPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddPatientPage />)
    }).not.toThrow()
  })
})
