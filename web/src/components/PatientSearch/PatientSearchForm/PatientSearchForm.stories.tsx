import PatientSearch from './PatientSearchForm'
import { clinics, searchInput } from './PatientSearchForm.mock'

export const generated = () => {
  return (
    <PatientSearch clinics={clinics} input={searchInput} updateInput={null} />
  )
}

export default { title: 'Components/PatientSearch' }
