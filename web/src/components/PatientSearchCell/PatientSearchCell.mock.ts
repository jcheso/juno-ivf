// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  patients: [
    {
      id: 'd03460c9-f875-4537-9655-a3b5ec711c28',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@gmail.com',
      clinician: {
        id: '9e420ac0-1c2d-4ed3-b9c8-05b030b88016',
        firstName: 'Jarryd',
        lastName: 'Cheso',
      },
    },
    {
      id: 'e60b8e5f-8e73-4a3b-87bb-451ee81c06d7',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      clinician: {
        id: '9e420ac0-1c2d-4ed3-b9c8-05b030b88016',
        firstName: 'Jarryd',
        lastName: 'Cheso',
      },
    },
    {
      id: '2aff0719-a249-4b05-a353-cfa7b8e02025',
      firstName: 'Jane',
      lastName: 'Deer',
      email: 'jane.deer@gmail.com',
      clinician: {
        id: '9e420ac0-1c2d-4ed3-b9c8-05b030b88016',
        firstName: 'Jarryd',
        lastName: 'Cheso',
      },
    },
  ],
})
