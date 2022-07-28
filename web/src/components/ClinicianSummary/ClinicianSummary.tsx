/* This example requires Tailwind CSS v2.0+ */

import { useAuth } from '@redwoodjs/auth'

export default function ClinicianSummary({ clinicianSummary }) {
  const { currentUser } = useAuth()

  const userSummary = {
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    role: `Clinician at ${currentUser.clinic.name}`,
    imageUrl: 'https://img.icons8.com/office/480/000000/medical-doctor.png',
  }
  const stats = [
    {
      label: clinicianSummary.totalPatients === 1 ? 'Patient' : 'Patients',
      value: clinicianSummary.totalPatients,
    },
    {
      label:
        clinicianSummary.activeTreatments === 1
          ? 'Active Treatment'
          : 'Active Treatments',
      value: clinicianSummary.activeTreatments,
    },
    {
      label:
        clinicianSummary.totalTreatments === 1
          ? 'Successful Treatment'
          : 'Successful Treatments',
      value: clinicianSummary.totalTreatments,
    },
  ]
  return (
    <div className="rounded-md bg-white overflow-hidden shadow">
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
          <div className="mt-5 flex justify-center sm:mt-0"></div>
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
