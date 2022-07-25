import type { FindPredictEggsModelById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PredictEggsModel from 'src/components/PredictEggsModel/PredictEggsModel'

export const QUERY = gql`
  query FindPredictEggsModelById($id: String!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>PredictEggsModel not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ predictEggsModel }: CellSuccessProps<FindPredictEggsModelById>) => {
  return <PredictEggsModel predictEggsModel={predictEggsModel} />
}
