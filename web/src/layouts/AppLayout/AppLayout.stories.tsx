import { PatientContext } from 'src/providers/context/PatientContext'
import { TreatmentContext } from 'src/providers/context/TreatmentContext'

import AppLayout from './AppLayout'

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
      <PatientContext.Provider
        value={[
          {
            id: '6dcff6d9-85c2-464f-9731-b0af09884b7b',
            firstName: 'Jane',
            lastName: 'Doe',
            dob: '1972-01-01',
            clinic: {
              id: '6506f909-9294-4c52-83e5-def5f18e22a1',
              name: 'Hammersmith',
            },
            clinician: {
              id: '37062912-9411-471f-8029-0d50002fd6c3',
              firstName: 'Dr John',
              lastName: 'Doe',
            },
          },

          () => {},
        ]}
      >
        <AppLayout />
      </PatientContext.Provider>
    </TreatmentContext.Provider>
  )
}

export default { title: 'Layouts/AppLayout' }
