// Define your own mock data here:
export const clinics = [
  {
    id: '6506f909-9294-4c52-83e5-def5f18e22a1',
    name: 'Imperial College London',
  },
  {
    id: '9728fbbf-2124-449f-ba65-f9057a4c5a8c',
    name: 'Hammersmith',
  },
]

export const standard = (/* vars, { ctx, req } */) => ({
  clinics,
})
