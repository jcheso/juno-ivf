import { render } from '@redwoodjs/testing/web'

import { clinics, users } from '../AddPatientCell/AddPatientCell.mock'

import AddPatient from './AddPatient'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AddPatient', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddPatient clinics={clinics} clinicians={users} />)
    }).not.toThrow()
  })
})
