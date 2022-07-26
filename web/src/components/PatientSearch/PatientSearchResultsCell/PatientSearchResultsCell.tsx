import { BeatLoader } from 'react-spinners'
import CircleLoader from 'react-spinners/CircleLoader'
import { SearchPatients } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PatientSearchResults from 'src/components/PatientSearch/PatientSearchResults'

export const QUERY = gql`
  query SearchPatients($input: SearchPatientsInput!) {
    patients: searchPatients(input: $input) {
      id
      firstName
      lastName
      email
      dob
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
  <div className="flex justify-center items-center h-12 bg-white">
    <BeatLoader loading={true} color="#4338ca" size={8} />
  </div>
)

export const Empty = () => (
  <div className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0 bg-white">
    No patients found
  </div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ patients }: CellSuccessProps<SearchPatients>) => {
  return <PatientSearchResults patients={patients} />
}
