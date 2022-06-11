import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PatientSearchForm from 'src/components/PatientSearch/PatientSearchForm/PatientSearchForm'

export const QUERY = gql`
  query FindClinics {
    clinics {
      id
      name
    }
  }
`

export const Loading = () => <div></div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ clinics, input, updateInput }: CellSuccessProps) => {
  return (
    <>
      <PatientSearchForm
        clinics={clinics}
        input={input}
        updateInput={updateInput}
      />
    </>
  )
}
