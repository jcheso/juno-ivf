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

export const Loading = () => (
  <div className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
    Loading...
  </div>
)

export const Empty = () => (
  <div className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
    No patients found
  </div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ patients }: CellSuccessProps<SearchPatients>) => {
  return <PatientSearchResults patients={patients} />
}
