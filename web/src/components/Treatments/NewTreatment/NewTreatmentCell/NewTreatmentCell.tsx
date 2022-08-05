import BeatLoader from 'react-spinners/BeatLoader'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import UpdateTreatment from 'src/components/Treatments/UpdateTreatment/UpdateTreatment'

import NewTreatment from '../NewTreatment'

export const QUERY = gql`
  query {
    users {
      id
      firstName
      lastName
    }
  }
`

export const Loading = () => <></>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  type,
  open,
  setOpen,
  users,
  treatments,
}: CellSuccessProps) => {
  if (type === 'create') {
    return (
      <NewTreatment
        clinicians={users}
        open={open}
        setOpen={setOpen}
        treatments={treatments}
      />
    )
  }
  if (type === 'update') {
    return <UpdateTreatment clinicians={users} open={open} setOpen={setOpen} />
  }
}
