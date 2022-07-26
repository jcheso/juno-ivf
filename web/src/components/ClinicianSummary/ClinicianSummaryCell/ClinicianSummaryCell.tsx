import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ClinicianSummary from '../ClinicianSummary'

export const QUERY = gql`
  query FindClinicianSummaryQuery($id: String!) {
    clinicianSummary: userStats(id: $id) {
      totalPatients
      activeTreatments
      totalTreatments
    }
  }
`

export const Loading = () => <div></div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ clinicianSummary }: CellSuccessProps) => {
  return <ClinicianSummary clinicianSummary={clinicianSummary} />
}
