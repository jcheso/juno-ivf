import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PredictEggsModelForm from 'src/components/PredictEggsModel/PredictEggsModelForm'

const CREATE_PREDICT_EGGS_MODEL_MUTATION = gql`
  mutation CreatePredictEggsModelMutation(
    $input: CreatePredictEggsModelInput!
  ) {
    createPredictEggsModel(input: $input) {
      id
    }
  }
`

const NewPredictEggsModel = () => {
  const [createPredictEggsModel, { loading, error }] = useMutation(
    CREATE_PREDICT_EGGS_MODEL_MUTATION,
    {
      onCompleted: () => {
        toast.success('PredictEggsModel created')
        navigate(routes.predictEggsModels())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createPredictEggsModel({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New PredictEggsModel
        </h2>
      </header>
      <div className="rw-segment-main">
        <PredictEggsModelForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPredictEggsModel
