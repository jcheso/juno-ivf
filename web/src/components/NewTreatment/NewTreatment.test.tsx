import { render } from '@redwoodjs/testing/web'

import NewTreatment from './NewTreatment'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NewTreatment', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewTreatment />)
    }).not.toThrow()
  })
})
