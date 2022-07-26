/* This example requires Tailwind CSS v2.0+ */

import { useAuth } from '@redwoodjs/auth'

export default function ClinicianSummary({ clinicianSummary }) {
  const { currentUser } = useAuth()

  const userSummary = {
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    role: `IVF Clinician at ${currentUser.clinic.name}`,
    imageUrl:
      'data:image/png;base64,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',
  }
  const stats = [
    { label: 'Patients', value: clinicianSummary.totalPatients },
    { label: 'Active Treatments', value: clinicianSummary.activeTreatments },
    { label: 'Successful Treatments', value: clinicianSummary.totalTreatments },
  ]
  return (
    <div className="rounded-lg bg-white overflow-hidden shadow">
      <h2 className="sr-only" id="profile-overview-title">
        Profile Overview
      </h2>
      <div className="bg-white p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="flex-shrink-0">
              <img
                className="mx-auto h-20 w-20 rounded-full"
                src={userSummary.imageUrl}
                alt=""
              />
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-sm font-medium text-gray-600">Welcome back,</p>
              <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                {userSummary.name}
              </p>
              <p className="text-sm font-medium text-gray-600">
                {userSummary.role}
              </p>
            </div>
          </div>
          <div className="mt-5 flex justify-center sm:mt-0">
            {/* <a
              href="#"
              className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View profile
            </a> */}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="px-6 py-5 text-sm font-medium text-center"
          >
            <span className="text-gray-900">{stat.value}</span>{' '}
            <span className="text-gray-600">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
