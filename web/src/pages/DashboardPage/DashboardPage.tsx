import { MetaTags } from '@redwoodjs/web'
import { useState } from 'react'
import PatientSearchResultsCell from 'src/components/Dashboard/PatientSearchResultsCell/PatientSearchResultsCell'
import PatientSearchFormCell from 'src/components/Dashboard/PatientSearchFormCell/PatientSearchFormCell'

const DashboardPage = () => {
  const [firstName, updateFirstName] = useState('')
  const [lastName, updateLastName] = useState('')
  const [clinic, updateClinic] = useState('')

  return (
    <>
      <MetaTags title="Dashboard" description="Dashboard page" />

      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 rounded-md">
        <PatientSearchFormCell
          input={{
            firstName: firstName,
            lastName: lastName,
            clinicId: clinic,
          }}
          updateState={{ updateFirstName, updateLastName, updateClinic }}
        />
        <PatientSearchResultsCell
          input={{
            firstName: firstName,
            lastName: lastName,
            clinicId: clinic,
          }}
        />
      </div>
    </>
  )
}

export default DashboardPage
