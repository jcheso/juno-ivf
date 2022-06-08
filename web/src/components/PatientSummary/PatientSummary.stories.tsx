import PatientSummary from './PatientSummary'
import { patient } from '../PatientSummaryCell/PatientSummaryCell.mock'

export const generated = () => {
  const patientSummary = { patient: patient }
  return <PatientSummary patientSummary={patientSummary} />
}

export default { title: 'Components/PatientSummary' }
