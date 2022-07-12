import { render } from '@redwoodjs/testing/web'

import FollicleCount from './FollicleCount'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FollicleCount', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FollicleCount />)
    }).not.toThrow()
  })
})
