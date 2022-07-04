import CircleLoader from 'react-spinners/CircleLoader'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import NewTreatment from '../NewTreatment/NewTreatment'
import UpdateTreatment from '../UpdateTreatment/UpdateTreatment'

export const QUERY = gql`
  query {
    users {
      id
      firstName
      lastName
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
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ type, open, setOpen, users }: CellSuccessProps) => {
  if (type === 'create') {
    return <NewTreatment clinicians={users} open={open} setOpen={setOpen} />
  }
  if (type === 'update') {
    return <UpdateTreatment clinicians={users} open={open} setOpen={setOpen} />
  }
}
