import ClinicCell from 'src/components/Clinic/ClinicCell'

type ClinicPageProps = {
  id: string
}

const ClinicPage = ({ id }: ClinicPageProps) => {
  return <ClinicCell id={id} />
}

export default ClinicPage
