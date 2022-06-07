import AddPatient from './AddPatient'
import { clinics, users } from '../AddPatientCell/AddPatientCell.mock'
export const generated = () => {
  return <AddPatient clinics={clinics} clinicians={users} />
}

export default { title: 'Components/AddPatient' }
