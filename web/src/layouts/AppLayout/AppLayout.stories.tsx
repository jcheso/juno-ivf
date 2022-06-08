import AppLayout from './AppLayout'
import { PatientContext } from 'src/providers/context/PatientContext'

export const generated = () => {
  return (
    <PatientContext.Provider
      value={[
        [
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
        ],
        () => {},
      ]}
    >
      <AppLayout />
    </PatientContext.Provider>
  )
}

export default { title: 'Layouts/AppLayout' }
