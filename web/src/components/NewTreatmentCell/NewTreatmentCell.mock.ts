// Define your own mock data here:

export const newTreatment = {
  id: '91510aba-b38a-4de7-985b-d6c2456e7729',
  startDate: '2021-01-08T00:00:00.000Z',
  endDate: '2021-02-08T00:00:00.000Z',
  wasSuccessful: false,
  isActive: false,
  clinician: { firstName: 'Mengqi', lastName: 'Zhou' },
  patient: {
    clinic: {
      name: 'Imperial College London',
    },
  },
}

export const standard = (/* vars, { ctx, req } */) => ({
  newTreatment,
})
