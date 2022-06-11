import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Patient/PatientsCell'

const DELETE_PATIENT_MUTATION = gql`
  mutation DeletePatientMutation($id: String!) {
    deletePatient(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

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

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const PatientsList = ({ patients }) => {
  const [deletePatient] = useMutation(DELETE_PATIENT_MUTATION, {
    onCompleted: () => {
      toast.success('Patient deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete patient ' + id + '?')) {
      deletePatient({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Clinic id</th>
            <th>Clinician id</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{truncate(patient.id)}</td>
              <td>{truncate(patient.firstName)}</td>
              <td>{truncate(patient.lastName)}</td>
              <td>{truncate(patient.email)}</td>
              <td>{truncate(patient.clinicId)}</td>
              <td>{truncate(patient.clinicianId)}</td>
              <td>{timeTag(patient.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.patient({ id: patient.id })}
                    title={'Show patient ' + patient.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPatient({ id: patient.id })}
                    title={'Edit patient ' + patient.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete patient ' + patient.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(patient.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PatientsList
