import CircleLoader from 'react-spinners/CircleLoader'
import type { FindClinics } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import SignupForm from '../SignupForm'

export const QUERY = gql`
  query FindClinics {
    clinics {
      id
      name
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
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ clinics }: CellSuccessProps<FindClinics>) => {
  return <SignupForm clinics={clinics} />
}
