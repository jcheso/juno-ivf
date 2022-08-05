import BeatLoader from 'react-spinners/BeatLoader'

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
      type
      outcome
      triggerDate
      eggsRetrieved
      eggRetrievalDate
    }
  }
`

export const Loading = () => (
  <div className="flex justify-center items-center h-32">
    <BeatLoader loading={true} color="#4338ca" size={8} />
  </div>
)

export const Empty = () => <Treatments treatments={null} />

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ treatments }: CellSuccessProps) => {
  return <Treatments treatments={treatments} />
}
