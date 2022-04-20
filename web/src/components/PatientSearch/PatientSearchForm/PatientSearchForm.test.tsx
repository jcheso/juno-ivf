import { render } from '@redwoodjs/testing/web'
import { clinics, searchInput } from './PatientSearchForm.mock'
import PatientSearch from './PatientSearchForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PatientSearch', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <PatientSearch
          clinics={clinics}
          input={searchInput}
          updateInput={null}
        />
      )
    }).not.toThrow()
  })
})
