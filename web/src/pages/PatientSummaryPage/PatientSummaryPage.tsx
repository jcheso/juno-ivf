import { useContext } from 'react'

import { MetaTags } from '@redwoodjs/web'

import PatientSummaryCell from 'src/components/PatientSummaryCell'
import { PatientContext } from 'src/providers/context/PatientContext'

const PatientSummaryPage = () => {
  const [patient, setPatient] = useContext(PatientContext)
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
