/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useEffect, useState } from 'react'

import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/solid'

import { Link, navigate, routes } from '@redwoodjs/router'

import { PatientContext } from 'src/providers/context/PatientContext'
import { TreatmentContext } from 'src/providers/context/TreatmentContext'
import { treatment } from 'src/services/treatments/treatments'

const StatusBar = () => {
  const [patient, setPatient] = useContext(PatientContext)
  const [activeTreatment, setActiveTreatment] = useContext(TreatmentContext)
  const [age, setAge] = useState(null)
  const [cycle, setCycle] = useState(null)
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  function clearContext() {
    navigate(routes.dashboard())
    setTimeout(() => {
      localStorage.removeItem('patientCache')
      localStorage.removeItem('treatmentCache')
      setPatient(null)
      setActiveTreatment(null)
    }, 50)
  }

  // useEffect to update the active treatment
  useEffect(() => {
    if (activeTreatment) {
      setAge(activeTreatment.ageAtTreatmentStart)
      setCycle(activeTreatment.count)
    } else {
      setAge(null)
      setCycle(null)
    }
  }, [activeTreatment])

  return (
    <div className="w-full">
      <div className="flex sm:justify-between flex-row justify-between">
        <div className="sm:w-0 sm:flex-1 content-center align-middle">
          <h1
            id="message-heading"
            className="text-lg font-medium text-gray-900 pt-2"
          >
            {patient !== null
              ? `${patient.firstName} ${patient.lastName}`
              : 'No patient selected'}
          </h1>
          <p className="mt-1 text-xs md:text-sm text-gray-500 truncate">
            {patient !== null ? (
              `Date of Birth: ${new Date(patient.dob).toLocaleDateString()}`
            ) : (
              <Link to={routes.dashboard()}>Select a patient to view</Link>
            )}
            {activeTreatment !== null && ` | Age: ${age}`}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-between sm:justify-start">
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 font-medium text-sm rounded-md hidden md:flex">
            {activeTreatment !== null
              ? `Cycle ${activeTreatment.count}`
              : 'No cycle selected'}
          </span>
          {patient !== null && (
            <Menu as="div" className="ml-3 relative inline-block text-left">
              <div>
                <Menu.Button className="-my-2 p-2 rounded-full bg-white flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <span className="sr-only">Open options</span>
                  <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {activeTreatment !== null && (
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => navigate(routes.treatments())}
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'w-full px-4 py-2 h-full text-left text-sm'
                            )}
                          >
                            <span>Update Treatment</span>
                          </button>
                        )}
                      </Menu.Item>
                    )}
                    {patient !== null && (
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => clearContext()}
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'w-full px-4 py-2 h-full text-left text-sm'
                            )}
                          >
                            <span>Deselect Patient</span>
                          </button>
                        )}
                      </Menu.Item>
                    )}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>
      </div>
    </div>
  )
}

export default StatusBar
