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
export const users = [
  {
    id: '37062912-9411-471f-8029-0d50002fd6c3',
    firstName: 'Jarryd',
    lastName: 'Cheso',
  },
  {
    id: 'ca02dae3-9eca-44ee-97bc-891e10568978',
    firstName: 'Mengqi',
    lastName: 'Zhou',
  },
  {
    id: 'ab573535-f6d8-4fa8-b19e-4dbf6c84023e',
    firstName: 'T',
    lastName: 'H',
  },
  {
    id: '8e5c7604-ea4a-4bde-9f18-a5c79c0a587b',
    firstName: 'Simon',
    lastName: 'Hanassab',
  },
]

export const standard = (/* vars, { ctx, req } */) => ({
  clinics,
  users,
})
