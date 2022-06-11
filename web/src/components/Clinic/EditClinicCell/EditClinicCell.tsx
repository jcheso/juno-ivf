import type { EditClinicById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ClinicForm from 'src/components/Clinic/ClinicForm'

export const QUERY = gql`
  query EditClinicById($id: String!) {
    clinic: clinic(id: $id) {
      id
      name
    }
  }
`
const UPDATE_CLINIC_MUTATION = gql`
  mutation UpdateClinicMutation($id: String!, $input: UpdateClinicInput!) {
    updateClinic(id: $id, input: $input) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ clinic }: CellSuccessProps<EditClinicById>) => {
  const [updateClinic, { loading, error }] = useMutation(
    UPDATE_CLINIC_MUTATION,
    {
      onCompleted: () => {
        toast.success('Clinic updated')
        navigate(routes.clinics())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateClinic({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Clinic {clinic.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ClinicForm
          clinic={clinic}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
