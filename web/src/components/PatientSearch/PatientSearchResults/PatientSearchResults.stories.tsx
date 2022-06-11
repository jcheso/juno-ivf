import { PatientContext } from 'src/providers/context/PatientContext'

import PatientSearchResults from './PatientSearchResults'

const patients = [
  {
    id: '2aff0719-a249-4b05-a353-cfa7b8e02025',
    firstName: 'Jane',
    lastName: 'Deer',
    email: 'jane.deer@gmail.com',
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
  {
    id: '6f55dd84-b044-4358-8021-76e254f5cc5a',
    firstName: 'Adele',
    lastName: 'Zhou',
    email: 'adelez@gmail.com',
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
]

export const generated = () => {
  return (
    <PatientContext.Provider
      value={[
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

        () => {},
      ]}
    >
      <PatientSearchResults patients={patients} />
    </PatientContext.Provider>
  )
}

export default { title: 'Components/PatientSearchResults' }
