import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import CircleLoader from 'react-spinners/CircleLoader'
import Treatments from '../Treatments/Treatments'

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
    }
  }
`

export const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <CircleLoader loading={true} color="#4338ca" />
  </div>
)

export const Empty = (treatments) => <Treatments treatments={null} />

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ treatments }: CellSuccessProps) => {
  console.log(treatments)
  return <Treatments treatments={treatments} />
}
