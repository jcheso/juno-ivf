import PatientCell from 'src/components/Patient/PatientCell'

type PatientPageProps = {
  id: string
}

const PatientPage = ({ id }: PatientPageProps) => {
  return <PatientCell id={id} />
}

export default PatientPage
