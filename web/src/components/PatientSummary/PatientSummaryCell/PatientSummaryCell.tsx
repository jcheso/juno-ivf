import CircleLoader from 'react-spinners/CircleLoader'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PatientSummary from '../PatientSummary'

export const QUERY = gql`
  query FindPatientSummaryQuery($id: String!) {
    patient: patient(id: $id) {
      id
      firstName
      lastName
      email
      dob
      country
      address
      city
      county
      postcode
      phone
      medicalHistory
      medications
      infertilityDiagnosis
      surgicalHistory
      clinician {
        id
        firstName
        lastName
      }
      clinic {
        id
        name
      }
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

export const Success = ({ patient }: CellSuccessProps) => {
  const patientSummary = { patient: patient }
  return <PatientSummary patientSummary={patientSummary} />
}
