import type { FindPredictEggsModels } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PredictEggsModels from 'src/components/PredictEggsModel/PredictEggsModels'

export const QUERY = gql`
  query FindPredictEggsModels {
    predictEggsModels {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No predictEggsModels yet. '}
      <Link
        to={routes.newPredictEggsModel()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ predictEggsModels }: CellSuccessProps<FindPredictEggsModels>) => {
  return <PredictEggsModels predictEggsModels={predictEggsModels} />
}
