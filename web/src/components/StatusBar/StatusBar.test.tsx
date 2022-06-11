import { render } from '@redwoodjs/testing/web'

import StatusBar from './StatusBar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('StatusBar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StatusBar />)
    }).not.toThrow()
  })
})
