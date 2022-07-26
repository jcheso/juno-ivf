import BeatLoader from 'react-spinners/BeatLoader'
import CircleLoader from 'react-spinners/CircleLoader'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Statistics from '../Statistics'

export const QUERY = gql`
  query StatisticsQuery {
    statistics {
      totalPatients {
        name
        stat
        previousStat
        change
        changeType
      }
      totalTreatments {
        name
        stat
        previousStat
        change
        changeType
      }
      successfulTreatmentsRate {
        name
        stat
        previousStat
        change
        changeType
      }
    }
  }
`

export const Loading = () => (
  <div className="flex justify-center items-center h-36">
    <BeatLoader loading={true} color="#4338ca" size={8} />
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ statistics }: CellSuccessProps) => {
  return <Statistics statistics={statistics} />
}
