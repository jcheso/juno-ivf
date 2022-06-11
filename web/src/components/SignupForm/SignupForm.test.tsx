import { render } from '@redwoodjs/testing/web'

import { clinics } from '../SignupCell/SignupCell.mock'

import SignupForm from './SignupForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SignupForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignupForm clinics={clinics} />)
    }).not.toThrow()
  })
})
