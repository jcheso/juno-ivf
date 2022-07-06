import CircleLoader from 'react-spinners/CircleLoader'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Statistics from '../Statistics'

export const QUERY = gql`
  query StatisticsQuery {
    users {
      id
    }
  }
`

export const Loading = () => (
  <div>
    <div className="flex justify-center items-center h-screen">
      <CircleLoader loading={true} color="#4338ca" />
    </div>
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ statistics }: CellSuccessProps) => {
  return <Statistics />
}
