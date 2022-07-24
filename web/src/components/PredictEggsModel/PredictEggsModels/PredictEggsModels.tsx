import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/PredictEggsModel/PredictEggsModelsCell'

const DELETE_PREDICT_EGGS_MODEL_MUTATION = gql`
  mutation DeletePredictEggsModelMutation($id: String!) {
    deletePredictEggsModel(id: $id) {
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

const PredictEggsModelsList = ({ predictEggsModels }) => {
  const [deletePredictEggsModel] = useMutation(DELETE_PREDICT_EGGS_MODEL_MUTATION, {
    onCompleted: () => {
      toast.success('PredictEggsModel deleted')
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
    if (confirm('Are you sure you want to delete predictEggsModel ' + id + '?')) {
      deletePredictEggsModel({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Model url</th>
            <th>Shard url</th>
            <th>Img url</th>
            <th>Img desc</th>
            <th>Description</th>
            <th>User id</th>
            <th>Version</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {predictEggsModels.map((predictEggsModel) => (
            <tr key={predictEggsModel.id}>
              <td>{truncate(predictEggsModel.id)}</td>
              <td>{timeTag(predictEggsModel.createdAt)}</td>
              <td>{truncate(predictEggsModel.modelUrl)}</td>
              <td>{truncate(predictEggsModel.shardUrl)}</td>
              <td>{truncate(predictEggsModel.imgUrl)}</td>
              <td>{truncate(predictEggsModel.imgDesc)}</td>
              <td>{truncate(predictEggsModel.description)}</td>
              <td>{truncate(predictEggsModel.userId)}</td>
              <td>{truncate(predictEggsModel.version)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.predictEggsModel({ id: predictEggsModel.id })}
                    title={'Show predictEggsModel ' + predictEggsModel.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPredictEggsModel({ id: predictEggsModel.id })}
                    title={'Edit predictEggsModel ' + predictEggsModel.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete predictEggsModel ' + predictEggsModel.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(predictEggsModel.id)}
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

export default PredictEggsModelsList
