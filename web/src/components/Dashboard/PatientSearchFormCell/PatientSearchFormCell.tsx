import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import PatientSearchForm from 'src/components/Dashboard/PatientSearchForm/PatientSearchForm'

export const QUERY = gql`
  query FindClinics {
    clinics {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ clinics, input, updateState }: CellSuccessProps) => {
  return (
    <>
      <PatientSearchForm
        clinics={clinics}
        firstName={input.firstName}
        lastName={input.lastName}
        clinic={input.clinic}
        updateFirstName={updateState.updateFirstName}
        updateLastName={updateState.updateLastName}
        updateClinic={updateState.updateClinic}
      />
    </>
  )
}
