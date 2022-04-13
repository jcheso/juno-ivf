import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import ClinicForm from 'src/components/Clinic/ClinicForm'

const CREATE_CLINIC_MUTATION = gql`
  mutation CreateClinicMutation($input: CreateClinicInput!) {
    createClinic(input: $input) {
      id
    }
  }
`

const NewClinic = () => {
  const [createClinic, { loading, error }] = useMutation(CREATE_CLINIC_MUTATION, {
    onCompleted: () => {
      toast.success('Clinic created')
      navigate(routes.clinics())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createClinic({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Clinic</h2>
      </header>
      <div className="rw-segment-main">
        <ClinicForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewClinic
