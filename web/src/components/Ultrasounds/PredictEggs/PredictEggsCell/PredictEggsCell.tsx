import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PredictEggs from '../PredictEggs'

export const QUERY = gql`
  query PredictEggsQuery($input: Int!) {
    predictEggs(input: $input) {
      eggs
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ predictEggs }: CellSuccessProps) => {
  return <PredictEggs predictedEggs={predictEggs} />
}
