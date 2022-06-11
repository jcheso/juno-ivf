import StatusBar from './StatusBar'
export const patient = {
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
  address: 'Flat 1, Building 1, Street 1',
  phone: '+1 (111) 111-1111',
  county: 'County 1',
  city: 'Town 1',
  postcode: 'Postcode 1',
}
export const mockTreatment = {
  id: '1473b1ad-4f31-4a92-9a04-76bf23d0494b',
  startDate: '2023-01-08T00:00:00.000Z',
  endDate: '2023-02-08T00:00:00.000Z',
  wasSuccessful: null,
  isActive: true,
  clinician: { firstName: 'Mengqi', lastName: 'Zhou' },
  patient: {
    clinic: {
      name: 'Imperial College London',
    },
  },
}

export const generated = ({ patient, mockTreatment }) => {
  return <StatusBar patient={patient} activeTreatment={mockTreatment} />
}

export default { title: 'Components/StatusBar' }
