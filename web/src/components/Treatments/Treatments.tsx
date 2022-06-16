import { useState } from 'react'

import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/solid'

import { PatientContext } from 'src/providers/context/PatientContext'
import { TreatmentContext } from 'src/providers/context/TreatmentContext'

import { Treatment } from '../../../types/graphql'
import NewTreatmentCell from '../NewTreatmentCell/'

const Treatments = ({ treatments }) => {
  const [activeTreatment, setTreatment] = React.useContext(TreatmentContext)
  const [patient, setPatient] = React.useContext(PatientContext)
  const [openNewTreatment, setNewTreatmentForm] = useState(false)
  const [openUpdateTreatment, setUpdateTreatmentForm] = useState(false)

  return (
    <>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Treatments
              </h3>
            </div>
            <div className="flex flex-row">
              {activeTreatment !== null && (
                <div className="ml-4 mt-2 flex-shrink-0">
                  <button
                    onClick={() =>
                      setUpdateTreatmentForm(
                        (openUpdateTreatment) => !openUpdateTreatment
                      )
                    }
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update treatment
                  </button>
                </div>
              )}
              <div className="ml-4 mt-2 flex-shrink-0">
                <button
                  onClick={() =>
                    setNewTreatmentForm((openNewTreatment) => !openNewTreatment)
                  }
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create new treatment
                </button>
              </div>
            </div>
          </div>
        </div>
        {treatments && (
          // eslint-disable-next-line jsx-a11y/no-redundant-roles
          <ul role="list" className="divide-y divide-gray-200">
            {treatments.map((treatment: Treatment) => (
              <li key={treatment.id}>
                <button
                  onClick={() => {
                    setTreatment(treatment)
                    localStorage.setItem(
                      'treatmentCache',
                      JSON.stringify({
                        value: treatment,
                        expires: new Date(
                          new Date().getTime() + 12 * 60 * 60 * 1000
                        ),
                      })
                    )
                  }}
                  className={
                    `block w-full hover:bg-gray-50 cursor-pointer ` +
                    (activeTreatment != null &&
                    activeTreatment.id === treatment.id
                      ? 'bg-gray-50'
                      : 'bg-white')
                  }
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {`Cycle  ${treatment.count}`}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        {!treatment.isActive && (
                          <p
                            className={
                              `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ` +
                              (treatment.wasSuccessful
                                ? `bg-green-100 text-green-800`
                                : ` bg-red-100 text-red-800`)
                            }
                          >
                            {treatment.wasSuccessful
                              ? 'Successful'
                              : 'Unsuccessful'}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <UsersIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          {treatment.clinician.firstName +
                            ' ' +
                            treatment.clinician.lastName}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <LocationMarkerIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          {treatment.patient.clinic.name}
                        </p>
                      </div>
                      <div className="flex flex-row space-x-4">
                        <div className="mt-2 flex items-center sm:text-sm text-gray-500 sm:mt-0 text-left text-xs">
                          <CalendarIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <p>
                            Started on{' '}
                            <time dateTime={treatment.startDate}>
                              {treatment.startDate.slice(0, 10)}
                            </time>
                          </p>
                        </div>
                        <div className="mt-2 flex items-center sm:text-sm text-gray-500 sm:mt-0 text-left text-xs">
                          {treatment.endDate ? (
                            <>
                              <CheckCircleIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <p>
                                Completed on{' '}
                                <time dateTime={treatment.endDate}>
                                  {treatment.endDate.slice(0, 10)}
                                </time>
                              </p>
                            </>
                          ) : (
                            <>
                              <ClockIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <p>In progress</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <NewTreatmentCell
        open={openNewTreatment}
        setOpen={setNewTreatmentForm}
        setTreatment={setTreatment}
        patient={patient}
        type="create"
      />
      {activeTreatment && (
        <NewTreatmentCell
          open={openUpdateTreatment}
          setOpen={setUpdateTreatmentForm}
          setTreatment={setTreatment}
          patient={patient}
          type="update"
        />
      )}
    </>
  )
}

export default Treatments
