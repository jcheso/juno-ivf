import type { FindClinics } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import Clinics from 'src/components/Clinic/Clinics'

export const QUERY = gql`
  query FindClinics {
    clinics {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No clinics yet. '}
      <Link
        to={routes.newClinic()}
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

export const Success = ({ clinics }: CellSuccessProps<FindClinics>) => {
  return <Clinics clinics={clinics} />
}
