import type { FindPatients } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import Patients from 'src/components/Patient/Patients'

export const QUERY = gql`
  query FindPatients {
    patients {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No patients yet. '}
      <Link
        to={routes.newPatient()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ patients }: CellSuccessProps<FindPatients>) => {
  return <Patients patients={patients} />
}
