import PatientSearch from './PatientSearchForm'

const clinics = [
  {
    id: '894358f9-fbd4-4833-9882-5baaaddacae3',
    name: 'Hammersmith',
  },
  {
    id: 'fe920aeb-b313-4686-a940-fde558419a56',
    name: 'White City',
  },
  {
    id: '96a50d9d-9558-455a-86e9-8da55400e2b0',
    name: 'South Kensington',
  },
]

export const generated = () => {
  return (
    <PatientSearch
      firstName=""
      lastName=""
      clinics={clinics}
      clinic={undefined}
      updateFirstName={undefined}
      updateLastName={undefined}
      updateClinic={undefined}
    />
  )
}

export default { title: 'Components/PatientSearch' }
