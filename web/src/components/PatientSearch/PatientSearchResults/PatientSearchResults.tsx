import React from 'react'

import { navigate, Link, routes } from '@redwoodjs/router'

import { PatientContext } from 'src/providers/context/PatientContext'

const PatientSearchResults = ({ patients }) => {
  const [patient, setPatient] = React.useContext(PatientContext)

  return (
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
                  Date of Birth
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
                  Clinician
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
                    {person.dob.slice(0, 10)}
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                    {person.email}
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                    {person.clinician.firstName +
                      ' ' +
                      person.clinician.lastName}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 md:pr-0">
                    <button
                      onClick={() => {
                        setPatient(person)
                        localStorage.setItem(
                          'patientCache',
                          JSON.stringify({
                            value: person,
                            expires: new Date(
                              new Date().getTime() + 12 * 60 * 60 * 1000
                            ),
                          })
                        )
                        navigate(routes.patientSummary())
                      }}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View
                      <span className="sr-only">, {person.firstName} </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PatientSearchResults
