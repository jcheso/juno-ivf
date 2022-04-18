import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { SearchPatients } from 'types/graphql'
import PatientSearchResults from '../PatientSearchResults/PatientSearchResults'

export const QUERY = gql`
  query SearchPatients($input: SearchPatientsInput!) {
    patients: searchPatients(input: $input) {
      id
      firstName
      lastName
      email
      clinician {
        id
        firstName
        lastName
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No patients found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ patients }: CellSuccessProps<SearchPatients>) => {
  return <PatientSearchResults patients={patients} />
}
