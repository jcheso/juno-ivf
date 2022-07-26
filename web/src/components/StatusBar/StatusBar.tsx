/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useState, useEffect } from 'react'

import { Menu, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, DotsVerticalIcon } from '@heroicons/react/solid'

import { Link, navigate, routes } from '@redwoodjs/router'

import { PatientContext } from 'src/providers/context/PatientContext'
import { TreatmentContext } from 'src/providers/context/TreatmentContext'

const StatusBar = ({ treatments }) => {
  const [patient, setPatient] = useContext(PatientContext)
  const [activeTreatment, setActiveTreatment] = useContext(TreatmentContext)
  const [age, setAge] = useState(
    activeTreatment ? activeTreatment.ageAtTreatmentStart : null
  )

  useEffect(() => {
    if (activeTreatment) {
      setAge(activeTreatment.ageAtTreatmentStart)
    }
  }, [activeTreatment])

  function clearContext() {
    navigate(routes.dashboard())
    setTimeout(() => {
      localStorage.removeItem('patientCache')
      localStorage.removeItem('treatmentCache')
      setPatient(null)
      setActiveTreatment(null)
    }, 50)
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="w-full flex flex-row justify-between ">
      <div className="flex sm:justify-between sm:flex-row justify-between flex-row w-full">
        <div className="sm:w-0 sm:flex-1 content-center align-middle md:flex-row">
          <h1
            id="message-heading"
            className="text-base md:text-lg font-medium text-gray-900 pt-1 md:pt-2"
          >
            {patient !== null
              ? `${patient.firstName} ${patient.lastName}`
              : 'No patient selected'}
          </h1>
          <div className="flex flex-col md:flex-row">
            <div className=" text-xs md:text-sm text-gray-500 truncate">
              {patient !== null ? (
                `DOB: ${new Date(patient.dob).toLocaleDateString('en-GB')}`
              ) : (
                <Link to={routes.dashboard()}>Select a patient to view</Link>
              )}
            </div>
            {activeTreatment !== null && (
              <div className="text-xs md:text-sm text-gray-500 truncate md:pl-1 flex flex-row">
                <div className="hidden md:flex mr-1">|</div>
                <div className="">Age at Cycle Start: {age}</div>
              </div>
            )}
          </div>
        </div>

        <div className="md:mt-1 px-1 flex items-center justify-between sm:justify-start">
          {patient && (
            <>
              <Menu
                as="div"
                className="relative md:inline-block text-left hidden"
              >
                <div>
                  <Menu.Button className="inline-flex  justify-center w-full rounded-md border border-gray-300 shadow-sm  px-3 py-1 bg-indigo-100 text-xs md:text-sm font-medium text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    {activeTreatment !== null
                      ? `Cycle ${activeTreatment.count}`
                      : 'No cycle selected'}
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 ">
                    <div className="py-1">
                      {treatments &&
                        treatments.map((treatment, index) => (
                          <Menu.Item key={index}>
                            {({ active }) => (
                              <button
                                onClick={() => {
                                  setActiveTreatment(treatment)
                                  localStorage.setItem(
                                    'treatmentCache',
                                    JSON.stringify({
                                      value: treatment,
                                      expires: new Date(
                                        new Date().getTime() +
                                          12 * 60 * 60 * 1000
                                      ),
                                    })
                                  )
                                }}
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm w-full text-left'
                                )}
                              >
                                Cycle {treatment.count}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                    </div>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            navigate(routes.treatments())
                          }}
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm w-full text-left'
                          )}
                        >
                          View All
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
              <Menu
                as="div"
                className="relative inline-block text-left md:hidden"
              >
                <div>
                  <Menu.Button className="bg-gray-100 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
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
                      {treatments &&
                        treatments.map((treatment, index) => (
                          <Menu.Item key={index}>
                            {({ active }) => (
                              <button
                                onClick={() => {
                                  setActiveTreatment(treatment)
                                  localStorage.setItem(
                                    'treatmentCache',
                                    JSON.stringify({
                                      value: treatment,
                                      expires: new Date(
                                        new Date().getTime() +
                                          12 * 60 * 60 * 1000
                                      ),
                                    })
                                  )
                                }}
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm w-full text-left'
                                )}
                              >
                                Cycle {treatment.count}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                    </div>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            navigate(routes.treatments())
                          }}
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm w-full text-left'
                          )}
                        >
                          View All
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </>
          )}
        </div>
      </div>
      {patient !== null && (
        <div className="ml-3 relative inline-block text-left pt-3 sm:mx-3">
          <button
            onClick={() => clearContext()}
            aria-label="Clear patient"
            className="hover:bg-gray-100 hover:text-gray-900 text-gray-700 w-full md:px-2 py-2 text-sm rounded-full"
          >
            <XIcon className="h-6 w-6"></XIcon>
          </button>
        </div>
      )}
    </div>
  )
}

export default StatusBar
