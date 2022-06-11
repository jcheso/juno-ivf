import { useContext } from 'react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import TreatmentsCell from 'src/components/TreatmentsCell/'
import { PatientContext } from 'src/providers/context/PatientContext'

const TreatmentsPage = () => {
  const [patient, setPatient] = useContext(PatientContext)
  return (
    <>
      <MetaTags title="Treatments" description="Treatments page" />

      <TreatmentsCell patientId={patient.id} />
    </>
  )
}

export default TreatmentsPage
