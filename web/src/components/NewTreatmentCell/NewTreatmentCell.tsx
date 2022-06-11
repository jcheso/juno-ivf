import CircleLoader from 'react-spinners/CircleLoader'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import NewTreatment from '../NewTreatment/NewTreatment'

export const QUERY = gql`
  query FindClinics {
    clinics {
      id
      name
    }
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

export const Success = ({
  open,
  setOpen,
  clinics,
  users,
  setTreatment,
  patient,
}: CellSuccessProps) => {
  return (
    <NewTreatment
      clinics={clinics}
      clinicians={users}
      open={open}
      setOpen={setOpen}
      setTreatment={setTreatment}
      patient={patient}
    />
  )
}
