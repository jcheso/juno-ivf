import type { FindClinics } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import SignupForm from '../SignupForm/SignupForm'

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
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ clinics }: CellSuccessProps<FindClinics>) => {
  return <SignupForm clinics={clinics} />
}
