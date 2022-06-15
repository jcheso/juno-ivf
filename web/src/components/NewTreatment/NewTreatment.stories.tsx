import { users } from '../AddPatientForm/AddPatientCell/AddPatientCell.mock'
import { clinics } from '../SignupCell/SignupCell.mock'

import NewTreatment from './NewTreatment'

export const generated = () => {
  return (
    <NewTreatment
      open={true}
      setOpen={() => {}}
      clinics={clinics}
      clinicians={users}
    />
  )
}

export default { title: 'Components/NewTreatment' }
