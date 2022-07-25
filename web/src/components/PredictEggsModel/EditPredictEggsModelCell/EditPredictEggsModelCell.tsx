import type { EditPredictEggsModelById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PredictEggsModelForm from 'src/components/PredictEggsModel/PredictEggsModelForm'

export const QUERY = gql`
  query EditPredictEggsModelById($id: String!) {
    predictEggsModel: predictEggsModel(id: $id) {
      id
      createdAt
      modelUrl
      shardUrl
      imgUrl
      imgDesc
      description
      userId
      version
    }
  }
`
const UPDATE_PREDICT_EGGS_MODEL_MUTATION = gql`
  mutation UpdatePredictEggsModelMutation($id: String!, $input: UpdatePredictEggsModelInput!) {
    updatePredictEggsModel(id: $id, input: $input) {
      id
      createdAt
      modelUrl
      shardUrl
      imgUrl
      imgDesc
      description
      userId
      version
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ predictEggsModel }: CellSuccessProps<EditPredictEggsModelById>) => {
  const [updatePredictEggsModel, { loading, error }] = useMutation(UPDATE_PREDICT_EGGS_MODEL_MUTATION, {
    onCompleted: () => {
      toast.success('PredictEggsModel updated')
      navigate(routes.predictEggsModels())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updatePredictEggsModel({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit PredictEggsModel {predictEggsModel.id}</h2>
      </header>
      <div className="rw-segment-main">
        <PredictEggsModelForm predictEggsModel={predictEggsModel} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
