import CircleLoader from 'react-spinners/CircleLoader'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import FollicleDisplay from '../FollicleDisplay'

export const QUERY = gql`
  query FindFollicleCountQuery($input: TreatmentFollicleCountsInput!) {
    treatmentFollicleCounts(input: $input) {
      id
      day
      left
      right
      date
    }
  }
`

export const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <CircleLoader loading={true} color="#4338ca" />
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ treatmentFollicleCounts }: CellSuccessProps) => {
  // Parse the left and right string arrays into numbers
  const treatmentFollicleCountsParsed = treatmentFollicleCounts.map(
    (follicleCount) => ({
      ...follicleCount,
      left: JSON.parse(follicleCount.left),
      right: JSON.parse(follicleCount.right),
    })
  )
  return <FollicleDisplay follicleCounts={treatmentFollicleCountsParsed} />
}
