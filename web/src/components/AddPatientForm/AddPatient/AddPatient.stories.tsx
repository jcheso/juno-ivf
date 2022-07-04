import { PatientContext } from 'src/providers/context/PatientContext'
import {
  TreatmentContext,
  TreatmentContextProvider,
} from 'src/providers/context/TreatmentContext'

import { clinics, users } from '../AddPatientCell/AddPatientCell.mock'

import AddPatient from './AddPatient'

const patient = {
  id: '55ba30bb-717b-4002-bebc-6b463050b4d7',
  firstName: 'Maria',
  lastName: 'Theresa',
  email: 'maryt@gmail.com',
  dob: '1952-01-01T00:00:00.000Z',
  clinician: {
    id: '9e420ac0-1c2d-4ed3-b9c8-05b030b88016',
    firstName: 'Jarryd',
    lastName: 'Cheso',
  },
  clinic: {
    id: '9e420ac0-1c2d-4ed3-b9c8-05b030b88016',
    name: 'Clinic 1',
  },
}

export const generated = () => {
  return (
    <TreatmentContext.Provider
      value={[
        {
          id: '91510aba-b38a-4de7-985b-d6c2456e7729',
          startDate: '2021-01-08T00:00:00.000Z',
          endDate: '2021-02-08T00:00:00.000Z',
          wasSuccessful: false,
          isActive: false,
          clinician: { firstName: 'Mengqi', lastName: 'Zhou' },
          patient: {
            firstName: 'Tia',
            lastName: 'Campbell',
            clinic: {
              name: 'Imperial College London',
            },
          },
        },
        () => {},
      ]}
    >
      <PatientContext.Provider value={[{ ...patient }, () => {}]}>
        <AddPatient clinics={clinics} clinicians={users} />
      </PatientContext.Provider>
    </TreatmentContext.Provider>
  )
}

export default { title: 'Components/AddPatient' }
