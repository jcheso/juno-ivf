import { MetaTags } from '@redwoodjs/web'

import AddPatientCell from 'src/components/AddPatientForm/AddPatientCell'

const AddPatientPage = () => {
  return (
    <>
      <MetaTags title="Add New Patient" description="Add a new patient" />
      <h1 className="text-xl font-semibold text-gray-900 pb-4 pl-2">
        Add New Patient
      </h1>

      <div className="space-y-6">
        <AddPatientCell />
      </div>
    </>
  )
}

export default AddPatientPage
