import EditClinicCell from 'src/components/Clinic/EditClinicCell'

type ClinicPageProps = {
  id: string
}

const EditClinicPage = ({ id }: ClinicPageProps) => {
  return <EditClinicCell id={id} />
}

export default EditClinicPage
