import { useContext } from 'react'

import { Redirect, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import TreatmentsCell from 'src/components/Treatments/TreatmentsCell/'
import { PatientContext } from 'src/providers/context/PatientContext'

const TreatmentsPage = () => {
  const [patient, setPatient] = useContext(PatientContext)
  if (patient == null) {
    return <Redirect to={routes.dashboard()} options={{ replace: true }} />
  } else {
    return (
      <>
        <MetaTags title="Treatments" description="Treatments page" />

        <TreatmentsCell patientId={patient.id} />
      </>
    )
  }
}

export default TreatmentsPage
