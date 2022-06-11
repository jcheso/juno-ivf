import { PatientContext } from 'src/providers/context/PatientContext'

import PatientSummaryPage from './PatientSummaryPage'

export const generated = () => {
  return (
    <PatientContext.Provider
      value={[
        [
          {
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
          },
        ],
        () => {},
      ]}
    >
      <PatientSummaryPage />
    </PatientContext.Provider>
  )
}

export default { title: 'Pages/PatientSummaryPage' }
