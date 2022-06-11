import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_PATIENT_MUTATION = gql`
  mutation DeletePatientMutation($id: String!) {
    deletePatient(id: $id) {
      id
    }
  }
`

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Patient = ({ patient }) => {
  const [deletePatient] = useMutation(DELETE_PATIENT_MUTATION, {
    onCompleted: () => {
      toast.success('Patient deleted')
      navigate(routes.patients())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete patient ' + id + '?')) {
      deletePatient({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Patient {patient.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{patient.id}</td>
            </tr>
            <tr>
              <th>First name</th>
              <td>{patient.firstName}</td>
            </tr>
            <tr>
              <th>Last name</th>
              <td>{patient.lastName}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{patient.email}</td>
            </tr>
            <tr>
              <th>Clinic id</th>
              <td>{patient.clinicId}</td>
            </tr>
            <tr>
              <th>Clinician id</th>
              <td>{patient.clinicianId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(patient.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPatient({ id: patient.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(patient.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Patient
