import CircleLoader from 'react-spinners/CircleLoader'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Treatments from '../Treatments'

export const QUERY = gql`
  query TreatmentsQuery($patientId: String!) {
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
    }
  }
`

export const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <CircleLoader loading={true} color="#4338ca" />
  </div>
)

export const Empty = () => <Treatments treatments={null} />

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ treatments }: CellSuccessProps) => {
  return <Treatments treatments={treatments} />
}
