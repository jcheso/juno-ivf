import CircleLoader from 'react-spinners/CircleLoader'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import FollicleDisplay from '../FollicleDisplay'
import FollicleDisplayGrouped from '../FollicleDisplayGrouped'

import useWindowDimensions from './getWindowDimensions'

export const QUERY = gql`
  query FindFollicleCountQuery(
    $input: TreatmentFollicleCountsInput!
    $patientId: String!
  ) {
    treatmentFollicleCounts(input: $input) {
      id
      day
      left
      right
      date
    }
    treatments: treatmentsByPatient(patientId: $patientId) {
      id
      startDate
      endDate
      wasSuccessful
      isActive
      clinician {
        firstName
        lastName
      }
      patient {
        clinic {
          name
        }
      }
      count
      acfId
      ageAtTreatmentStart
      triggerDate
      outcome
      type
      eggsRetrieved
      eggRetrievalDate
    }
  }
`

export const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <CircleLoader loading={true} color="#4338ca" />
  </div>
)

export const Empty = ({ treatments }) => {
  return <FollicleDisplayGrouped follicleCounts={[]} treatments={treatments} />
}

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  treatmentFollicleCounts,
  treatments,
}: CellSuccessProps) => {
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
    return (
      <FollicleDisplayGrouped
        follicleCounts={treatmentFollicleCountsParsed}
        treatments={treatments}
      />
    )
  } else {
    return (
      <FollicleDisplayGrouped
        follicleCounts={treatmentFollicleCountsParsed}
        treatments={treatments}
      />
    )
  }
}
