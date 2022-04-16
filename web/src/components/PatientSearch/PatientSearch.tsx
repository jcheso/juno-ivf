import { Link } from '@redwoodjs/router'
import React, { useState } from 'react'

const PatientSearch = () => {
  const patients = [
    {
      firstName: 'Lindsay',
      lastName: ' Walton',
      email: 'lindsay.walton@example.com',
      currentStage: 'Awaiting Treatment Plan',
    },
    // More people...
  ]
  const [firstName, updateFirstName] = useState('')
  const [lastName, updateLastName] = useState('')
  const [clinic, updateClinic] = useState('')
  console.log(firstName)
  console.log(lastName)
  console.log(clinic)

  return (
    <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 rounded-md">
      <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Patient Search
          </h3>
        </div>
        <div className="ml-4 mt-2 flex-shrink-0">
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add new patient
          </button>
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
              value={firstName}
              onChange={(e) => updateFirstName(e.target.value)}
              type="text"
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
              value={lastName}
              onChange={(e) => updateLastName(e.target.value)}
              type="text"
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
            value={clinic}
            onChange={(e) => updateClinic(e.target.value)}
            id="clinic"
            name="clinic"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option>Hammersmith</option>
            <option>White City</option>
            <option>South Kensington</option>
          </select>
        </div>
      </div>
      {patients.length > 0 && (
        <div className="mt-2 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                    >
                      First Name
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Last Name
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Current Stage
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0"
                    >
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {patients.map((person) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                        {person.firstName}
                      </td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        {person.lastName}
                      </td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        {person.email}
                      </td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        {person.currentStage}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 md:pr-0">
                        <Link
                          to="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View
                          <span className="sr-only">, {person.firstName} </span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PatientSearch
