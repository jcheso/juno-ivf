import type { FindClinicById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Clinic from 'src/components/Clinic/Clinic'

export const QUERY = gql`
  query FindClinicById($id: String!) {
    clinic: clinic(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Clinic not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ clinic }: CellSuccessProps<FindClinicById>) => {
  return <Clinic clinic={clinic} />
}
