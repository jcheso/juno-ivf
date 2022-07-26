import { useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import ClinicianSummaryCell from 'src/components/ClinicianSummary/ClinicianSummaryCell'
import PatientSearchFormCell from 'src/components/PatientSearch/PatientSearchFormCell'
import PatientSearchResultsCell from 'src/components/PatientSearch/PatientSearchResultsCell'
import StatisticsCell from 'src/components/Statistics/StatisticsCell'

const DashboardPage = () => {
  const [searchInput, updateSearchInput] = useState({
    firstName: '',
    lastName: '',
    clinicId: '',
  })
  const { currentUser } = useAuth()

  return (
    <>
      <MetaTags title="Dashboard" description="Dashboard page" />
      <div className="flex flex-col space-y-6">
        <ClinicianSummaryCell id={currentUser.id} />
        <StatisticsCell />
        <div className="bg-white px-4 py-5 border-b shadow border-gray-200 sm:px-6 rounded-md">
          <PatientSearchFormCell
            input={searchInput}
            updateInput={updateSearchInput}
          />
          <PatientSearchResultsCell input={searchInput} />
        </div>
      </div>
    </>
  )
}

export default DashboardPage
