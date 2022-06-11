import { render } from '@redwoodjs/testing/web'

import { mockTreatments } from '../TreatmentsCell/TreatmentsCell.mock'

import Treatments from './Treatments'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Treatments', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Treatments treatments={mockTreatments} />)
    }).not.toThrow()
  })
})
