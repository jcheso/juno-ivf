import { useContext } from 'react'

import { Redirect, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import PatientSummaryCell from 'src/components/PatientSummaryCell'
import { PatientContext } from 'src/providers/context/PatientContext'

const PatientSummaryPage = () => {
  const [patient, setPatient] = useContext(PatientContext)
  if (patient == null) {
    return <Redirect to={routes.dashboard()} options={{ replace: true }} />
  } else {
    return (
      <>
        <MetaTags
          title={`Patient Summary`}
          description="Patient Summary page"
        />

        <PatientSummaryCell id={patient.id} />
      </>
    )
  }
}

export default PatientSummaryPage
