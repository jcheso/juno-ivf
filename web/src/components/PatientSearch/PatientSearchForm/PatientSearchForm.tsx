import React from 'react'

import { Link, routes } from '@redwoodjs/router'

const PatientSearchForm = ({ clinics, input, updateInput }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target
    updateInput({ ...input, [name]: value })
  }

  return (
    <div className="flex-col flex">
      <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Patient Search
          </h3>
        </div>
        <div className="ml-4 mt-2 flex-shrink-0">
          <Link
            to={routes.addPatient()}
            type="button"
            className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add new patient
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-start py-4">
        <div className="min-w-1/3 md:pr-6 w-full pb-2 md:pb-0">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <div className="mt-1">
            <input
              value={input.firstName}
              onChange={(e) => handleInputChange(e)}
              type="text"
              autoComplete="off"
              name="firstName"
              id="firstName"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Jane"
            />
          </div>
        </div>
        <div className="min-w-1/3 md:pr-6 w-full pb-2 md:pb-0">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <div className="mt-1">
            <input
              value={input.lastName}
              onChange={(e) => handleInputChange(e)}
              type="text"
              autoComplete="off"
              name="lastName"
              id="lastName"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="min-w-1/3 w-full pb-2 md:pb-0">
          <label
            htmlFor="clinic"
            className="block text-sm font-medium text-gray-700"
          >
            Clinic
          </label>
          <select
            value={input.clinicId}
            onChange={(e) => handleInputChange(e)}
            id="clinicId"
            name="clinicId"
            defaultValue="Select your option"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="" disabled>
              Select your option
            </option>{' '}
            {clinics.map((clinic) => (
              <option key={clinic.id} value={clinic.id}>
                {clinic.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default PatientSearchForm
