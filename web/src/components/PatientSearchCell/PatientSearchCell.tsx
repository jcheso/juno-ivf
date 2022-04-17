import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Link } from '@redwoodjs/router'
import { SearchPatients } from 'types/graphql'

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

export const Empty = () => (
  <div>
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
        No patients found
      </td>
      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500"></td>
      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500"></td>
      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500"></td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 md:pr-0"></td>
    </tr>
  </div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ patients }: CellSuccessProps<SearchPatients>) => {
  return (
    <>
      {patients.map((person) => (
        <tr key={person.email}>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
            {person.firstName}
          </td>
          <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
            {person.lastName}
          </td>
          <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
            {person.email}
          </td>
          <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
            {person.clinician.firstName + ' ' + person.clinician.lastName}
          </td>
          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 md:pr-0">
            <Link to="#" className="text-indigo-600 hover:text-indigo-900">
              View
              <span className="sr-only">, {person.firstName} </span>
            </Link>
          </td>
        </tr>
      ))}
    </>
  )
}
