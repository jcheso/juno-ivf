import type { FindPatientById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Patient from 'src/components/Patient/Patient'

export const QUERY = gql`
  query FindPatientById($id: String!) {
    patient: patient(id: $id) {
      id
      firstName
      lastName
      email
      clinicId
      clinicianId
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Patient not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ patient }: CellSuccessProps<FindPatientById>) => {
  return <Patient patient={patient} />
}
