import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindFollicleCountQuery($input: AllFollicleCountsInput!) {
    allFollicleCounts(input: $input) {
      id
      day
      left
      right
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ allFollicleCounts }: CellSuccessProps) => {
  console.log(allFollicleCounts)
  return <div>{JSON.stringify(allFollicleCounts)}</div>
}
