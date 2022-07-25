import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_PREDICT_EGGS_MODEL_MUTATION = gql`
  mutation DeletePredictEggsModelMutation($id: String!) {
    deletePredictEggsModel(id: $id) {
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

const PredictEggsModel = ({ predictEggsModel }) => {
  const [deletePredictEggsModel] = useMutation(DELETE_PREDICT_EGGS_MODEL_MUTATION, {
    onCompleted: () => {
      toast.success('PredictEggsModel deleted')
      navigate(routes.predictEggsModels())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete predictEggsModel ' + id + '?')) {
      deletePredictEggsModel({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">PredictEggsModel {predictEggsModel.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{predictEggsModel.id}</td>
            </tr><tr>
              <th>Created at</th>
              <td>{timeTag(predictEggsModel.createdAt)}</td>
            </tr><tr>
              <th>Model url</th>
              <td>{predictEggsModel.modelUrl}</td>
            </tr><tr>
              <th>Shard url</th>
              <td>{predictEggsModel.shardUrl}</td>
            </tr><tr>
              <th>Img url</th>
              <td>{predictEggsModel.imgUrl}</td>
            </tr><tr>
              <th>Img desc</th>
              <td>{predictEggsModel.imgDesc}</td>
            </tr><tr>
              <th>Description</th>
              <td>{predictEggsModel.description}</td>
            </tr><tr>
              <th>User id</th>
              <td>{predictEggsModel.userId}</td>
            </tr><tr>
              <th>Version</th>
              <td>{predictEggsModel.version}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPredictEggsModel({ id: predictEggsModel.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(predictEggsModel.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default PredictEggsModel
