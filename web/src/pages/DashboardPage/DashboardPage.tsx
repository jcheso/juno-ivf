import { useState } from 'react'

import { MetaTags } from '@redwoodjs/web'

import PatientSearchFormCell from 'src/components/PatientSearch/PatientSearchFormCell'
import PatientSearchResultsCell from 'src/components/PatientSearch/PatientSearchResultsCell'

const DashboardPage = () => {
  const [searchInput, updateSearchInput] = useState({
    firstName: '',
    lastName: '',
    clinicId: '',
  })

  return (
    <>
      <MetaTags title="Dashboard" description="Dashboard page" />

      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 rounded-md">
        <PatientSearchFormCell
          input={searchInput}
          updateInput={updateSearchInput}
        />
        <PatientSearchResultsCell input={searchInput} />
      </div>
    </>
  )
}

export default DashboardPage
