import EditPatientCell from 'src/components/Patient/EditPatientCell'

type PatientPageProps = {
  id: string
}

const EditPatientPage = ({ id }: PatientPageProps) => {
  return <EditPatientCell id={id} />
}

export default EditPatientPage
