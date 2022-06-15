import { render } from '@redwoodjs/testing/web'

import UpdateTreatment from './UpdateTreatment'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UpdateTreatment', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UpdateTreatment />)
    }).not.toThrow()
  })
})
