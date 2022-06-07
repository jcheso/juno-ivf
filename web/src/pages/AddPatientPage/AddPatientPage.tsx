import { MetaTags } from '@redwoodjs/web'
import AddPatientCell from 'src/components/AddPatientForm/AddPatientCell'
const AddPatientPage = () => {
  return (
    <>
      <MetaTags title="Add New Patient" description="Add a new patient" />
      <div className="space-y-6">
        <AddPatientCell />
      </div>
    </>
  )
}

export default AddPatientPage
