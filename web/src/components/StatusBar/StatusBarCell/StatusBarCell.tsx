import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import StatusBar from '../StatusBar'

export const QUERY = gql`
  query GetTreatmentsQuery($patientId: String!) {
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
      type
      outcome
      triggerDate
    }
  }
`

export const Loading = () => <div></div>

export const Empty = () => <StatusBar treatments={null} />

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ treatments }: CellSuccessProps) => {
  return <StatusBar treatments={treatments} />
}
