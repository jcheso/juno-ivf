import { patient } from '../PatientSummaryCell/PatientSummaryCell.mock'

import PatientSummary from './PatientSummary'

export const generated = () => {
  const patientSummary = { patient: patient }
  return <PatientSummary patientSummary={patientSummary} />
}

export default { title: 'Components/PatientSummary' }
