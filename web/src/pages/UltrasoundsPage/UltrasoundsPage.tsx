import { useContext } from 'react'

import { Redirect, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import FollicleCountsCell from 'src/components/Ultrasounds/FollicleCountCell'
import { PatientContext } from 'src/providers/context/PatientContext'
import { TreatmentContext } from 'src/providers/context/TreatmentContext'

const UltrasoundsPage = () => {
  const [patient, setPatient] = useContext(PatientContext)
  const [activeTreatment, setActiveTreatment] = useContext(TreatmentContext)
  if (patient == null) {
    return <Redirect to={routes.dashboard()} options={{ replace: true }} />
  } else {
    const input = {
      patientId: patient.id,
      treatmentId: activeTreatment.id,
    }
    return (
      <>
        <MetaTags title="Ultrasounds" description="Ultrasounds page" />
        <FollicleCountsCell input={input} patientId={patient.id} />
      </>
    )
  }
}

export default UltrasoundsPage
