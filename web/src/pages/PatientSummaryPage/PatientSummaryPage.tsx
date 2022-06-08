import { MetaTags } from '@redwoodjs/web'
import PatientSummaryCell from 'src/components/PatientSummaryCell'
import { useContext } from 'react'
import { PatientContext } from 'src/providers/context/PatientContext'

const PatientSummaryPage = () => {
  const [patient, setPatient] = useContext(PatientContext)
  console.log(patient)
  return (
    <>
      <MetaTags
        title={`Patient Summary - ${patient.firstName} ${patient.lastName}`}
        description="PatientSummary page"
      />

      <PatientSummaryCell id={patient.id} />
    </>
  )
}

export default PatientSummaryPage
