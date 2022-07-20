import CircleLoader from 'react-spinners/CircleLoader'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import FollicleDisplay from '../FollicleDisplay'
import FollicleDisplayGrouped from '../FollicleDisplayGrouped'

import useWindowDimensions from './getWindowDimensions'

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

export const Empty = () => {
  return <FollicleDisplayGrouped follicleCounts={[]} />
}

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ treatmentFollicleCounts }: CellSuccessProps) => {
  // Parse the left and right string arrays into numbers
  const { height, width } = useWindowDimensions()
  const treatmentFollicleCountsParsed = treatmentFollicleCounts.map(
    (follicleCount) => ({
      ...follicleCount,
      left: JSON.parse(follicleCount.left),
      right: JSON.parse(follicleCount.right),
    })
  )
  if (width < 600) {
    return <FollicleDisplay follicleCounts={treatmentFollicleCountsParsed} />
  } else {
    return (
      <FollicleDisplayGrouped follicleCounts={treatmentFollicleCountsParsed} />
    )
  }
}
