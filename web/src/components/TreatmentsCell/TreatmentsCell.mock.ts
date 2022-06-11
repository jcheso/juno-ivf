// Define your own mock data here:
export const mockTreatments = [
  {
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
  },
  {
    id: '1473b1ad-4f31-4a92-9a04-76bf23d0494a',
    startDate: '2022-01-08T00:00:00.000Z',
    endDate: '2022-02-08T00:00:00.000Z',
    wasSuccessful: true,
    isActive: false,
    clinician: { firstName: 'Mengqi', lastName: 'Zhou' },
    patient: {
      clinic: {
        name: 'Imperial College London',
      },
    },
  },
  {
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
  },
]

export const standard = (/* vars, { ctx, req } */) => ({
  treatments: mockTreatments,
})
