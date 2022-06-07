import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import AddPatient from 'src/components/AddPatientForm/AddPatient/AddPatient'
import CircleLoader from 'react-spinners/CircleLoader'
export const QUERY = gql`
  query PatientForm {
    clinics {
      id
      name
    }
    users {
      id
      firstName
      lastName
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

export const Success = ({ clinics, users }: CellSuccessProps) => {
  return (
    <>
      <AddPatient clinics={clinics} clinicians={users} />
    </>
  )
}
